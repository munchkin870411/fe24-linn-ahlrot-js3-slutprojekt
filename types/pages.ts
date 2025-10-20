/**
 * Props interface for Next.js dynamic route pages
 */
export interface CountryPageProps {
  params: Promise<{ slug: string }>;
}