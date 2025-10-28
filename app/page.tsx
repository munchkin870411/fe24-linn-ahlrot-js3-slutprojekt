import React from "react";
import CountriesList from "../components/CountriesList/CountriesList";
import SearchBar from "../components/SearchBar/SearchBar";
import RegionFilter from "../components/RegionFilter/RegionFilter";
import styles from "./page.module.css";
import LoginReminder from "@/components/LoginReminder/LoginReminder";
import { auth } from "@/auth";


const HomePage = () => {
  const session = auth();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.searchWrapper}>
          {!session && <LoginReminder />}
          <SearchBar />
        </div>
        <RegionFilter />
        <CountriesList />
      </main>
    </div>
  );
};

export default HomePage;
