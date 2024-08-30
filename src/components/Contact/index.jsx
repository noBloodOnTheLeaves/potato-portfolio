import {ShootingStars} from "@/common/StarsBackground/ShootingStars";
import {StarsBackground} from "@/common/StarsBackground/StarsBackground";
import {useRouter} from "next/router";
import styles from './style.module.scss';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';
import contact from '/data/contact.json'

export default function Index() {
    const container = useRef(null);
    const router = useRouter()
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    //const rotate = useTransform(scrollYProgress, [0, 1], [180, 90])
    return (
        <div ref={container} className={styles.contact + " container mt-60 "} style={{
            zIndex: 0
        }}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image
                            width={100}
                            height={100}
                            alt={"image"}
                            src={`/images/main/cheer-honor.gif`}
                            />
                        </div>
                        <h2>{"Let's work"}</h2>
                    </span>
                    <h2>together</h2>
                    <motion.div style={{x}} className={styles.buttonContainer} >
                        <Rounded backgroundColor={'#27272A'} className={styles.button} onClick={()=> router.push(`/contact`)}>

                            {/*<motion.div style={{rotate, scale: 1, zIndex: 1}}>
                                <Image
                                    priority
                                    width={200}
                                    height={200}
                                    src={`/images/contact/yarn-ball.svg`}
                                    alt="yarn-ball"
                                />
                            </motion.div>*/}
                            <p>Get in touch</p>
                        </Rounded>
                    </motion.div>

                </div>
                <div className={styles.nav}>
                   {/* <Rounded backgroundColor={'#27272A'}>
                        <p>{contact.email}</p>
                    </Rounded>
                    <Rounded backgroundColor={'#27272A'}>
                        <p>{contact.phone}</p>
                    </Rounded>*/}
                </div>
                <div className={styles.info}>
                    <div style={{
                        zIndex: 2
                    }}>
                        <span >
                            <h3>Created by </h3>
                            <Magnetic>
                            <p>Panda 🐼</p>
                        </Magnetic>
                        </span>
                    </div>
                   {/* <div style={{
                        zIndex: 2
                    }}>
                        <span>
                            <h3>socials</h3>
                             <Magnetic>
                            <p onClick={() => window.open("https://www.instagram.com/ricercare_1", 'target')}>{contact.socials[0].name}</p>
                        </Magnetic>
                        </span>
                    </div>*/}
                </div>

            </div>
            <StarsBackground />
            <ShootingStars/>
        </div>
    )
}
