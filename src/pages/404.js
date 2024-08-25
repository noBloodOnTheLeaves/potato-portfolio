import Rounded from "@/common/RoundedButton";
import {ShootingStars} from "@/common/StarsBackground/ShootingStars";
import {StarsBackground} from "@/common/StarsBackground/StarsBackground";
import {useRouter} from "next/router";
import Lottie from "react-lottie";
import fourZeroFour from "../../public/lotties/404.json"
export default function Custom404() {
    const router = useRouter()
    const closeOptions = {
        loop: true,
        autoplay: true,
        animationData: fourZeroFour,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return <div className="z-5 h-screen w-120  bg-black flex items-center ">
        <div className="container flex flex-col  items-center justify-center px-5 text-gray-700">
            <Lottie
                options={closeOptions}
                height={120}
                width={300}
            />
                <p
                    className="text-2xl mt-3 md:text-3xl relative  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans "
                >{"Sorry I couldn't find this page. "}</p>
                <p className="my-8 relative  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">But dont worry, you can find plenty of other things on my homepage.</p>

                <Rounded
                    backgroundColor={'#27272A'}
                    style={{
                        borderRadius: '0.375em',
                        width: 300,
                        cursor: "pointer"
                    }}
                    onClick={()=>{
                        router.push('/')
                    }}
                >
                    <p className="relative  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">← Return home</p>
                </Rounded>
            <StarsBackground/>
            <ShootingStars/>
        </div>
    </div>
}
