import {motion, useScroll, useTransform} from "framer-motion";
import {CldImage} from "next-cloudinary";
import React, {useRef} from "react";
import banner from "/data/banner.json"

export default function MultiLayerParallax() {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const backgroundY1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["-2%", "80%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

    return (
        <div
            ref={ref}
            style={{
                width: '100vw',
                height: '115vh',
                backgroundImage: "linear-gradient(to top, black 15%, transparent 40%)",
            }}
            className="overflow-hidden relative" /*grid place-items-center*/
        >
            <motion.h1
                style={{
                    y: textY,
                    zIndex: -3,
                    fontFamily: "'Brush Strokes', sans-serif",
                    fontWeight: 300,
            }}
                className={"h-56 top-36 tracking-[0.6rem]  xs:top-44 xl:tracking-[5rem] xs:tracking-[1.7rem]  !text-white text-7xl xl:text-7xl xs:text-3xl text-nowrap relative flex justify-center items-center"}
            >
                {banner.bigLabel}
            </motion.h1>
            <motion.div
                className="absolute inset-0"
                style={{
                    y: backgroundY1,
                    zIndex: -5
                }}
            >
                <CldImage
                    src={'samurai_background'}
                    alt={'samurai_background'}
                    fill={true}
                    priority
                />
            </motion.div>
            {/*<motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(/images/SamuraiLayer2.png)`,
                    backgroundPosition: "bottom",
                    backgroundSize: "contain",
                    y: backgroundY2,
                    zIndex: -4
                }}
            />*/}
            <div
                className="absolute inset-0 w-[68rem] -left-80 xl:left-0 xl:w-full xs:w-[50rem] xs:-left-44"
                style={{
                    size: "80%",
                    zIndex: -2,
                }}
            >
                <CldImage
                    src={'samurai'}
                    alt={'samurai'}
                    fill={true}
                    priority
                />
            </div>
        </div>
    );
}
