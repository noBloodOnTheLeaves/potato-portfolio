import {motion, useScroll, useTransform} from "framer-motion";
import React, {useRef} from "react";
import banner from "/data/banner.json"

export default function MultiLayerParallax() {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
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
                style={{y: textY, marginTop: '7%', zIndex: -3}}
                className="font-bold text-white text-7xl md:text-9xl relative flex justify-center"
            >
                {banner.bigLabel}
            </motion.h1>
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(/images/image-full.jpg)`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover",
                    y: backgroundY,
                    zIndex: -4
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(/images/image-bottom.png)`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover",
                    zIndex: -2,
                }}
            />
        </div>
    );
}
