import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader";
import { OBJExporter } from "three/addons/exporters/OBJExporter";

let canvas, scene, camera, renderer;
function init() {
  // Setup
  canvas = document.querySelector("#cvs3");
  let cvs = canvas;
  // console.log(cvs);
  let cvsW = getCvsWidth(cvs);
  let cvsH = getCvsWidth(cvs);

  console.log("Canvas 3 created Size: ", cvs);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, cvsW / cvsH, 0.1, 1000);

  // console.log("Scene and Camera created === at three-Vase.js [14]");

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(cvsW, cvsH);
  renderer.setClearColor(0x222222);
  canvas.prepend(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // add Objects

  // Guides

  function drawGrid() {
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    // console.log("=== gridHelper – three-Vase.js [30] ===", gridHelper);
  }

  function createCenterLine() {
    const dots = [];
    dots.push(new THREE.Vector3(0, -1, 0));
    dots.push(new THREE.Vector3(0, 3, 0));

    const centerLineGeom = new THREE.BufferGeometry().setFromPoints(dots);
    const centerLine = new THREE.LineSegments(centerLineGeom, guideLineMat);
    scene.add(centerLine);
    // console.log("=== centerLine – three-Vase.js [38] ===", centerLine);
  }

  // define colors and materials
  let gridColor = new THREE.Color(20, 10, 10);
  let gridMat = new THREE.MeshBasicMaterial({
    color: gridColor,
    wireframe: true,
    opacity: 0.2,
  });

  function createBoundingBox() {
    // Cube Guide
    const boundingBoxGeom = new THREE.BoxGeometry(2, 2, 2);
    const boundingBox = new THREE.Mesh(boundingBoxGeom, gridMat);
    boundingBox.position.y = 1;
    scene.add(boundingBox);
  }

  function drawGuides(origin, material) {
    let guides = [];
    vaseGuides.forEach((d, i) => {
      let guideGeom = new THREE.PlaneGeometry(2, 2);

      guides.push(new THREE.Mesh(guideGeom, material));
      guides[i].rotation.x = Math.PI / 2;
      guides[i].position.y = 2 - (2 / 100) * d.y;
      scene.add(guides[i]);
    });
  }

  console.log(guideStroke);
  let guideColor = new THREE.Color(
    guideStroke[0],
    guideStroke[1],
    guideStroke[2]
  );
  let guideLineMat = new THREE.LineBasicMaterial({ color: "blue" });
  let guideMat = new THREE.MeshBasicMaterial({
    color: guideColor,
    wireframe: true,
  });

  let vaseColor = new THREE.Color(vaseStroke[0], vaseStroke[1], vaseStroke[2]);
  let vaseMat = new THREE.MeshBasicMaterial({
    color: vaseColor,
    wireframe: true,
  });

  function activateControls() {
    // Link to Buttons
    if (gridButton.ariaPressed == "true") {
      drawGrid();
      createCenterLine();
    }

    if (guideButton.ariaPressed == "true") {
      drawGuides(vaseGuides, gridMat);
      createBoundingBox();
    }

    if (guideShapeButton.ariaPressed == "true") {
      // Lathe v3
      drawVase(vaseGuides, guideMat);
    }

    if (vaseButton.ariaPressed == "true") {
      drawVase(vase.slices, vaseMat);
    }
    // if (slicesButton.ariaPressed == "true") {
    //   drawGuides(vase.slices, vaseMat);
    // }
  }

  activateControls();

  // Functionality Testing
  let cube;
  function createTestCube() {
    //  Test CUbe
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const green = new THREE.MeshStandardMaterial({ color: 0x781ce5 });
    cube = new THREE.Mesh(geometry, green);
    scene.add(cube);
    // console.log("=== Cube – three-Vase.js [44] ===", cube);
  }
  // createTestCube();

  // Draw Vase

  function drawVase(origin, material) {
    const points = [];

    origin.forEach((d, i) => {
      let centerW = cvsW / 2;
      let x = (1 / 100) * d.x;
      let y = (2 / 100) * d.y;

      points.push(new THREE.Vector2(x, y));
    });

    console.log("CUTCOUNT:", cutCount)
    const segments = cutCount;
    const phiStart = 0;
    const phiLength = Math.PI * 2;

    let latheGeometry = new THREE.LatheGeometry(
      points,
      segments,
      phiStart,
      phiLength
    );
    latheGeometry.center();
    // console.log(latheGeometry); // check if latheGeometry is defined and has data

    // let latheMaterial = new THREE.MeshBasicMaterial({
    //   color: color,
    //   wireframe: true,
    // });

    let lathe = new THREE.Mesh(latheGeometry, material);
    lathe.position.y = 1;
    // console.log(lathe);
    // apply a test matrix to the lathe object

    // check if the matrix was applied successfully
    // console.log("Lathe Mesh: ", lathe);
    lathe.rotation.x = Math.PI;
    // lathe.rotation,y = 10
    // add the lathe object to the scene
    scene.add(lathe);
  }

  // Lighting
  const ambient = new THREE.AmbientLight(0x404040, 5);
  const point = new THREE.PointLight(0xe4ff00, 1, 10);
  point.position.set(3, 3, 2);
  scene.add(ambient);
  scene.add(point);

  camera.position.z = 2.5;
  camera.position.y = 1.2;

  function animate() {
    requestAnimationFrame(animate);

    camera.lookAt(0, 1, 0);

    // lathe.rotation.x += 0.01;

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}

// Call Init Funtion for first Execution
init();

// Reload
function reloadScene() {
  cutCount = document.querySelector("#cutCount").value
  canvas.removeChild(canvas.firstChild);
  canvas = document.querySelector("#cvs3");
  init();
  console.log("Reload Scene === at three-Vase.js [174]");
}
reloadButton.addEventListener("click", reloadScene);

let controls2 = document.getElementById("controls-2");
controls2.addEventListener("click", reloadScene);

let controls1 = document.querySelector(".controls-1");
controls1.addEventListener("click", reloadScene);

// let controls2 = document.querySelector("#controls-2");
// controls2.addEventListener("click", () => { controls1.click() });

// Export
function exportScene(scene) {
  const exporter = new OBJExporter();
  const data = exporter.parse(scene);
  saveString(data, "object.obj");
}

const link = document.createElement("a");
link.style.display = "none";
document.body.appendChild(link);

function save(blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function saveString(text, filename) {
  save(new Blob([text], { type: "text/plain" }), filename);
}

let exportButton = document.querySelector("#exportButton");
exportButton.addEventListener("click", () => {
  exportScene(scene);
});
