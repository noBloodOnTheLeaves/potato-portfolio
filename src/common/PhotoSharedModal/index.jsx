import Rounded from "@/common/RoundedButton";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {CldImage} from "next-cloudinary";
import {useState} from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../../../lib/utils";
import { range } from "../../../lib/utils";

export default function SharedModal({
                                        index,
                                        images,
                                        changePhotoId,
                                        closeModal,
                                        navigation,
                                        currentPhoto,
                                        direction,
                                    }) {
    const [loaded, setLoaded] = useState(false);

    let filteredImages = images?.filter((img) =>
        range(index - 15, index + 15).includes(img.id),
    );

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (index < images?.length - 1) {
                changePhotoId(index + 1);
            }
        },
        onSwipedRight: () => {
            if (index > 0) {
                changePhotoId(index - 1);
            }
        },
        trackMouse: true,
    });

    let currentImage = images ? images[index] : currentPhoto;

    return (
        <MotionConfig
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div
                className="relative z-40 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
                {...handlers}
            >
                <div className="absolute right-1 flex items-start gap-5 pr-5 pt-16 text-white h-full">
                    <button
                        onClick={() => closeModal()}
                        className="rounded-full p-1 "
                    >
                        <Rounded
                            backgroundColor={'rgb(255 255 255 / 0.2)'}
                            style={{
                                borderRadius: 30,
                                width: 20,
                                height: 20,
                                padding: 25,
                                backgroundColor: 'rgb(255 255 255 / 0.3)'
                            }}
                        >
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </p>
                        </Rounded>
                    </button>
                </div>
                {/* Main image */}
                <div className="w-full overflow-hidden">
                    <div className="relative flex aspect-[3/2] items-center justify-center">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute"
                            >
                                <CldImage
                                    key={currentImage.public_id}
                                    src={currentImage.public_id}
                                    alt={currentImage.public_id}
                                    onLoad={() => setLoaded(true)}
                                    width={navigation ? 1280 : 1920}
                                    height={navigation ? 853 : 1280}
                                    placeholder="blur"
                                    blurDataURL={currentImage.blurDataUrl}
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Buttons + bottom nav bar */}
                <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
                    {/* Buttons */}
                    {loaded && (
                        <div className="relative aspect-[3/2] max-h-full w-full">
                            {navigation && (
                                <>
                                    {index > 0 && (
                                        <Rounded
                                            backgroundColor={'rgb(255 255 255 / 0.2)'}
                                            style={{
                                                left: '0.75rem',
                                                top: '50%',
                                                position: 'absolute',
                                                borderRadius: 30,
                                                width: 20,
                                                height: 20,
                                                padding: 25,
                                                backgroundColor: 'rgb(255 255 255 / 0.3)'
                                            }}
                                            onClick={() => changePhotoId(index - 1)}
                                        >
                                            <p>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                    <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </p>
                                        </Rounded>
                                    )}
                                    {index + 1 < images.length && (
                                        <Rounded
                                            backgroundColor={'rgb(255 255 255 / 0.2)'}
                                            style={{
                                                right: '0.75rem',
                                                top: '50%',
                                                position: 'absolute',
                                                borderRadius: 30,
                                                width: 20,
                                                height: 20,
                                                padding: 25,
                                                backgroundColor: 'rgb(255 255 255 / 0.3)'
                                            }}
                                            onClick={() => changePhotoId(index + 1)}
                                        >
                                            <p>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </p>
                                        </Rounded>

                                    )}
                                </>
                            )}
                        </div>
                    )}
                    {/* Bottom Nav bar */}
                    {navigation && (
                        <div className="fixed inset-x-0 bottom-0 z-50 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
                            <motion.div
                                initial={false}
                                className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
                            >
                                <AnimatePresence initial={false}>
                                    {filteredImages.map(({ public_id, format, id }) => (
                                        <motion.button
                                            initial={{
                                                width: "0%",
                                                x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                                            }}
                                            animate={{
                                                scale: id === index ? 1.25 : 1,
                                                width: "100%",
                                                x: `${Math.max(index * -100, 15 * -100)}%`,
                                            }}
                                            exit={{ width: "0%" }}
                                            onClick={() => changePhotoId(id)}
                                            key={id}
                                            className={`${
                                                id === index
                                                    ? "z-20 rounded-md shadow shadow-black/50"
                                                    : "z-10"
                                            } ${id === 0 ? "rounded-l-md" : ""} ${
                                                id === images.length - 1 ? "rounded-r-md" : ""
                                            } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                                        >

                                            <CldImage
                                                key={public_id}
                                                src={public_id}
                                                alt={public_id}
                                                width={180}
                                                height={120}
                                                priority
                                                className={`${
                                                    id === index
                                                        ? "brightness-110 hover:brightness-110"
                                                        : "brightness-50 contrast-125 hover:brightness-75"
                                                } h-full transform object-cover transition`}
                                            />
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </MotionConfig>
    );
}
