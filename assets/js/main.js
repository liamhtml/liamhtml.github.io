let mouseX = 0;
let mouseY = 0;
onmousemove = function (e) { mouseX = e.clientX; mouseY =  e.clientY; }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const starGeometry = new THREE.SphereGeometry(0.1);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffffff, wireframe: true });

camera.position.z = 50;

for (let e = 0; e < 500; e++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);
    star.position.x = Math.random() * 190 - 90;
    star.position.y = Math.random() * 100 - 50;
    star.position.z = Math.random() * 100 - 70;
}

let i = 0;

function animate() {
    camera.position.z -= 0.005;

    if (i > 800) {
        camera.position.z -= 4;
    }

    i++;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();