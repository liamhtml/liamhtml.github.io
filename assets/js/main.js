let mouseX = 0;
let mouseY = 0;
onmousemove = function (e) { mouseX = e.clientX; mouseY =  e.clientY; }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const starMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

// this array will hold the positions of the stars generated at the beginning so that we can extend them
let stars = [];

// place 800 stars
for (let e = 0; e < 800; e++) {
    const starVertices = [];

    let starX = Math.random() * 190 - 90;
    let starY = Math.random() * 100 - 50;
    let starZ = Math.random() * 100 - 70;

    starVertices.push(new THREE.Vector3(starX, starY, starZ));
    starVertices.push(new THREE.Vector3(starX, starY, starZ + 0.2));


    const starGeometry = new THREE.BufferGeometry().setFromPoints(starVertices);

    const star = new THREE.Line(starGeometry, starMaterial);

    stars.push({
        star: star,
        geometry: starGeometry
    });
    scene.add(star);
}

let i = 0;
let p = 0;

// animation loop
function animate() {
    camera.position.z -= 0.005;

    // start to speed up after about 13s
    if (i > 800) {
        camera.position.z -= (0.01 * (p/12));
        p++;
    }

    // create hyperspace lines
    if (i > 1100) {
        for (let e = 0; e < stars.length; e++) {
            const starDatum = stars[e];
        }
    }

    i++;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();