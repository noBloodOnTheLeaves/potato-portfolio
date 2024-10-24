import Modal from "@/common/PhotoViewModal";
import {WobbleCard} from "@/common/WobbleCard";
import Curve from "@/components/Layout/Curve";
import Lenis from "lenis";
import {CldImage} from "next-cloudinary";
import {useEffect, useState} from "react";
import getResults from "../../../lib/cachedResults";
import getBase64ImageUrl from "../../../lib/generateBlurPlaceholder";

export default function Photos({images}) {
    //const router = useRouter();
    const [photoId, setPhotoId]  = useState(null);
    /*const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
    const lastViewedPhotoRef = useRef(null);*/
    const [openModal, setOpenModal] = useState(false);

    useEffect( () => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }, [images])
    /*useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
            setLastViewedPhoto(null);
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto]);*/

    return (
        <>
            <Curve>
        <div className="mt-28 container">
            {openModal && (
                <Modal
                    images={images}
                    photoId={photoId}
                    onClose={() => {
                        setOpenModal(false)
                        /*setLastViewedPhoto(photoId);*/
                    }}
                />
            )}
            <div className="columns-1 gap-6 sm:columns-1 xl:columns-2 2xl:columns-3" style={{zIndex: 1}}>
                {images.map(({ id, public_id, format, blurDataUrl }) => (
                    <WobbleCard
                        key={public_id}
                        containerClassName="col-span-1 h-full mb-4"
                    >
                        <CldImage
                            key={public_id}
                            src={public_id}
                            alt={public_id}
                            onClick={()=>{
                                setPhotoId(id)
                                setOpenModal(true)}
                            }
                            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                            style={{ transform: "translate3d(0, 0, 0)" }}
                            sizes="(max-width: 640px) 100vw,
                                      (max-width: 1280px) 50vw,
                                      (max-width: 1536px) 33vw,
                                      25vw"
                            blurDataURL={blurDataUrl}
                            width={720}
                            height={480}
                            priority
                        />
                    </WobbleCard>
                ))}
            </div>
        </div>
      {/* /* <div ref={container}  className="container mt-24" style={{position: 'absolute'}}>
            {

                router.query.slug && photos.albums[router.query.slug].map( (album, i) => {
                    const targetScale = 1 - ( (photos.albums[router.query.slug].length - i) * 0.05);
                    return <StackCard key={`p_${i}`} i={i} {...album} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale}/>
                })
            }
        </div>*/}
            </Curve>
            </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: 'coal' } }, { params: { slug: 'mandarin' }},  { params: { slug: 'gimli' } }],
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const results = await getResults(params.slug);
    let reducedResults = [];

    let i = 0;
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
        });
        i++;
    }

    const blurImagePromises = results.resources.map((image) => {
        return getBase64ImageUrl(image);
    });
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

    for (let i = 0; i < reducedResults.length; i++) {
        reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
    }

    return {
        props: {
            images: reducedResults,
        },
    };
}
