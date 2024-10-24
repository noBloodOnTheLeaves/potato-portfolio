import Carousel from "@/common/Carousel";
import { useRouter } from "next/router";
import getResults from "../../../../lib/cachedResults";
import cloudinary from "../../../../lib/cloudinary";
import getBase64ImageUrl from "../../../../lib/generateBlurPlaceholder";
import photos from '../../../../data/photos.json'

const Home = ({ currentPhoto }) => {
    const router = useRouter();
    const { photoId } = router.query;
    let index = Number(photoId);
    //const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

    return (
        <>
                <Carousel currentPhoto={currentPhoto} index={index} />
        </>
    );
};

export default Home;

export const getStaticProps = async (context) => {
    const folders = photos.albumPreview.map(e => e.route)
    const results0 = await getResults(folders[0]);
    const results1 = await getResults(folders[1]);
    const results2 = await getResults(folders[2]);

    let reducedResults = [];
    let i = 0;
    for (let result of results0.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
        });
        i++;
    }

    i = 0;
    for (let result of results1.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
        });
        i++;
    }

    i = 0;
    for (let result of results2.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
        });
        i++;
    }

    const currentPhoto = reducedResults.find(
        (img) => img.public_id === context.params.photoId,
    );
    currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

    return {
        props: {
            currentPhoto: currentPhoto,
        },
    };
};

export async function getStaticPaths() {
    const folders = photos.albumPreview.map(e => e.route)
    const results0 = await cloudinary.v2.search
        .expression(`folder:${folders[0]}/*`)
        .sort_by("public_id", "desc")
        .max_results(400)
        .execute();
    const results1 = await cloudinary.v2.search
        .expression(`folder:${folders[1]}/*`)
        .sort_by("public_id", "desc")
        .max_results(400)
        .execute();
    const results2 = await cloudinary.v2.search
        .expression(`folder:${folders[2]}/*`)
        .sort_by("public_id", "desc")
        .max_results(400)
        .execute();

    let fullPaths = [];
    for (let i = 0; i < results0.resources.length; i++) {
        fullPaths.push({ params: { photoId: results0.resources[i].public_id } });
    }
    for (let i = 0; i < results1.resources.length; i++) {
        fullPaths.push({ params: { photoId: results1.resources[i].public_id } });
    }
    for (let i = 0; i < results2.resources.length; i++) {
        fullPaths.push({ params: { photoId: results2.resources[i].public_id } });
    }
    return {
        paths: fullPaths,
        fallback: false,
    };
}
