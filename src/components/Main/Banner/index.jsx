'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.main
        className={styles.landing}>
      <Image
        src="/images/main.jpg"
          // Make the image display full width
        alt="background"
        fill={true}
        quality={100}
      />
      {/*<video  playsInline autoPlay muted loop>
        <source src="/images/monochrome.webm" type="video/webm"  />
      </video>*/}
    </motion.main>
  )
}
