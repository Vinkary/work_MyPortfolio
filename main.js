
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const floatingTexture = new THREE.TextureLoader().load('floating.jpg');
scene.background = floatingTexture;
function setBackgroundVideo(scene, videoUrl) {
  // Create a video element
  const video = document.createElement('video');
  video.src = videoUrl;  // URL of the video you want to use
  video.load();  // Start loading the video
  video.play();  // Play the video immediately
  video.loop = true;  // Set the video to loop

  // Create a texture from the video
  const videoTexture = new THREE.VideoTexture(video);

  // Set the video texture as the scene background
  scene.background = videoTexture;
}
setBackgroundVideo(scene, 'wavesanimation0001-0250.mp4');
// Usage: Call this function to set the video as background

// Avatar

const cgTexture = new THREE.TextureLoader().load('cg.jpg');

const cg = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: cgTexture }));

scene.add(cg);

// face

const faceTexture = new THREE.TextureLoader().load('face.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const face = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: faceTexture,
    normalMap: normalTexture,
  })
);

scene.add(face);

face.position.z = 30;
face.position.setX(-10);

cg.position.z = -5;
cg.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  face.rotation.x += 0.05;
  face.rotation.y += 0.075;
  face.rotation.z += 0.05;

  cg.rotation.y += 0.01;
  cg.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  face.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
