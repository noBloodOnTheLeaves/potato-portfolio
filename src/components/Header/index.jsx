'use client';
React.useLayoutEffect = React.useEffect
import Link from "next/link";
import React from 'react';
import styles from './style.module.scss';
import {usePathname} from 'next/navigation';
import {AnimatePresence} from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import routes from '/data/routes.json'

export default function Header() {
    const header = React.useRef(null);
    const [isActive, setIsActive] = React.useState(false);
    const [isShowNav, setIsShowNav] = React.useState(true);
    const pathname = usePathname();
    const button = React.useRef(null);

    React.useEffect(() => {
        if (isActive) setIsActive(false)
    }, [])

    React.useLayoutEffect(() => {
        if (window.innerWidth < 800) {
            setIsShowNav(false)
            gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out", zIndex: 6})
        }
        if (window.innerWidth > 800) {
            gsap.registerPlugin(ScrollTrigger)
            gsap.to(button.current, {
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 0,
                    end: window.innerHeight,
                    onLeave: () => {
                        gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"})
                    },
                    onEnterBack: () => {
                        gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"}, setIsActive(false))
                    }
                }
            })
        }

    }, [])
    return (
        <>
            <div ref={header} className={styles.header}
                 style={pathname !== '/' ? {color: 'black', zIndex: 5} : {color: 'white', zIndex: 5}}>
                <div className={styles.logo}>
                    <p className={styles.copyright}>©</p>
                    <div className={styles.name}>
                        {/*<p className={styles.codeBy}>Ricercare</p>*/}
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <Link href={routes.header[0].path}>{routes.header[0].name}</Link>
                        {/*<a href='/' className={styles.menu}>Ricercare</a>*/}
                        {/*<p className={styles.dennis}> </p>
                    <p className={styles.snellenberg}>REE-chər-KAR-ay</p>*/}
                    </div>
                </div>
                {
                    isShowNav && <div className={styles.nav}>
                        {
                            routes.header.slice(1).map((e) => {
                                return (
                                    <Magnetic key={e.path}>
                                        <div className={styles.el}>
                                            <Link href={e.path} prefetch={true}>{e.name}</Link>
                                            <div className={styles.indicator}></div>
                                        </div>
                                    </Magnetic>
                                )
                            })
                        }
                        {/*<Magnetic>
                            <div className={styles.el}>
                                <Link href={'/work'}>Work</Link>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <Link href={'/reviews'}>Reviews</Link>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <Link href={'/about'}>About</Link>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <Link href={'/contact'}>Contact</Link>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>*/}
                    </div>
                }
            </div>
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded backgroundColor={'#27272A'} onClick={() => {
                    setIsActive(!isActive)
                }} className={`${styles.button}`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>
            <AnimatePresence mode="wait">
                {isActive && <Nav/>}
            </AnimatePresence>
        </>
    )
}
