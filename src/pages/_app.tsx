import App, { AppProps } from 'next/app';
import '../styles/globals.css'
import { Space_Grotesk } from '@next/font/google'

const SpaceGrotesk = Space_Grotesk({
    weight: '400',
    subsets: ['latin']
})

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={SpaceGrotesk.className}>
            <Component { ...pageProps} />
        </div>
    )
}
