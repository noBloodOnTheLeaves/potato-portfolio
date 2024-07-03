'use client';
import styles from './style.module.scss';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {opacity, slideUp} from './anim';
import {usePathname} from "next/navigation";
const routes = {
    "/": "Home",
    "/about": "About",
    "/contact": "Contact",
    "/work": "Work"
}
export default function Index({children} : any) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        (
            async () => {
                setTimeout( () => {
                    setIsLoading(false);
                    document.body.style.cursor = 'default'
                    window.scrollTo(0,0);
                }, 2000)
            }
        )()
    }, [])

    const path = usePathname();
    const [dimension, setDimension] = useState({width: 0, height: 0});

    useEffect(() => {
        setDimension({width: window.innerWidth, height: window.innerHeight})
    }, [])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
        }
    }

    return (
        <>
            {isLoading && (<motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
                {dimension.width > 0 &&
                    <>
                        <motion.p variants={opacity} initial="initial" animate="enter"><span></span>{
                            routes[path]
                        }</motion.p>
                        <svg>
                            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                        </svg>
                    </>
                }
            </motion.div>)}
            {children}
        </>
    )
}
