import '@/styles/styles.scss';
import '@/styles/globals.css'
import Header from "@/components/Header";
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps, router }) {
    return (
        <div className='main'>
            <Header/>
            <AnimatePresence mode='wait'>
                <Component key={router.route} {...pageProps} />
            </AnimatePresence>
        </div>
    )
}
