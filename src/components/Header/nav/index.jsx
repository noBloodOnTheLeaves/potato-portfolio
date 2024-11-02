import React, {useState} from 'react'
import styles from './style.module.scss';
import {motion} from 'framer-motion';
import {usePathname} from 'next/navigation';
import {menuSlide} from '../animation';
import Link from './Link';
import routes from '/data/routes.json'

/*const navItems = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Work",
        href: "/work",
    },
    {
        title: "Reviews",
        href: "/reviews",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Contact",
        href: "/contact",
    },
]*/

export default function Index({
                                  changeActive = () => {
                                  }, isActive = false
                              }) {

    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);

    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.menu}
        >
            <div className={styles.body}>
                <div
                    onMouseLeave={() => {
                        setSelectedIndicator(pathname)
                    }}
                    className={styles.nav}
                    onClick={() => {
                        changeActive(!isActive)
                    }}
                >
                    <div className={styles.header}>
                        <p>Navigation</p>
                    </div>
                    {
                        routes.nav.map((data, index) => {
                            return <Link
                                key={index}
                                data={{...data, index}}
                                isActive={selectedIndicator === data.path}
                                setSelectedIndicator={setSelectedIndicator}
                                prefetch={true}
                            >
                            </Link>
                        })
                    }
                </div>
            </div>
        </motion.div>
    )
}
