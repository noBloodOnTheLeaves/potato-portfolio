import {ShootingStars} from "@/common/StarsBackground/ShootingStars";
import {StarsBackground} from "@/common/StarsBackground/StarsBackground";
import {useRouter} from "next/router";
import Image from 'next/image';
import styles from './style.module.scss'
import Rounded from '../../common/RoundedButton';
import {useEffect, useRef, useState} from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function Index() {
    const container = useRef(null);
    const router = useRouter()
    const [width, setWidth] = useState(500);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })

    const x = useTransform(scrollYProgress, [0, 1], width < 500 ? [-350, 50] : [-350, 300])
    // const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    //const rotate = useTransform(scrollYProgress, [0, 1], [180, 90])

    const path = useRef(null);
    let progress = 0;
    let xLine = 0.5;
    let time = Math.PI / 2;
    let reqId = null;

    useEffect(() => {
        setPath(progress);
        setWidth(window.screen.width)
    }, [])

    const setPath = (progress) => {
        const width = document.getElementById('contactContainer').offsetWidth;
        path.current.setAttributeNS(null, "d", `M0 250 Q${width * xLine} ${250 + progress}, ${width} 250`)
    }

    const lerp = (x, y, a) => x * (1 - a) + y * a

    const manageMouseEnter = () => {
        if(reqId){
            cancelAnimationFrame(reqId)
            resetAnimation()
        }
    }

    const manageMouseMove = (e) => {
        const { movementY, clientX } = e;
        const pathBound =  path.current.getBoundingClientRect();
        xLine = (clientX - pathBound.left) / pathBound.width;
        progress+= movementY
        setPath(progress);
    }

    const manageMouseLeave = () => {
        animateOut();
    }

    const animateOut = () => {
        const newProgress = progress * Math.sin(time);
        progress = lerp(progress, 0, 0.025);
        time+=0.2;
        setPath(newProgress);
        if(Math.abs(progress) > 0.75){
            reqId = requestAnimationFrame(animateOut);
        }
        else{
            resetAnimation();
        }
    }

    const resetAnimation = () => {
        time = Math.PI / 2;
        progress = 0;
    }

    return (
        <div ref={container}
             id="contactContainer"
             className="mt-60 mb-0 z-0 h-4/5 bg-[#141516]  flex flex-wrap justify-evenly w-4/5 relative text-white rounded-t-[20px]">
            <div className="w-full bg-[#141516] pt-30 rounded-t-[20px] ">
                <div className="p-5 flex justify-start items-center gap-4 pt-14 xs:ml-3 ml-3">
                    <Image
                        width={100}
                        height={100}
                        alt={"image"}
                        src={'/images/contact/cheer-honor.gif'}
                        unoptimized
                    />
                    <h2 className="w-96  lg:text-5xl md:text-5xl sm:text-3xl xs:text-2xl text-2xl tracking-[.25em]">
                        {"Let's work \ " +
                        "together"}</h2>
                </div>
            </div>
            <div className={styles.line}>
                <div onMouseEnter={() => {
                    manageMouseEnter()
                }} onMouseMove={(e) => {
                    manageMouseMove(e)
                }} onMouseLeave={() => {
                    manageMouseLeave()
                }} className={styles.box}></div>
                <svg >
                    <path ref={path}></path>
                </svg>
            </div>
            <motion.div style={{x}} className="z-10 flex justify-center rounded-full">
                <Rounded backgroundColor={'#413F42'}
                         style={{
                             width: width < 500 ? 70 : 180,
                             height: width < 500 ? 120 : 180,
                             borderRadius: 300,
                             backgroundColor: '#141516',
                         }}
                         //classes="w-[100px] h-[100px] xs:w-[100px] xs:h-[100px] "
                         onClick={() => router.push(`/contact`)}>
                    <p className="text-1xl sm:text-2xl xs:text-1xl absolute text-nowrap ">Get in touch</p>
                </Rounded>
            </motion.div>
            <div className="w-full flex justify-between z-10 pl-10 mb-10">
                 <span>
                     <h3 className="text-gray-500">Created by </h3>
                     <Magnetic>
                         <p>Panda 🐼</p>
                     </Magnetic>
                 </span>
            </div>
            {/*<div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>

                        </div>
                        <h2>{"Let's work"}</h2>
                    </span>
                    <h2>together</h2>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <Rounded backgroundColor={'#27272A'} className={styles.button} onClick={()=> router.push(`/contact`)}>
                            <p>Get in touch</p>
                        </Rounded>
                    </motion.div>
                </div>
                <div className={styles.nav}>
                    <Rounded backgroundColor={'#27272A'}>
                        <p>{contact.email}</p>
                    </Rounded>
                    <Rounded backgroundColor={'#27272A'}>
                        <p>{contact.phone}</p>
                    </Rounded>
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
                    <div style={{
                        zIndex: 2
                    }}>
                        <span>
                            <h3>socials</h3>
                             <Magnetic>
                            <p onClick={() => window.open("https://www.instagram.com/ricercare_1", 'target')}>{contact.socials[0].name}</p>
                        </Magnetic>
                        </span>
                    </div>
                </div>

            </div>*/}
            <StarsBackground/>
            <ShootingStars/>
        </div>
    )
}
