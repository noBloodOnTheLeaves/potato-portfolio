'use client'
import MultiLayerParallax from "@/common/Parallax/MultiLayerParallax";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.main
        >
      {/*<Image
        src="/images/main.jpg"
          // Make the image display full width
        alt="background"
        fill={true}
        quality={100}
      />*/}
        <MultiLayerParallax />
      {/*<video  playsInline autoPlay muted loop>
        <source src="/images/monochrome.webm" type="video/webm"  />
      </video>*/}
    </motion.main>
  )
}
