import React from "react";
import { notFound } from "next/navigation";
import CountryDetails from "@/app/country/[slug]/components/CountryDetails/CountryDetails";
import CountryGallery from "@/app/country/[slug]/components/CountryGallery/CountryGallery";
import WeatherDisplay from "@/app/country/[slug]/components/WeatherDisplay/WeatherDisplay";
import { getCountryData } from "@/lib/services/countryDataService";
import { CountryPageProps } from "@/types/pages";
import styles from "./page.module.css";

import { redirect } from "next/navigation";
import { auth } from "@/auth";

const CountryPage = async ({ params }: CountryPageProps) => {
  const session = await auth();
  if (!session) {
    redirect("/?loginRequired=1");
  }

  const { slug } = await params;
  const countryCode = slug.toUpperCase();

  // Fetch country data from server-side service
  const countryData = await getCountryData(countryCode);

  if (!countryData) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.contentGrid}>
          <div className={styles.countrySection}>
            <CountryDetails
              country={countryData.country}
              wikipediaData={countryData.wikipedia}
            />
          </div>

          <div className={styles.weatherSection}>
            <WeatherDisplay weather={countryData.weather} />
            <CountryGallery
              countryName={countryData.country.name.common}
              photos={countryData.photos}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryPage;
