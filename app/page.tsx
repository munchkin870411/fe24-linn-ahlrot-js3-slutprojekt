import React from "react";
import CountriesList from "../components/CountriesList";
import SearchBar from "../components/SearchBar";
import styles from "./page.module.css";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Travel Countries</h1>
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
        <CountriesList />
      </main>
    </div>
  );
};

export default HomePage;
