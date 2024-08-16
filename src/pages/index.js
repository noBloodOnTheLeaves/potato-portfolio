import Contact from "@/components/Contact";
import Head from 'next/head'
import Curve from '@/components/Layout/Curve'
import Banner from '../components/Main/Banner'
import WorkPreview from "@/components/Main/WorkPreview";

export default function Home() {
    return (
        <>
            <Head>
                <title>Ricecare</title>
                <meta name="description" content="Home page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                <link href="https://fonts.cdnfonts.com/css/brush-strokes" rel="stylesheet"/>
            </Head>
            <Banner/>
            <Curve>
                <WorkPreview/>
            </Curve>
            <Contact/>

        </>
    )
}
