import { Space_Mono } from '@next/font/google'

const SpaceMono = Space_Mono({
    weight: '700',
    style: 'italic',
    subsets: ['latin'],
})

export default function NavigationBar() {
    return (
        <div style={{ textAlign: "center", padding: "8px", fontSize: "22px"}} className={SpaceMono.className} id="navbar">
            <a href="#" style={{ textDecoration: "none" }}>HOME</a> / <a href="#" style={{ textDecoration: "none" }}>WHAT I DO</a> / <a href="#" style={{ textDecoration: "none" }}>SOCIALS</a>
        </div>
    )
}