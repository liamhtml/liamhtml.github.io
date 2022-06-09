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
        geometry: starGeometry,
        start: {
            x: starX,
            y: starY,
            z: starZ
        },
        end: {
            x: starX,
            y: starY,
            z: starZ + 0.2
        }
    });
    scene.add(star);
}

let i = 0;
let p = 0;

// animation loop
function animate() {
    if (i < 800 || i > 1125) {
        camera.position.z -= 0.002;
    }
    // start to speed up after about 13s
    else if (i > 800 && i < 1125) {
        camera.position.z -= (0.01 * (p/10));
        p++;
    }

    // the speed at which lines are stretched and squished
    const change = i / 150;
    // create hyperspace lines
    if (i > 1100  && i < 1112) {
        for (let e = 0; e < stars.length; e++) {
            const starDatum = stars[e];
            const pos = starDatum.geometry.getAttribute("position");

            // set the new position of the end point
            pos.setXYZ(1, starDatum.end.x, starDatum.end.y, starDatum.end.z - change);
            starDatum.end.z -= change;
            // update the vertex buffer in graphics memory
            pos.needsUpdate = true;
            // update the bounds to support, e.g., frustum culling
            starDatum.geometry.computeBoundingBox();
            starDatum.geometry.computeBoundingSphere();
        }
    } else if (i > 1112) {
        for (let e = 0; e < stars.length; e++) {
            const starDatum = stars[e];
            const pos = starDatum.geometry.getAttribute("position");

            // set the new position of the end point
            pos.setXYZ(0, starDatum.start.x, starDatum.start.y, starDatum.start.z - change);
            starDatum.start.z -= change;
            // update the vertex buffer in graphics memory
            pos.needsUpdate = true;
            // update the bounds to support, e.g., frustum culling
            starDatum.geometry.computeBoundingBox();
            starDatum.geometry.computeBoundingSphere();
            
            // once the hyperspace lines are done shortening stop the movement of the start vertex
            if (starDatum.start.z - starDatum.end.z < 0.5) {
                // make sure every star is the right length
                for (let o = 0; o < stars.length; o++) {
                    const starDatum = stars[o];
                    const pos = starDatum.geometry.getAttribute("position");

                    // set the new position of the start point
                    pos.setXYZ(0, starDatum.end.x, starDatum.end.y, starDatum.end.z + 0.2);
                    starDatum.start.z += 0.2;
                    // update the vertex buffer in graphics memory
                    pos.needsUpdate = true;
                    // update the bounds to support, e.g., frustum culling
                    starDatum.geometry.computeBoundingBox();
                    starDatum.geometry.computeBoundingSphere();
                }
                break;
            }
        }
    }

    i++;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();