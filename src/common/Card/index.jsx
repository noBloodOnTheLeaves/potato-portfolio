'use client'
import {useMotionValue, useTransform, motion} from "framer-motion";
import Image from "next/image";
import React from 'react'


export default function Card({fileName = 'test', alt='test'}) {
    const cardX = useMotionValue(0);
    const cardY = useMotionValue(0);
    const rotateX = useTransform(cardY, [-300, 300], [10, -10]); // Reversed values
    const rotateY = useTransform(cardX, [-300, 300], [-10, 10]); // Reversed values
    const cardRotateX = useTransform(cardY, [-300, 300], [25, -25]); // Adjusted rotation values
    const cardRotateY = useTransform(cardX, [-300, 300], [-25, 25]); // Adjusted rotation values
    const textRotateX = useTransform(cardY, [-250, 250], [150, -150]); // Adjusted rotation values
    const textRotateY = useTransform(cardX, [-250, 250], [-150, 150]); // Adjusted rotation values

    const handleMouseMove = (event) => {
        const offsetX = event.clientX - window.innerWidth / 2;
        const offsetY = event.clientY - window.innerHeight / 2;

        cardX.set(offsetX);
        cardY.set(offsetY);
    };

    const handleMouseLeave = () => {
        cardX.set(0);
        cardY.set(0);
    };

    return (
        <motion.div
            style={{
                perspective: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* this div can be used as the 'dotted grid' */}
            <motion.div
                style={{
                   // margin: "auto",
                    width: "100%",
                    //height: "100%",
                    transformStyle: "preserve-3d",
                    perspective: 400,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    rotateX,
                    rotateY
                }}
                transition={{ velocity: 0 }}
            >
                <motion.div
                    key={fileName}
                    style={{
                        boxShadow: "0px 0px 30px -7px rgba(0,0,0,0.45)",
                        borderRadius: 10,
                        backgroundColor: "black",
                        width: 600,
                        height: 400,
                        transformStyle: "preserve-3d",
                        perspective: 800, // Set perspective on the card
                        position: "relative",
                        cardRotateX,
                        cardRotateY
                    }}
                    transition={{velocity: 0}}
                >
                    <Image
                        src={`/images/album-preview/${fileName}.jpg`}
                        alt={alt}
                        fill={true}
                        style={{
                            borderRadius: '10px'
                        }}
                    />
                    <motion.div
                        style={{
                            width: 400,
                            height: 30,
                            perspective: 400, // Set perspective on the card
                            position: "relative",
                            textRotateX,
                            textRotateY
                        }}
                        transition={{velocity: 0}}
                    >
                    <h3
                        style={{
                            paddingTop: '92%',
                            paddingLeft: '20px',
                            height: '30px',
                            position: 'fixed',
                        }}
                    >
                        Name of a person
                    </h3>

                        <Image
                            src={`/images/icons/instagram.png`}
                            width={20}
                            height={20}
                            alt={'awfhawf'}
                            style={{
                                marginLeft: '90%',
                                marginTop: '92%',
                                position: 'fixed',
                            }}
                        ></Image>
                    </motion.div>

                </motion.div>
            </motion.div>
        </motion.div>
    );
}
