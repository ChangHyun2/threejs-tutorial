import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const $canvas = document.getElementById("canvas") as HTMLCanvasElement;

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 200;

const camera = new THREE.PerspectiveCamera(
  75,
  CANVAS_WIDTH / CANVAS_HEIGHT,
  0.1,
  1000
);
camera.position.z = 1.5;
const renderer = new THREE.WebGLRenderer({ canvas: $canvas, antialias: true });
renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
// document.body.appendChild(renderer.domElement);

// window.addEventListener("resize", () => {
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
// });

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
