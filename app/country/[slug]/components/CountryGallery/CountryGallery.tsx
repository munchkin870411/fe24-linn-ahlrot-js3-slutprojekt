import React from 'react';
import Image from 'next/image';
import { UnsplashPhoto } from '@/types/types';
import styles from './CountryGallery.module.css';

interface CountryGalleryProps {
  countryName: string;
  photos: UnsplashPhoto[];
}

export default function CountryGallery({ countryName, photos }: CountryGalleryProps) {
  if (photos.length === 0) {
    return (
      <div className={styles.gallerySection} aria-label={`Photo gallery of ${countryName}`}> 
        <h3 className={styles.galleryTitle}>Pictures of {countryName}</h3>
        <div className={styles.noPhotos}>
          <p>No photos available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallerySection} aria-label={`Photo gallery of ${countryName}`}> 
      <h3 className={styles.galleryTitle}>Pictures of {countryName}</h3>
      <div className={styles.photoGrid} role="list" aria-label={`Photos of ${countryName}`}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.photoCard} role="listitem">
            <a
              href={photo.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.photoLink}
              aria-label={`View photo by ${photo.user.name} on Unsplash`}
            >
              <Image
                src={photo.urls.small}
                alt={photo.alt_description || `Picture of ${countryName}`}
                width={400}
                height={300}
                className={styles.photo}
                loading="lazy"
                aria-label={photo.alt_description || `Picture of ${countryName}`}
              />
              <div className={styles.photoOverlay}>
                <div className={styles.photoCredit}>
                  Photo by {photo.user.name}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className={styles.galleryFooter}>
        <small>Photos from <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a></small>
      </div>
    </div>
  );
}