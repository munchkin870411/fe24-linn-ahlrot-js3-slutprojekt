'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UnsplashPhoto } from '@/lib/services/unsplashService';
import styles from './CountryGallery.module.css';

interface CountryGalleryProps {
  countryName: string;
}

export default function CountryGallery({ countryName }: CountryGalleryProps) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/unsplash?country=${encodeURIComponent(countryName)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        
        const data = await response.json();
        setPhotos(data.photos || []);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Kunde inte ladda bilder');
      } finally {
        setLoading(false);
      }
    };

    if (countryName) {
      fetchPhotos();
    }
  }, [countryName]);

  if (loading) {
    return (
      <div className={styles.gallerySection}>
        <h3 className={styles.galleryTitle}>Bilder från {countryName}</h3>
        <div className={styles.skeletonGrid}>
          {[1, 2, 3].map((index) => (
            <div key={index} className={styles.photoSkeleton}></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || photos.length === 0) {
    return (
      <div className={styles.gallerySection}>
        <h3 className={styles.galleryTitle}>Bilder från {countryName}</h3>
        <div className={styles.noPhotos}>
          <p>Inga bilder tillgängliga</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallerySection}>
      <h3 className={styles.galleryTitle}>Bilder från {countryName}</h3>
      <div className={styles.photoGrid}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.photoCard}>
            <a
              href={photo.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.photoLink}
            >
              <Image
                src={photo.urls.small}
                alt={photo.alt_description || `Bild från ${countryName}`}
                width={400}
                height={300}
                className={styles.photo}
                loading="lazy"
              />
              <div className={styles.photoOverlay}>
                <div className={styles.photoCredit}>
                  Foto av {photo.user.name}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}