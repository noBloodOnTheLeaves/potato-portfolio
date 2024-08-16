"use client";
import {ShootingStars} from "@/common/StarsBackground/ShootingStars";
import {StarsBackground} from "@/common/StarsBackground/StarsBackground";
import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from "../../../lib/animated-modal";

export function AnimatedModal({title = 'Thank you! 😊', content = '', open = false, setOpen }) {

    return (
        <div className="py-40  flex items-center justify-center">
            <Modal>
                <ModalBody openModal={open} setOpenModal={setOpen}>
                    <ModalContent>
                        <h4 className="relative text-lg md:text-3xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans ">
                            {title}
                        </h4>
                        <div
                            className="py-20 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                            {/*#todo add cat*/}
                            <div className="flex  items-center justify-center">
                                <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                                    {content}
                                </div>
                            </div>
                        </div>
                    </ModalContent>
                    <ModalFooter className="gap-4">

                    </ModalFooter>
                    <StarsBackground starDensity={0.0002} className="w-screen h-screen"/>
                    <ShootingStars/>
                </ModalBody>
            </Modal>
        </div>
    );
}
