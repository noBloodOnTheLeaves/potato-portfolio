import Curve from '@/components/Layout/Curve'
import WorkPreview from "@/components/Main/ModelsPreview";
import Head from 'next/head'

export default function Work() {
  return (
    <>
      <Head>
        <title>Ricercare work</title>
        <meta name="description" content="Photos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Curve>
          <div className="mt-40 mb-40">
              <WorkPreview/>
          </div>

      </Curve>
    </>
  )
}
