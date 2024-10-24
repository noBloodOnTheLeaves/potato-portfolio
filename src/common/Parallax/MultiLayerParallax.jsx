import {motion, useScroll, useTransform} from "framer-motion";
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
                className={"h-72 xs:top-44 xl:tracking-[5rem] xs:tracking-[1.7rem]  !text-white xl:text-7xl xs:text-3xl text-nowrap relative flex justify-center items-center"}
            >
                {banner.bigLabel}
            </motion.h1>
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(/images/SamuraiBannerVanish.jpg) `,
                    backgroundPosition: "bottom",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "100% 114vh",

                    y: backgroundY1,
                    zIndex: -5
                }}
            />
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
                className="absolute inset-0  xl:left-0 xl:w-full xs:w-[50rem] xs:-left-44"
                style={{
                    backgroundImage: `url(/images/SamuraiLayer1.png) `,
                    backgroundPosition: "bottom",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "100% 113vh",
                    size: "80%",
                    zIndex: -2,
                }}
            />
        </div>
    );
}
