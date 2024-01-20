"use client"

import Image from 'next/image'
import styles from './page.module.css'
import test_function from './calculations';

export default function Home() {
  return (
    <main className={styles.main}>
      <button onClick={test_function} className={styles.big}>Click me</button>
    </main>
  )
}
