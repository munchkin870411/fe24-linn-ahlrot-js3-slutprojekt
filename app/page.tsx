import React from "react";
import CountriesList from "../components/CountriesList";
import styles from "./page.module.css";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Travel Countries</h1>
        <CountriesList />
      </main>
    </div>
  );
};

export default HomePage;
