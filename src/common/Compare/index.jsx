"use client";
import {SparklesCore} from "@/common/Sparkles";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {cn} from "../../../lib/utils";

export const Compare = ({
                            firstImage = "",
                            secondImage = "",
                            className,
                            firstImageClassName,
                            secondImageClassname,
                            initialSliderPercentage = 50,
                            slideMode = "hover",
                            showHandlebar = true,
                            autoplay = false,
                            autoplayDuration = 5000
                        }) => {
    const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
    const [isDragging, setIsDragging] = useState(false);

    const sliderRef = useRef(null);

    const [isMouseOver, setIsMouseOver] = useState(false);

    const autoplayRef = useRef(null);

    const startAutoplay = useCallback(() => {
        if (!autoplay) return;

        const startTime = Date.now();
        const animate = () => {
            const elapsedTime = Date.now() - startTime;
            const progress =
                (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
            const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

            setSliderXPercent(percentage);
            autoplayRef.current = setTimeout(animate, 16); // ~60fps
        };

        animate();
    }, [autoplay, autoplayDuration]);

    const stopAutoplay = useCallback(() => {
        if (autoplayRef.current) {
            clearTimeout(autoplayRef.current);
            autoplayRef.current = null;
        }
    }, []);

    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, [startAutoplay, stopAutoplay]);

    function mouseEnterHandler() {
        setIsMouseOver(true);
        stopAutoplay();
    }

    function mouseLeaveHandler() {
        setIsMouseOver(false);
        if (slideMode === "hover") {
            setSliderXPercent(initialSliderPercentage);
        }
        if (slideMode === "drag") {
            setIsDragging(false);
        }
        startAutoplay();
    }

    const handleStart = useCallback((clientX) => {
        if (slideMode === "drag") {
            setIsDragging(true);
        }
    }, [slideMode]);

    const handleEnd = useCallback(() => {
        if (slideMode === "drag") {
            setIsDragging(false);
        }
    }, [slideMode]);

    const handleMove = useCallback((clientX) => {
        if (!sliderRef.current) return;
        if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
            const rect = sliderRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const percent = (x / rect.width) * 100;
            requestAnimationFrame(() => {
                setSliderXPercent(Math.max(0, Math.min(100, percent)));
            });
        }
    }, [slideMode, isDragging]);

    const handleMouseDown = useCallback((e) => handleStart(e.clientX), [handleStart]);
    const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
    const handleMouseMove = useCallback((e) => handleMove(e.clientX), [handleMove]);

    const handleTouchStart = useCallback((e) => {
        if (!autoplay) {
            handleStart(e.touches[0].clientX);
        }
    }, [handleStart, autoplay]);

    const handleTouchEnd = useCallback(() => {
        if (!autoplay) {
            handleEnd();
        }
    }, [handleEnd, autoplay]);

    const handleTouchMove = useCallback((e) => {
        if (!autoplay) {
            handleMove(e.touches[0].clientX);
        }
    }, [handleMove, autoplay]);

    return (
        (<div
            ref={sliderRef}
            className={cn("w-[400px] h-[400px] overflow-hidden", className)}
            style={{
                position: "relative",
                cursor: slideMode === "drag" ? "grab" : "col-resize",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={mouseLeaveHandler}
            onMouseEnter={mouseEnterHandler}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}>
            <AnimatePresence initial={false}>
                <motion.div
                    className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
                    style={{
                        left: `${sliderXPercent}%`,
                        top: "0",
                        zIndex: 40,
                    }}
                    transition={{ duration: 0 }}>
                    <div
                        className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" />
                    <div
                        className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" />
                    <div
                        className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
                        <MemoizedSparklesCore
                            background="transparent"
                            minSize={0.4}
                            maxSize={1}
                            particleDensity={1200}
                            className="w-full h-full"
                            particleColor="#FFFFFF" />
                    </div>
                    {showHandlebar && (
                        <div
                            className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute   flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M19 9H6.65856C5.65277 9 5.14987 9 5.02472 8.69134C4.89957 8.38268 5.25517 8.01942 5.96637 7.29289L8.21091 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 15H17.3414C18.3472 15 18.8501 15 18.9753 15.3087C19.1004 15.6173 18.7448 15.9806 18.0336 16.7071L15.7891 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            <div
                className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
                <AnimatePresence initial={false}>
                    {firstImage ? (
                        <motion.div
                            className={cn(
                                "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none overflow-hidden",
                                firstImageClassName
                            )}
                            style={{
                                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
                            }}
                            transition={{ duration: 0 }}>
                            <Image
                                src={firstImage}
                                alt={firstImage}
                                objectFit={'cover'}
                                fill={true}
                                className={cn(
                                    "absolute inset-0  z-20 rounded-2xl flex-shrink-0 w-full h-full select-none",
                                    firstImageClassName
                                )}
                            />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
            <AnimatePresence initial={false}>
                {secondImage ? (
                    <motion.img
                        className={cn(
                            "absolute top-0 left-0 z-[19]  rounded-2xl w-full h-full select-none",
                            secondImageClassname
                        )}
                        alt={secondImage}
                        src={secondImage}
                        draggable={false} />
                ) : null}
            </AnimatePresence>
        </div>)
    );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
