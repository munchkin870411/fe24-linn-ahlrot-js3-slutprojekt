'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PaginationProps } from '@/types/props';
import styles from './Pagination.module.css';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  className = "" 
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      navigateToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      navigateToPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    navigateToPage(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if we have 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // More complex logic for many pages
      if (currentPage <= 3) {
        // Near the beginning
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`${styles.pagination} ${className}`}>
      <div className={styles.paginationInfo}>
        <p>
          Page {currentPage} of {totalPages} ({totalItems} countries total)
        </p>
      </div>
      
      <div className={styles.paginationControls}>
        <button 
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className={`${styles.paginationBtn} ${styles.navBtn}`}
          aria-label="Previous page"
        >
          ← Previous
        </button>
        
        <div className={styles.pageNumbers}>
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageClick(page as number)}
                className={`${styles.paginationBtn} ${styles.pageBtn} ${
                  currentPage === page ? styles.active : ''
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`${styles.paginationBtn} ${styles.navBtn}`}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  );
}