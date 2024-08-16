import ParallaxGallery from "@/common/ParallaxGallery";
import Lenis from "lenis";
import styles from './styles.module.scss';
import Picture1 from '../../../public/images//album-preview/P1059673.jpg';
import Picture2 from '../../../public/images/album-preview/P1059673.jpg';
import Picture3 from '../../../public/images/album-preview/P1059673.jpg';
import Picture4 from '../../../public/images/album-preview/P1059673.jpg'
import Picture5 from '../../../public/images/album-preview/P1059673.jpg'
import Picture6 from '../../../public/images/album-preview/P1059673.jpg'
import Picture7 from '../../../public/images/album-preview/P1059673.jpg'
import Image from 'next/image';
import {useScroll, useTransform, motion} from 'framer-motion';
import {useEffect, useRef} from 'react';
import {useRouter} from 'next/router'

export default function Album() {
    const router = useRouter()
    useEffect(() => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])


    const container = useRef(null);
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [4, 1]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [5, 1]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [6, 1]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [8, 1]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [9, 1]);

    const pictures = [
        {
            src: Picture1,
            scale: scale4
        },
        {
            src: Picture2,
            scale: scale5
        },
        {
            src: Picture3,
            scale: scale6
        },
        {
            src: Picture4,
            scale: scale5
        },
        {
            src: Picture5,
            scale: scale6
        },
        {
            src: Picture6,
            scale: scale8
        },
        {
            src: Picture7,
            scale: scale9
        },
    ]

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.sticky}>
                {
                    pictures.map(({src, scale}, index) => {
                        return <motion.div key={index} style={{scale}} className={styles.el}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={src}
                                    fill
                                    alt="image"
                                    placeholder='blur'
                                />
                            </div>
                        </motion.div>
                    })
                }
            </div>
            <div
                 style={{
                     marginTop: '193vh',
                     height: '100vh',
                     weight: '100vh',
                 }}
            >
               <ParallaxGallery/>
            </div>
            {/*<div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4"
                     style={{
                         marginTop: '193vh',
                         height: '100vh',
                         weight: '100vh',
                     }}
                >
                    {pictures.map(({src, scale}, index) => {
                        return <Image
                            key={index}
                            src={src}
                            alt="image"
                            placeholder='blur'
                            className={"albumPictures" + (index + 1)}
                        />
                    })}
                </div>
            </div>*/}


        </div>
    )
}
