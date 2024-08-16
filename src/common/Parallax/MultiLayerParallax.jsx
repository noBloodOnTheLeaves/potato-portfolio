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
                backgroundImage: "linear-gradient(to top, black 15%, transparent 40%)"
            }}
            className="w-full h-screen overflow-hidden relative mb-14" /*grid place-items-center*/
        >
            <motion.h1
                style={{
                    y: textY,
                    marginTop: '10%',
                    marginRight: 60,
                    zIndex: -3,
                    fontFamily: "'Brush Strokes', sans-serif",
                    fontWeight: 300,
                    letterSpacing: 30,
            }}
                className="font-bold text-white text-7xl md:text-9xl relative flex justify-center"
            >
                {banner.bigLabel}
            </motion.h1>
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(/images/SamuraiBannerVanish.jpg)`,
                    backgroundPosition: "bottom",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "100vw 115vh",
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
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(/images/SamuraiLayer1.png)`,
                    backgroundPosition: "bottom",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "100vw 115vh",
                    size: "80%",
                    zIndex: -2,
                }}
            />
        </div>
    );
}
