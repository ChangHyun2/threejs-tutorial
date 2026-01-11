import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const stats = new Stats();
document.body.appendChild(stats.dom);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(geometry, material);

const sceneA = new THREE.Scene();
sceneA.background = new THREE.Color(0x000000);
sceneA.add(cube);

const sceneB = new THREE.Scene();
sceneB.background = new THREE.TextureLoader().load(
  "https://sbcode.net/img/grid.png"
);

const sceneC = new THREE.Scene();
sceneC.background = new THREE.CubeTextureLoader()
  .setPath("https://sbcode.net/img/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

let activeScene = sceneA;

const setScene = {
  sceneA: () => {
    activeScene.remove(cube);
    activeScene = sceneA;
    activeScene.add(cube);
  },
  sceneB: () => {
    activeScene.remove(cube);
    activeScene = sceneB;
    activeScene.add(cube);
  },
  sceneC: () => {
    activeScene.remove(cube);
    activeScene = sceneC;
    activeScene.add(cube);
  },
};

scene.add(cube);

const gui = new GUI();
gui.add(material, "wireframe");

const cameraFolder = gui.addFolder("camera");
cameraFolder.add(camera.position, "z", 0, 10).listen();
cameraFolder.add(camera.position, "y", 0, 10).listen();
cameraFolder.add(camera.position, "x", 0, 10).listen();

const cubeFolder = gui.addFolder("cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);

gui.add(setScene, "sceneA").name("Scene A");
gui.add(setScene, "sceneB").name("Scene B");
gui.add(setScene, "sceneC").name("Scene C");

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(activeScene, camera);
}

animate();
