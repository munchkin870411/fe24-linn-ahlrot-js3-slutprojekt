import React from 'react';
import Image from 'next/image';
import { UnsplashPhoto } from '@/lib/services/unsplashService';
import styles from './CountryGallery.module.css';

interface CountryGalleryProps {
  countryName: string;
  photos: UnsplashPhoto[];
}

export default function CountryGallery({ countryName, photos }: CountryGalleryProps) {
  if (photos.length === 0) {
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