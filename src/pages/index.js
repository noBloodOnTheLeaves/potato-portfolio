import About from "@/components/About";
import BeforeAfter from "@/components/BeforeAfter";
import Contact from "@/components/Contact";
import RightNavSocials from "@/components/RightNavSocials";
import Lenis from "lenis";
import Head from 'next/head'
import Curve from '@/components/Layout/Curve'
import {useRouter} from "next/router";
import {useEffect} from "react";
import Banner from '../components/Main/Banner'
import WorkPreview from "src/components/Main/ModelsPreview";
import photos from '../../data/photos.json'

export default function Home() {
    const router = useRouter();
    useEffect( () => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }, [])

    useEffect(() => {
        // prefetch albums pages
        photos.albumPreview.forEach(album => router.prefetch(`/album/${album.route}`))
    }, [router])

    return (
        <>
            <Head>
                <title>Ricecare</title>
                <meta name="description" content="Home page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                <link href="https://fonts.cdnfonts.com/css/brush-strokes" rel="stylesheet"/>
            </Head>
            <RightNavSocials/>
            <Banner/>
            <About/>
            <div className="mb-28"></div>
            <Curve>
                {/*<AlbumTitle/>*/}
                <WorkPreview/>
            </Curve>
            <BeforeAfter/>
            <Contact/>
        </>
    )
}
