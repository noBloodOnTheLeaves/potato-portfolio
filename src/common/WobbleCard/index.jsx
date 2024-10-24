"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {cn} from "../../../lib/utils";

export const WobbleCard = ({
                               children,
                               containerClassName,
                               className,
                           }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) / 20;
        const y = (clientY - (rect.top + rect.height / 2)) / 20;
        setMousePosition({ x, y });
    };
    return (
        <motion.section
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setMousePosition({ x: 0, y: 0 });
            }}
            style={{
                transform: isHovering
                    ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
                    : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                transition: "transform 0.1s ease-out",
            }}
            className={cn(
                "mx-auto w-full h-full relative rounded-2xl overflow-hidden",
                containerClassName
            )}
        >
            <div
                className="relative h-full sm:rounded-2xl overflow-hidden"
                style={{
                    boxShadow:
                        "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
                }}
            >
                <motion.div
                    style={{
                        transform: isHovering
                            ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.05, 1.05, 1)`
                            : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                        transition: "transform 0.2s ease-out",
                    }}
                    className={cn("h-full", className)}
                >
                    {children}
                </motion.div>
            </div>
        </motion.section>
    );
};