import {ShootingStars} from "@/common/StarsBackground/ShootingStars";
import {StarsBackground} from "@/common/StarsBackground/StarsBackground";
import {useRouter} from "next/router";
import Image from 'next/image';
import contact from "../../../data/contact.json";
import styles from './style.module.scss'
import Rounded from '../../common/RoundedButton';
import {useEffect, useRef, useState} from 'react';
import {useScroll, motion, useTransform} from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function Index() {
    const container = useRef(null);
    const router = useRouter()
    const [width, setWidth] = useState(500);
    const {scrollYProgress} = useScroll({
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
        if (reqId) {
            cancelAnimationFrame(reqId)
            resetAnimation()
        }
    }

    const manageMouseMove = (e) => {
        const {movementY, clientX} = e;
        const pathBound = path.current.getBoundingClientRect();
        xLine = (clientX - pathBound.left) / pathBound.width;
        progress += movementY
        setPath(progress);
    }

    const manageMouseLeave = () => {
        animateOut();
    }

    const animateOut = () => {
        const newProgress = progress * Math.sin(time);
        progress = lerp(progress, 0, 0.025);
        time += 0.2;
        setPath(newProgress);
        if (Math.abs(progress) > 0.75) {
            reqId = requestAnimationFrame(animateOut);
        } else {
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
                <svg>
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
            <div className="w-full flex justify-between row z-10 pl-10 mb-10 mt-5">
                 <span>
                     <h3 className="text-gray-500">Created by </h3>
                     <Magnetic>
                         <p>Panda 🐼</p>
                     </Magnetic>
                 </span>

                <div className="visible xs:invisible">
                    <h3 className="text-gray-500">Socials </h3>
                    <div className="flex row z-10 gap-2 pr-8">
                        <Magnetic>
                            <svg onClick={() => window.open(contact.socials[0].link, 'target')}
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path
                                    d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path
                                    d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                                    stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </Magnetic>
                        <div>
                            <Magnetic>
                                <svg className="mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                     height="24"
                                     color="#ffffff" fill="none">
                                    <path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                    <path
                                        d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118"
                                        stroke="currentColor" strokeWidth="1.5"/>
                                </svg>
                            </Magnetic>
                        </div>
                        <div>
                            <Magnetic>
                                <svg onClick={(e) => {window.location.href ='mailto:example@email.com';}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M7 8L9.94202 9.73943C11.6572 10.7535 12.3428 10.7535 14.058 9.73943L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21.9842 12.9756C22.0053 11.9899 22.0053 11.0101 21.9842 10.0244C21.9189 6.95886 21.8862 5.42609 20.7551 4.29066C19.6239 3.15523 18.0497 3.11568 14.9012 3.03657C12.9607 2.98781 11.0393 2.98781 9.09882 3.03656C5.95033 3.11566 4.37608 3.15521 3.24495 4.29065C2.11382 5.42608 2.08114 6.95885 2.01576 10.0244C1.99474 11.0101 1.99475 11.9899 2.01577 12.9756C2.08114 16.0412 2.11383 17.5739 3.24496 18.7094C4.37608 19.8448 5.95033 19.8843 9.09883 19.9634C10.404 19.9962 11.7005 20.007 13 19.9957" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.5 14L18.7579 14.697C19.0961 15.611 19.2652 16.068 19.5986 16.4014C19.932 16.7348 20.389 16.9039 21.303 17.2421L22 17.5L21.303 17.7579C20.389 18.0961 19.932 18.2652 19.5986 18.5986C19.2652 18.932 19.0961 19.389 18.7579 20.303L18.5 21L18.2421 20.303C17.9039 19.389 17.7348 18.932 17.4014 18.5986C17.068 18.2652 16.611 18.0961 15.697 17.7579L15 17.5L15.697 17.2421C16.611 16.9039 17.068 16.7348 17.4014 16.4014C17.7348 16.068 17.9039 15.611 18.2421 14.697L18.5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            </Magnetic>
                        </div>
                    </div>
                </div>


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
