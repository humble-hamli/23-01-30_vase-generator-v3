import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
// Controls created

// Guides
let guideMat = new THREE.LineBasicMaterial({ color: "blue" });
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);
console.log('=== gridHelper – three-Vase.js [30] ===', gridHelper);

const dots = [];
dots.push(new THREE.Vector3(0, 0, 0));
dots.push(new THREE.Vector3(0, 10, 0));

const centerLineGeom = new THREE.BufferGeometry().setFromPoints(dots)
const centerLine = new THREE.LineSegments(centerLineGeom, guideMat)
scene.add(centerLine);
console.log('=== centerLine – three-Vase.js [38] ===', centerLine);

//  Box
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const green = new THREE.MeshStandardMaterial({ color: 0x781ce5 });
const cube = new THREE.Mesh(geometry, green);
scene.add(cube);
console.log('=== Cube – three-Vase.js [44] ===', cube);

// Lathe
// const points = [];
// for (let i = 0; i < 2; ++i) {
//   points.push(
//     new THREE.Vector2(Math.sin(i * 0.2) * 0.2 + 0.5, (i - 0.5) * 0.8)
//   );
// }

// const latheGeometry = new THREE.LatheGeometry(points);
// const blue = new THREE.MeshStandardMaterial({ color: 0x781ce5 });
// const lathe = new THREE.Mesh(latheGeometry, blue);
// scene.add(lathe);
// console.log(lathe);

// // Lathe v2
// const points = [];
// for (let i = 0; i < 2; ++i) {
//   points.push(
//     new THREE.Vector2(Math.sin(i * 0.2) * 0.2 + 0.5, (i - 0.5) * 0.8)
//   );
// }

// const latheGeometry = new THREE.LatheGeometry(points);
// console.log('=== latheGeometry – three-Vase.js [68] ===', latheGeometry);
// const extrudeSettings = {
//   steps: 1,
//   depth: 0.2,
//   bevelEnabled: false,
// };
// latheGeometry.center();
// console.log("=== latheGeometry – three-Vase.js [69] ===", latheGeometry);

// latheGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.1));
// console.log("=== latheGeometry – three-Vase.js [70] ===", latheGeometry);

// latheGeometry.mergeVertices();
// latheGeometry.computeVertexNormals();
// latheGeometry.computeBoundingBox();
// console.log("=== latheGeometry – three-Vase.js [99] ===", latheGeometry);

// const lathe = new THREE.Mesh(
//   new THREE.ExtrudeGeometry(latheGeometry, extrudeSettings),
//   new THREE.MeshStandardMaterial({ color: 0x781ce5 })
// );

// scene.add(lathe);
// console.log(lathe);

// Lathe v3
const points = [];
for (let i = 0; i < 4; ++i) {
    let x = 0.1 * i;
    let y = 0.5 * i;
  points.push(
    new THREE.Vector2(x,y)
  );
}

const segments = 12;
const phiStart = 0;
const phiLength = Math.PI * 2;

let latheGeometry = new THREE.LatheGeometry(
  points,
  segments,
  phiStart,
  phiLength
);
// latheGeometry.center();
console.log(latheGeometry); // check if latheGeometry is defined and has data

let latheMaterial = new THREE.MeshBasicMaterial({ color: "white", wireframe: true });
let lathe = new THREE.Mesh(latheGeometry, latheMaterial);
console.log(lathe);
// apply a test matrix to the lathe object

// check if the matrix was applied successfully
console.log("Lathe Mesh: ", lathe);
// add the lathe object to the scene
scene.add(lathe);


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

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
