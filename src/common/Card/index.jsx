
import Image from "next/image";


const Card = () => {
    return (
        <div style={{
            width: 300,
            height: 400,
            borderRadius: 20,
            border: '1px solid rgba(200 200 200 / 0.2)',
            display:' flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            textShadow: '0 1px 0 #999',
            color: 'rgba(255 255 255 / 0.7)',
            backgroundColor: 'rgba(255 255 255 / 0.2)',
        }}>
            <Image
                src={`/images/about/potato.jpg`}
                alt={'fawf'}
                width={500}
                height={500}
                objectFit="cover"
                style={{
                    borderRadius: '10px',
                    transform: "translateZ(175px)",

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
                    ghj
                </h3>
            </div>
        </div>
    );
};

export default Card;
