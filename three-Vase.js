import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Setup
const canvas = document.querySelector("#cvs3");
let cvs = canvas;
console.log(cvs);
let cvsW = getCvsWidth(cvs);
let cvsH = getCvsWidth(cvs);

console.log('Canvas 3 created Size: ', cvsW, cvsH);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, cvsW / cvsH, 0.1, 1000);
console.log('Scene and Camera created === at three-Vase.js [14]');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(cvsW, cvsH);
renderer.setClearColor(0x222222);
canvas.appendChild(renderer.domElement);
console.log('=== render – three-Vase.js [19] ===', renderer);

const controls = new OrbitControls(camera, renderer.domElement);
console.log('=== controls – three-Vase.js [21] ===', controls);

// Guides
let guideLineMat = new THREE.LineBasicMaterial({ color: "blue" });
let guideMat = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true });

function drawGrid() {
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    console.log("=== gridHelper – three-Vase.js [30] ===", gridHelper);
}

function createCenterLine() {
    const dots = [];
    dots.push(new THREE.Vector3(0, 0, 0));
    dots.push(new THREE.Vector3(0, 10, 0));

    const centerLineGeom = new THREE.BufferGeometry().setFromPoints(dots);
    const centerLine = new THREE.LineSegments(centerLineGeom, guideLineMat);
    scene.add(centerLine);
    console.log("=== centerLine – three-Vase.js [38] ===", centerLine);
}

function createBoundingBox() {
  // Cube Guide
  const boundingBoxGeom = new THREE.BoxGeometry(2, 2, 2);
  const boundingBox = new THREE.Mesh(boundingBoxGeom, guideMat);
  boundingBox.position.y = 1;
  scene.add(boundingBox);
}

function drawGuides(origin) {
  let guides = [];
  vaseGuides.forEach((d, i) => {
    let guideGeom = new THREE.PlaneGeometry(2, 2);

    guides.push(new THREE.Mesh(guideGeom, guideMat));
    guides[i].rotation.x = Math.PI / 2;
    guides[i].position.y = 2 - (2 / 100) * d.y;
    scene.add(guides[i]);
  });
}

function createGuides() {
    drawGrid();
    createCenterLine(); 
    createBoundingBox(); 
    drawGuides(vaseGuides); 
}

// Functionality Testing
let cube;
function createTestCube() {
  //  Test CUbe
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const green = new THREE.MeshStandardMaterial({ color: 0x781ce5 });
cube = new THREE.Mesh(geometry, green);
  scene.add(cube);
  console.log("=== Cube – three-Vase.js [44] ===", cube);
}

createGuides();
createTestCube();

// Lathe v3
drawVase(vaseGuides, "blue");


function drawVase(origin, color) {
    const points = [];
    // for (let i = 0; i < 4; ++i) {
    //     let x = 0.1 * i;
    //     let y = 0.5 * i;
    //     points.push(
    //         new THREE.Vector2(x, y)
    //     );
    // }

    origin.forEach((d, i) => {
      let centerW = cvsW / 2;
      let x = (1 / 100) * d.x;
      let y = (2 / 100) * d.y;

      points.push(new THREE.Vector2(x, y));
    });

    const segments = 12;
    const phiStart = 0;
    const phiLength = Math.PI * 2;

    let latheGeometry = new THREE.LatheGeometry(
      points,
      segments,
      phiStart,
      phiLength
    );
    latheGeometry.center();
    console.log(latheGeometry); // check if latheGeometry is defined and has data

    let latheMaterial = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
    });
    let lathe = new THREE.Mesh(latheGeometry, latheMaterial);
    lathe.position.y = 1;
    console.log(lathe);
    // apply a test matrix to the lathe object

    // check if the matrix was applied successfully
    console.log("Lathe Mesh: ", lathe);
    lathe.rotation.x = Math.PI;
    // lathe.rotation,y = 10
    // add the lathe object to the scene
    scene.add(lathe);

}



const ambient = new THREE.AmbientLight(0x404040, 5);
const point = new THREE.PointLight(0xe4ff00, 1, 10);
point.position.set(3, 3, 2);
scene.add(ambient);
scene.add(point);

// const extrudeLathe = {
//     steps: 2,
//     depth: 16,
//     bevelEnabled: false,
//     bevelThickness: 1,
//     bevelSize: 1,
//     bevelOffset: 0,
//     bevelSegments: 1
//   };

// const exGeom = new THREE.ExtrudeGeometry(latheGeometry, extrudeLathe)
// const exMat = new THREE.MeshStandardMaterial({ color: "green" });
// const exMesh = new THREE.Mesh(exGeom, exMat);
// scene.add(exMesh);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    
    // lathe.rotation.x += 0.01;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
