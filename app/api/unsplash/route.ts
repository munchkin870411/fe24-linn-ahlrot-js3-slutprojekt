import { NextRequest, NextResponse } from 'next/server';
import { getCountryPhotos } from '@/lib/services/unsplashService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');

    if (!country) {
      return NextResponse.json(
        { error: 'Country parameter is required' },
        { status: 400 }
      );
    }

    const photos = await getCountryPhotos(country);

    return NextResponse.json({
      photos,
      count: photos.length
    });

  } catch (error) {
    console.error('Unsplash API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}