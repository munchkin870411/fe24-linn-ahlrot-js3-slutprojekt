import { UnsplashPhoto, UnsplashSearchResponse, unsplashPhotoSchema } from '@/types/types';

const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

export async function searchUnsplashPhotos(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashSearchResponse | null> {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    
    if (!accessKey) {
      console.error('Unsplash Access Key not found in environment variables');
      return null;
    }

    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?${new URLSearchParams({
        query,
        page: page.toString(),
        per_page: perPage.toString(),
        orientation: 'landscape'
      })}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`
        },
        next: { revalidate: 86400 } // 24 hour cache
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UnsplashSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Unsplash API Error:', error);
    return null;
  }
}

export async function getCountryPhotos(countryName: string): Promise<UnsplashPhoto[]> {
  try {
    // Sök efter foton relaterade till landet
    const searchQueries = [
      `${countryName} landscape`,
      `${countryName} landmarks`,
      `${countryName} architecture`,
      countryName
    ];

    for (const query of searchQueries) {
      const result = await searchUnsplashPhotos(query, 1, 3);
      if (result && result.results.length > 0) {
        // Validate each photo with Zod schema
        const validatedPhotos: UnsplashPhoto[] = [];
        
        for (const photo of result.results) {
          const validationResult = unsplashPhotoSchema.safeParse(photo);
          
          if (validationResult.success) {
            validatedPhotos.push(validationResult.data);
          } else {
            console.warn('Invalid photo data:', validationResult.error);
          }
        }
        
        if (validatedPhotos.length > 0) {
          return validatedPhotos;
        }
      }
    }

    return [];
  } catch (error) {
    console.error('Error fetching country photos:', error);
    return [];
  }
}