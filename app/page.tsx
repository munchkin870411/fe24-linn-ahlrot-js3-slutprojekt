import React from "react";
import CountriesList from "../components/CountriesList/CountriesList";
import SearchBar from "../components/SearchBar/SearchBar";
import RegionFilter from "../components/RegionFilter/RegionFilter";
import styles from "./page.module.css";
import LoginReminder from "@/components/LoginReminder/LoginReminder";
import { auth } from "@/auth";


const HomePage = async () => {
  const session = await auth();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LoginReminder show={!session} />
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
        <RegionFilter />
        <CountriesList prefetch={!!session} />
      </main>
    </div>
  );
};

export default HomePage;
