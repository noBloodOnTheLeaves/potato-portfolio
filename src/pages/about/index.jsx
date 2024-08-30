import Card from "@/common/Card";
import {ShootingStars} from "@/common/StarsBackground/ShootingStars";
import {StarsBackground} from "@/common/StarsBackground/StarsBackground";
import styles from "@/components/Contact/style.module.scss";
import Curve from '@/components/Layout/Curve'
import Head from 'next/head'
import React, { useRef} from "react";
import {
    motion, useMotionTemplate, useMotionValue, useSpring, useTransform
} from "framer-motion";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export default function About() {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="about me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Curve>
            <div
                style={{
                zIndex: 4,
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                perspective: '1000px',
            }}>
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transformStyle: 'preserve-3d',
                        transform
                }}>
                        <Card />
                </motion.div>

            </div>

         {/* <div className="w-full h-full flex justify-center items-center z-20">
              <Card/>

          </div>*/}
        </Curve>
          {/*<div className="flex center ">
              <div ref={container} className={styles.contact + " container mt-60 w-10/12 "} style={{
                  zIndex: 10,
                  borderRadius: '10px 10px 10px 10px !important'
              }}>
                  <div className="flex justify-center ">
                      <Image
                          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1280/album_preview/coal.jpg`}
                          alt={'fawf'}
                          className="rounded-full mx-auto absolute -top-36 w-60 h-60 shadow-md border-4 border-white transition duration-200 transform scale-150"
                          style={{
                              transform: "translateZ(75px)",
                          }}
                          objectFit={'cover'}
                          width={500}
                          height={500}
                      />
                      <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt=""
                           className="rounded-full mx-auto absolute -top-28 w-52 h-52 shadow-md border-4 border-white transition duration-200 transform scale-150"/>
                  </div>
                  <div className={styles.body + "mb-60"} >

                      <div className="flex justify-center p-20 ">
                          <div>
                              <p className="my-8 relative  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">
                                  Hi, My name is potato
                              </p>
                              <p className="my-8 relative  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque
                                  mi ut pulvinar ornare. Sed feugiat dignissim cursus. Sed eu purus ac quam
                                  pretium porta eget at ante. Mauris malesuada leo justo,
                                  molestie scelerisque mi tempor quis. Ut laoreet ante in venenatis rhoncus.
                                  Vestibulum ut pretium ligula, ut ullamcorper est. Pellentesque rhoncus eros a ligula
                                  ullamcorper, finibus iaculis leo pretium. Donec tortor sem,
                                  ultricies nec est id, ultrices sodales ex.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>*/}
         {/* <StarsBackground />
          <ShootingStars/>*/}

    </>
  )
}
