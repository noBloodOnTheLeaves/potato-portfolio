import {Compare} from "@/common/Compare";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import photos from "../../../data/photos.json"
export default function BeforeAfterCarousel() {
    const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
    const items = photos.beforeAfter
    // we want the scope to be always to be in the scope of the array so that the carousel is endless
    const indexInArrayScope =
        ((activeIndex % items.length) + items.length) % items.length;

    // so that the carousel is endless, we need to repeat the items twice
    // then, we slice the the array so that we only have 3 items visible at the same time
    const visibleItems = [...items, ...items].slice(
        indexInArrayScope,
        indexInArrayScope + 3
    );
    const handleClick = (newDirection) => {
        setActiveIndex((prevIndex) => [prevIndex[0] + newDirection, newDirection]);
    };

    const variants = {
        enter: ({direction}) => {
            return {
                scale: 0.2,
                x: direction < 1 ? 50 : -50,
                opacity: 0,
            };
        },
        center: ({position, direction}) => {
            return {
                scale: position() === "center" ? 1 : 0.7,
                x: position() === "left" ? 300 : position() === "right" ? -300 : 0,
                zIndex: getZIndex({position, direction}),
                opacity: position() === "left" ? 0.5 : position() === "right" ? 0.5 : 1,
            };
        },
        exit: ({direction}) => {
            return {scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0};
        }
    };

    return (
        <div className="columns-1 mt-40">
            <div className="flex  items-center">
                {/*AnimatePresence is necessary to show the items after they are deleted because only max. 3 are shown*/}
                <AnimatePresence mode="popLayout" initial={false}>
                    {visibleItems.map((item, index) => {
                        // The layout prop makes the elements change its position as soon as a new one is added
                        // The key tells framer-motion that the elements changed its position
                        return (
                            <motion.div
                                key={item.firstImage}
                                layout
                                custom={{
                                    direction,
                                    position: () => {
                                        if (item === visibleItems[0]) {
                                            return "left";
                                        } else if (item === visibleItems[1]) {
                                            return "center";
                                        } else {
                                            return "right";
                                        }
                                    }
                                }}
                                variants={variants}
                                initial="enter"
                                animate={'center'}
                                exit="exit"
                                transition={{duration: 0.5}}
                            >
                                <Compare
                                    firstImage={item.firstImage}
                                    secondImage={item.secondImage}
                                    firstImageClassName="object-cover object-left-top"
                                    secondImageClassname="object-cover object-left-top"
                                    className={"h-[250px] w-[200px] md:h-[500px] md:w-[500px] " /*+ index === 0 ? 'left-100' : index === 1 && 'right-100'*/}
                                    slideMode="hover"
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            <div className="flex justify-center mt-10">
                <motion.button
                    whileTap={{scale: 0.8}}
                    onClick={() => handleClick(-1)}
                    className="mr-5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#FFFFFF"
                         fill="none">
                        <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.button>
                <motion.button
                    hileTap={{scale: 0.8}}
                    onClick={() => handleClick(1)}
                    className="ml-5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#FFFFFF"
                         fill="none">
                        <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.button>
            </div>
        </div>
    );
}



function getZIndex({position, direction}) {
    const indexes = {
        left: direction > 0 ? 2 : 1,
        center: 3,
        right: direction > 0 ? 1 : 2
    };
    return indexes[position()];
}
