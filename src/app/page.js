'use client'
import React from 'react';
import styles from './page.module.css';
import UserIcon from './components/userProfile/userIcon';
import Allwrapper from './components/allwrapper/allwrapper';
import HamburgerMenu from './components/hamburgerMenu/hamburgerMenu';


export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.sidebar}>
        <UserIcon username="Username" />
      </div>
      <div className={styles.mainContent}>
      <HamburgerMenu /> 
        <h1 className={styles.title}>Dashboard</h1>
        <Allwrapper />
      </div>
    </main>
  );
}