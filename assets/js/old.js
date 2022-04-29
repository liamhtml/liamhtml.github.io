let mouseX = 0;
let mouseY = 0;
onmousemove = function (e) { mouseX = e.clientX; mouseY = e.clientY; }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const starGeometry = new THREE.SphereGeometry(0.05);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffffff, wireframe: true });

camera.position.z = 50;

// this array will hold the positions of the stars generated at the beginning so that we can draw lines from them
let stars = [];

// place 800 stars
for (let e = 0; e < 800; e++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);
    star.position.x = Math.random() * 190 - 90;
    star.position.y = Math.random() * 100 - 50;
    star.position.z = Math.random() * 100 - 70;

    stars.push(star);
}

let i = 0;
let p = 0;

// animation loop
function animate() {
    camera.position.z -= 0.005;

    // start to speed up after about 13s
    if (i > 800) {
        camera.position.z -= (0.01 * (p / 10));
        p++;
    }

    // create hyperspace lines
    if (i > 1100) {
        for (let e = 0; e < stars.length; e++) {
            const currentStar = stars[e];

            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

            const lineVertices = [];
            lineVertices.push(new THREE.Vector3(currentStar.position.x, currentStar.position.y, currentStar.position.z))
            lineVertices.push(new THREE.Vector3(currentStar.position.x, currentStar.position.y, currentStar.position.z + 900))

            const lineGeometry = new THREE.BufferGeometry().setFromPoints(lineVertices);

            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);

        }
    }

    i++;
    console.log(i);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();