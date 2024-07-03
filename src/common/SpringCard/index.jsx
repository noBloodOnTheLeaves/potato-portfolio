import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";


const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const SpringCard = ({fileName = 'test', alt='test', label= 'name', instagram = null}) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                width: 400,
                height: 400,
                transform,
            }}
            className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-gray-600 to-black-300"
        >
            <Image
                src={`/images/album-preview/${fileName}.jpg`}
                alt={'fawf'}
                objectFit={'cover'}
                fill={true}
                style={{
                    borderRadius: '10px',
                    transform: "translateZ(75px)",
                }}
            />
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="flex justify-between items-end w-full h-full flex-row p-8"
            >
                <h3
                    style={{
                        transform: "translateZ(50px)",
                    }}

                >
                    {label}
                </h3>
                {
                    instagram && <Link href={instagram} target="_blank" style={{
                        transform: "translateZ(50px)",
                    }}>
                        <Image
                            src={`/images/icons/instagram.png`}
                            width={20}
                            height={20}
                            alt={alt}

                        ></Image>
                    </Link>
                }
            </div>
        </motion.div>
    );
};

export default SpringCard;
