import Image from 'next/image';
import HexagonFullLight from '../public/HexagonFullLight.svg';
import HexagonFullDark from '../public/HexagonFullDark.svg';

export default function LogoMarquee() {
    return (
        <div style={{ display: "flex", alignItems: "center", margin: "8px" }}>
            <Image src={HexagonFullLight} alt="Filled hexagon logo" id="logo-light" height={80}></Image>
            <Image src={HexagonFullDark} alt="Filled hexagon logo" id="logo-dark" height={80}></Image>

            <h1 style={{ fontSize: "45px", paddingLeft: "12px", whiteSpace: "nowrap" }}><strong>Liam Preisser</strong></h1>
        </div>
    )
}