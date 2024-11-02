import {Meteors} from "@/common/Meteors";
import Rounded from "@/common/RoundedButton";
import Image from "next/image";
import React from "react";
import contact from "../../../data/contact.json";


const Card = () => {

    const openInstagram = () => {window.open(contact.socials[0].link, 'target')}
    const openEmail = () => {window.location.href = contact.socials[2].link}
    const openWhatsapp = () => {window.open(contact.socials[1].link, 'target')}
    const buttons = [
        {image: '/images/icons/instagram.png', callback: openInstagram},
        {image: '/images/icons/email.png', callback: openEmail},
        {image: '/images/icons/whatsapp.png', callback: openWhatsapp}
    ]
    return (
        <div style={{
            display:' flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 100,
            transformStyle: "preserve-3d",
            marginTop: 80
        }}>
            <Image
                src={'/images/about/camera-flash.png'}
                width={60}
                height={60}
                style={{
                    maxWidth: 'unset',
                    position: 'absolute',
                    transform: "translateZ(-40px) rotate(-20deg)",
                    top: -50,
                    left: -50,
                    opacity: 0.6
                }}
                alt={'socials'}
                unoptimized
            />
            <Image
                src={'/images/about/camera.png'}
                width={140}
                height={140}
                style={{
                    maxWidth: 'unset',
                    position: 'absolute',
                    transform: "translateZ(-40px) scaleX(-1)",
                    top: -70,
                    right: -90,
                    opacity: 0.6
                }}
                alt={'camera'}
                unoptimized
            />
            <div style={{
                transform: "translateZ(35px)",
            }}>


                <div className="lg:h-[400px] lg:w-[400px] xs:h-[300px] xs:w-[300px] w-[300px] h-[300px]">
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                    <div className="relative shadow-xl bg-gray-900 border border-gray-800  p-3 h-full overflow-hidden rounded-2xl flex flex-col justify-start items-end">

                       {/* <h1
                            style={{
                                transform: "translateZ(30px)",
                                transformStyle: "preserve-3d",
                                left: -20,
                                zIndex: 90
                            }}
                            className="font-bold text-xl text-white mb-4 absolute">
                            About meee
                        </h1>*/}

                        <p className="font-normal text-base text-slate-500 relative xs:text-xs lg:text-base">
                            I don&apos;t know what to write so I&apos;ll just paste something
                            cool here. One more sentence because lorem ipsum is just
                            unacceptable. Won&apos;t ChatGPT the shit out of this.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tellus mi, efficitur id efficitur at, sodales eget turpis.
                        </p>

                        <p className="font-normal  text-base text-slate-500 relative w-1/2 mt-1 xs:text-xs lg:text-base">
                            I don&apos;t know what to write so I&apos;ll just paste something
                            cool here. One more sentence because lorem ipsum is just
                            unacceptable. Won&apos;t ChatGPT the shit out of this.
                        </p>


                        {/* Meaty part - Meteor effect */}
                        <Meteors number={10}/>

                    </div>

                </div>
            </div>
            <div
                style={{
                    bottom: 25,
                    position: 'absolute',
                    borderRadius: '10px',
                    transform: "translateZ(70px)",
                    display: 'flex',
                }}
                className="md:left-[300px] xs:left-[150px] left-[150px] min-[200px]:invisible"
            >
                {buttons.map((value) => {
                    return (
                        <Rounded
                            key={value.image}
                            backgroundColor={'rgb(255 255 255 / 0.2)'}
                            style={{
                                borderRadius: 30,
                                width: 20,
                                height: 20,
                                padding: 25,
                                backgroundColor: 'rgb(255 255 255 / 0.3)',
                                marginRight: 20
                            }}
                            onClick={value.callback}
                        >
                            <Image
                                src={value.image}
                                width={25}
                                height={25}
                                style={{
                                    maxWidth: 'unset'
                                }}
                                alt={value.image}
                                unoptimized
                            ></Image>
                        </Rounded>
                    )
                })}
            </div>
            <Image
                src={`/images/about/potato.jpg`}
                alt={'potato'}
                width={300}
                height={400}
                objectFit="cover"
                style={{
                    position: 'absolute',
                    borderRadius: '10px',
                    transform: "translateZ(100px)",
                }}
                className="
                top-[210px] right-[150px] w-[150px] h-[200px]
                md:top-[170px] md:right-[220px]  xs:top-[120px] xs:right-[170px]
                xs:w-[150px] xs:h-[200px] md:w-[150px] md:h-[200px]  lg:h-[350px] lg:w-[300px] xl:h-[350px] xl:w-[300px]
                "
                unoptimized
            />
            <div>

            </div>
        </div>
    );
};

export default Card;
