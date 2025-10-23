import { z } from 'zod';

/**
 * Zod schema for search query validation
 * Validates country search input with proper constraints
 */
export const searchSchema = z.object({
  query: z.string()
    .max(50, 'Search query must be less than 50 characters')
    .regex(/^[a-zA-ZåäöÅÄÖ\s\-']*$/, 'Search query can only contain letters, spaces, hyphens and apostrophes')
    .transform(val => val.trim())
    .optional()
    .or(z.literal(''))
});

/**
 * Type inference for search form data
 */
export type SearchFormData = z.infer<typeof searchSchema>;

/**
 * Validates a search query string
 * @param query - The search query to validate
 * @returns Validation result with success/error status
 */
export const validateSearchQuery = (query: string) => {
  return searchSchema.safeParse({ query });
};