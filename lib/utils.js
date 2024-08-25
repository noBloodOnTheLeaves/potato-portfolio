import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

export const range = (start, end) => {
    let output = [];
    if (typeof end === "undefined") {
        end = start;
        start = 0;
    }
    for (let i = start; i < end; i += 1) {
        output.push(i);
    }
    return output;
};
