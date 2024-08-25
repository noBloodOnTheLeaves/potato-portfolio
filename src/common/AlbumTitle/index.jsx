import {motion, useScroll, useTransform} from "framer-motion";
import React, { useRef } from 'react'


export default function AlbumTitle() {
    const word = 'ALBUMS';
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })
    const letterAnimation = [
        useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -75) - 25]),
        useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -75) - 25]),
        useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -75) - 25]),
        useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -75) - 25]),
        useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -75) - 25]),
        useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -75) - 25])
    ]

    return (
        <div className="pl-16 mb-16">
            <div ref={container}>
                <p>
                    {
                        word.split("").map((letter, i) => {
                            return <motion.span style={{top: letterAnimation[i], position: 'relative'}} className="relative text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans" key={`l_${i}`} >{letter}</motion.span>
                        })
                    }
                </p>
            </div>
        </div>
    )
}
