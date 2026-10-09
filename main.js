import * as THREE from 'three';

/* ==========================================================================
   1. SCRIPT DE BASE DE DONNÉES INDEXEDDB (DevDatabase)
   ========================================================================== */
class DevDatabase {
  constructor() {
    this.dbName = 'LowPolyDevDB';
    this.dbVersion = 1;
    this.storeName = 'projects';
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('Erreur IndexedDB:', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async getAllProjects() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async saveProject(project) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.put(project);
      request.onsuccess = () => resolve(project);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteProject(id) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async clearAll() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.clear();
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async getStorageEstimate() {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      return Math.round((estimate.usage || 0) / 1024); // KB
    }
    return 0;
  }
}

// Données démo par défaut
const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Simulateur Physique Low-Poly 3D',
    category: '3d',
    tags: ['Three.js', 'WebGL', 'Cannon.js', 'GLSL'],
    description: 'Une scène interactive en 3D représentant un univers stylisé low-poly avec gestion des ombres douces et détection de collisions physiques en temps réel.',
    demoUrl: 'https://example.com/demo-3d',
    githubUrl: 'https://github.com/example/lowpoly-physics',
    image: generatePlaceholderSVG('Moteur 3D Low-Poly', '#5379ff', '#78f1c1'),
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'proj-2',
    title: 'Dashboard de Monitoring IA & Data',
    category: 'ai',
    tags: ['Python', 'TensorFlow', 'TypeScript', 'ChartJS'],
    description: 'Plateforme de visualisation de métriques d\'apprentissage profond et d\'analyse prédictive avec mises à jour en direct par WebSockets.',
    demoUrl: 'https://example.com/demo-ai',
    githubUrl: 'https://github.com/example/ai-dashboard',
    image: generatePlaceholderSVG('IA & Monitoring Data', '#9d5cff', '#5379ff'),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'proj-3',
    title: 'Application Mobile de Gestion de Tâches',
    category: 'mobile',
    tags: ['React Native', 'SQLite', 'Redux', 'Tailwind'],
    description: 'Application mobile fluide et moderne permettant la synchronisation hors-ligne de vos projets et tâches quotidiennes.',
    demoUrl: '',
    githubUrl: 'https://github.com/example/mobile-task-app',
    image: generatePlaceholderSVG('App Mobile Cross-Platform', '#78f1c1', '#3b82f6'),
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  }
];

function generatePlaceholderSVG(title, color1, color2) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="#121620"/>
    <path d="M 0,250 L 150,150 L 300,280 L 450,120 L 600,260 L 600,400 L 0,400 Z" fill="url(#g)" opacity="0.35"/>
    <polygon points="200,80 350,160 200,240 50,160" fill="url(#g)" opacity="0.7"/>
    <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="22" font-weight="bold">${title}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}


/* ==========================================================================
   2. SCÈNE 3D THREE.JS : DÉVELOPPEUR LOW-POLY, RIG OS & ANIMATIONS
   ========================================================================== */
let scene, camera, renderer, clock;
let neckJoint, headJoint, torso, group;
let typingHands = [];
let screenCanvas, screenCtx, screenTexture;
let steamParticles = [];

// Contrôle de regard souris avec dampening
const pointer = new THREE.Vector2(0, 0);
const aim = new THREE.Vector2(0, 0);

// Synthétiseur audio de frappe clavier
let audioCtx = null;
let soundEnabled = false;

function playKeyClickSound() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    const freq = 600 + Math.random() * 400;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.03);
    
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (e) {
    // ignorer si l'audio n'est pas autorisé sans geste utilisateur
  }
}

function init3DScene() {
  const canvas = document.querySelector('#scene');
  if (!canvas) return;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#07080c');
  scene.fog = new THREE.FogExp2('#07080c', 0.04);

  camera = new THREE.PerspectiveCamera(38, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  setCameraPreset('default');

  clock = new THREE.Clock();

  // Éclairage
  const ambient = new THREE.AmbientLight('#1d2436', 1.2);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight('#b2c7ff', '#0e131f', 2.0);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight('#fff2db', 4.5);
  keyLight.position.set(5, 8, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.bias = -0.0001;
  scene.add(keyLight);

  const rimLight = new THREE.PointLight('#5379ff', 24, 15);
  rimLight.position.set(-4, 4.5, -3);
  scene.add(rimLight);

  const screenLight = new THREE.PointLight('#78f1c1', 6, 4);
  screenLight.position.set(0, 2.7, 0.2);
  scene.add(screenLight);

  // Éléments 3D du personnage et décor
  group = new THREE.Group();
  scene.add(group);

  // Matériaux Low-Poly
  const mat = (color, roughness = 0.8) => new THREE.MeshStandardMaterial({
    color,
    roughness,
    flatShading: true
  });

  const hoodieMat = mat('#1c202c');
  const hoodieDarkMat = mat('#12151e');
  const skinMat = mat('#dca285');
  const hairMat = mat('#11131a');
  const glassesMat = mat('#090b10', 0.2);
  const deskMat = mat('#2a1e17');
  const metalMat = mat('#4b5366');
  const darkMetalMat = mat('#1e222d');

  // Helper pour cubes low-poly
  function cube(size, material, position, parent = group) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.position.set(...position);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  // Helper pour sphères icosaèdre low-poly
  function sphere(radius, material, position, parent = group, detail = 1) {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, detail), material);
    mesh.position.set(...position);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  // Helper pour membres cylindriques low-poly
  function limb(a, b, radius, material, parent = group) {
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(b, a);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.9, dir.length(), 6), material);
    mesh.position.copy(mid);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  }

  // --- SOL & DÉCOR ---
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), mat('#0d1017'));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Table / Bureau élégant
  cube([7.2, 0.26, 3.4], deskMat, [0, 2.25, 0.1]);
  for (const [x, z] of [[-3.1, -1.2], [3.1, -1.2], [-3.1, 1.2], [3.1, 1.2]]) {
    cube([0.24, 2.4, 0.24], darkMetalMat, [x, 1.05, z]);
  }

  // Chaise ergonomique low-poly
  const chair = new THREE.Group();
  chair.position.set(0, 0, 1.8);
  group.add(chair);
  cube([1.2, 0.18, 1.2], hoodieDarkMat, [0, 1.65, 0], chair); // assise
  cube([1.1, 1.3, 0.15], hoodieDarkMat, [0, 2.35, 0.55], chair); // dossier
  cube([0.16, 1.6, 0.16], metalMat, [0, 0.8, 0], chair); // pied central
  // Pieds en étoile
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    cube([0.8, 0.08, 0.12], darkMetalMat, [Math.cos(angle) * 0.4, 0.08, Math.sin(angle) * 0.4], chair).rotation.y = -angle;
  }

  // --- ORDINATEUR PORTABLE ET ÉCRAN DYNAMIQUE ---
  const laptop = new THREE.Group();
  laptop.position.set(0, 2.40, -0.15);
  group.add(laptop);

  cube([2.3, 0.1, 1.4], metalMat, [0, 0.05, 0], laptop); // Base du PC

  // Écran du laptop
  const screenFrame = cube([2.26, 1.35, 0.08], darkMetalMat, [0, 0.72, -0.62], laptop);
  screenFrame.rotation.x = -0.12;

  // Canvas dynamique pour le code défilant
  screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 320;
  screenCtx = screenCanvas.getContext('2d');
  screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;

  const displayMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.1, 1.2),
    new THREE.MeshBasicMaterial({ map: screenTexture })
  );
  displayMesh.position.set(0, 0.73, -0.57);
  displayMesh.rotation.x = -0.12;
  laptop.add(displayMesh);

  // Touches de clavier low-poly
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 10; c++) {
      cube([0.16, 0.03, 0.14], darkMetalMat, [-0.85 + c * 0.19, 0.11, -0.4 + r * 0.18], laptop);
    }
  }
  // Trackpad
  cube([0.6, 0.015, 0.4], metalMat, [0, 0.11, 0.35], laptop);

  // --- ACCESSORIES SUR LE BUREAU ---
  // Tasse de café fumante
  const mugGroup = new THREE.Group();
  mugGroup.position.set(2.2, 2.40, 0.2);
  group.add(mugGroup);
  cube([0.35, 0.45, 0.35], mat('#f0ecd9'), [0, 0.22, 0], mugGroup);
  const coffee = cube([0.28, 0.02, 0.28], mat('#3b2219'), [0, 0.42, 0], mugGroup);

  // Particules de vapeur de café
  for (let i = 0; i < 6; i++) {
    const steam = sphere(0.04, mat('#ffffff', 1), [ (Math.random()-0.5)*0.1, 0.5 + i * 0.1, (Math.random()-0.5)*0.1 ], mugGroup, 0);
    steam.material.transparent = true;
    steam.material.opacity = 0.4;
    steamParticles.push({ mesh: steam, offset: i * 0.5 });
  }

  // Smartphone
  cube([0.32, 0.03, 0.65], darkMetalMat, [-2.2, 2.40, 0.4], group).rotation.y = 0.2;

  // --- PERSONNAGE : INFORMATICIEN EN HOODIE SOMBRE ---
  torso = new THREE.Group();
  torso.position.set(0, 3.0, 0.85);
  group.add(torso);

  // Buste / Hoodie
  const chest = sphere(1.15, hoodieMat, [0, 0.55, 0], torso, 1);
  chest.scale.set(1.0, 1.15, 0.68);
  cube([1.48, 0.32, 0.72], hoodieMat, [0, -0.18, -0.02], torso);

  // Cordon du hoodie
  cube([0.04, 0.4, 0.04], mat('#e2e8f0'), [-0.15, 0.4, -0.42], torso);
  cube([0.04, 0.4, 0.04], mat('#e2e8f0'), [0.15, 0.4, -0.42], torso);

  // Jambes sous le bureau
  limb(new THREE.Vector3(-0.45, 2.9, 0.85), new THREE.Vector3(-0.55, 2.25, 1.7), 0.3, hoodieDarkMat);
  limb(new THREE.Vector3(0.45, 2.9, 0.85), new THREE.Vector3(0.55, 2.25, 1.7), 0.3, hoodieDarkMat);

  // --- HIERARCHIE RIG OS : neckJoint & headJoint ---
  neckJoint = new THREE.Group();
  neckJoint.position.set(0, 1.48, -0.05);
  torso.add(neckJoint);

  const neck = sphere(0.28, skinMat, [0, 0.1, 0], neckJoint, 1);
  neck.scale.y = 1.3;

  // Capuche posée sur le cou / épaules
  const hoodMesh = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.14, 6, 12, Math.PI * 1.1), hoodieDarkMat);
  hoodMesh.rotation.x = Math.PI / 2;
  hoodMesh.position.set(0, 0.22, 0.34);
  neckJoint.add(hoodMesh);

  headJoint = new THREE.Group();
  headJoint.position.set(0, 0.28, 0);
  neckJoint.add(headJoint);

  // Tête Low-Poly
  const head = sphere(0.69, skinMat, [0, 0.46, 0], headJoint, 1);
  head.scale.set(0.92, 1.08, 0.9);

  // Cheveux low-poly stylisés
  const hair = sphere(0.72, hairMat, [0, 0.7, 0.1], headJoint, 1);
  hair.scale.set(0.96, 0.48, 0.92);

  // Lunettes informaticien
  const glassesGroup = new THREE.Group();
  glassesGroup.position.set(0, 0.48, -0.58);
  headJoint.add(glassesGroup);
  cube([0.36, 0.22, 0.04], glassesMat, [-0.22, 0, 0], glassesGroup);
  cube([0.36, 0.22, 0.04], glassesMat, [0.22, 0, 0], glassesGroup);
  cube([0.12, 0.04, 0.04], glassesMat, [0, 0.06, 0], glassesGroup);

  // Yeux sous les lunettes
  sphere(0.06, hairMat, [-0.22, 0.48, -0.56], headJoint, 0);
  sphere(0.06, hairMat, [0.22, 0.48, -0.56], headJoint, 0);

  // Bouche discrète
  cube([0.18, 0.035, 0.04], mat('#a35850'), [0, 0.19, -0.6], headJoint);

  // --- BRAS ET MAINS AVEC ANIMATION DE FRAPPE ---
  typingHands = [];

  function buildArm(side) {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.88, 0.9, -0.02);
    torso.add(shoulder);

    const elbow = new THREE.Group();
    elbow.position.set(side * 0.44, -0.55, -0.28);
    shoulder.add(elbow);

    const wrist = new THREE.Group();
    wrist.position.set(side * 0.26, -0.52, -0.74);
    elbow.add(wrist);

    cube([0.42, 0.72, 0.38], hoodieMat, [0, -0.28, -0.12], shoulder).rotation.z = side * 0.5;
    cube([0.34, 0.64, 0.32], hoodieMat, [0, -0.28, -0.36], elbow).rotation.z = -side * 0.42;

    const hand = sphere(0.22, skinMat, [0, -0.12, -0.16], wrist, 1);
    hand.scale.set(1.25, 0.58, 1.45);

    typingHands.push({
      shoulder,
      elbow,
      wrist,
      hand,
      side,
      phase: side * 0.85
    });
  }

  buildArm(-1); // Bras gauche
  buildArm(1);  // Bras droit

  // Écouteur de mouvement de souris pour l'orientation de la tête avec lissage
  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  // Démarre la boucle de rendu 3D
  requestAnimationFrame(animate3D);
}

function setCameraPreset(mode) {
  if (!camera) return;
  if (mode === 'default') {
    camera.position.set(7.5, 4.8, 8.8);
    camera.lookAt(0, 2.4, 0);
  } else if (mode === 'head') {
    camera.position.set(0, 4.2, 3.8);
    camera.lookAt(0, 4.2, 0.5);
  } else if (mode === 'desk') {
    camera.position.set(3.8, 5.2, 4.2);
    camera.lookAt(0, 2.5, 0);
  }
}

function drawLaptopScreen(time) {
  if (!screenCtx) return;
  screenCtx.fillStyle = '#0b0d13';
  screenCtx.fillRect(0, 0, 512, 320);

  // Entête IDE
  screenCtx.fillStyle = '#161b26';
  screenCtx.fillRect(0, 0, 512, 32);
  screenCtx.fillStyle = '#78f1c1';
  screenCtx.font = 'bold 13px "JetBrains Mono", monospace';
  screenCtx.fillText('main.js — Three.js LowPoly Dev', 16, 21);

  // Dynamic code scrolling
  const lines = [
    'import * as THREE from "three";',
    'const scene = new THREE.Scene();',
    'const headJoint = new THREE.Group();',
    'const neckJoint = new THREE.Group();',
    '// Rigging Head & Neck joints for mouse tracking',
    'function updateAim(pointer, delta) {',
    `  aim.lerp(pointer, 1 - Math.exp(-8 * delta));`,
    `  neckJoint.rotation.y = aim.x * 0.32;`,
    `  headJoint.rotation.y = aim.x * 0.56;`,
    '}',
    '// Typing loop animation frame',
    `  typingHands.forEach(hand => hand.tap());`,
    'renderer.render(scene, camera);'
  ];

  screenCtx.font = '12px "JetBrains Mono", monospace';
  const offset = Math.floor(time * 3) % lines.length;

  for (let i = 0; i < 10; i++) {
    const lineIndex = (i + offset) % lines.length;
    screenCtx.fillStyle = lineIndex % 2 === 0 ? '#60a5fa' : '#a78bfa';
    screenCtx.fillText(lines[lineIndex], 20, 60 + i * 24);
  }

  screenTexture.needsUpdate = true;
}

let lastClickTime = 0;

function animate3D() {
  requestAnimationFrame(animate3D);

  const delta = clock.getDelta();
  const t = clock.getElapsedTime();

  // 1. DAMPENING LISSAGE POUR REGARD SOURIS SUR HEAD / NECK JOINTS
  // Formule d'amortissement exponentiel indépendant du framerate
  const dampFactor = 1 - Math.exp(-7.5 * delta);
  aim.x += (pointer.x - aim.x) * dampFactor;
  aim.y += (pointer.y - aim.y) * dampFactor;

  if (neckJoint && headJoint) {
    neckJoint.rotation.y = THREE.MathUtils.lerp(neckJoint.rotation.y, aim.x * 0.32, 0.12);
    neckJoint.rotation.x = THREE.MathUtils.lerp(neckJoint.rotation.x, -aim.y * 0.14, 0.12);

    headJoint.rotation.y = THREE.MathUtils.lerp(headJoint.rotation.y, aim.x * 0.56, 0.10);
    headJoint.rotation.x = THREE.MathUtils.lerp(headJoint.rotation.x, -aim.y * 0.32, 0.10);
  }

  // 2. ANIMATION EN BOUCLE (IDLE) : MAINS TAPANT SUR CLAVIER
  typingHands.forEach(({ wrist, hand, elbow, side, phase }, idx) => {
    const tap = Math.sin(t * 11 + phase) * 0.08 + Math.sin(t * 17 + phase * 1.3) * 0.03;
    wrist.rotation.x = -0.72 + tap * 0.45;
    wrist.rotation.z = (idx ? -0.06 : 0.06) + Math.sin(t * 4.5 + phase) * 0.035;
    hand.position.y = -0.12 + tap * 0.18;
    elbow.rotation.x = -0.3 + tap * 0.15;
  });

  // Déclencher le son de frappe périodiquement
  if (t - lastClickTime > 0.15) {
    playKeyClickSound();
    lastClickTime = t;
  }

  // Légère respiration du buste
  if (torso) {
    torso.rotation.y = Math.sin(t * 0.8) * 0.02;
    torso.position.y = 3.0 + Math.sin(t * 1.5) * 0.015;
  }

  // Animation de la vapeur du café
  steamParticles.forEach(({ mesh, offset }) => {
    mesh.position.y = 0.45 + ((t * 0.4 + offset) % 0.6);
    mesh.scale.setScalar(0.8 + Math.sin(t * 2 + offset) * 0.2);
  });

  // Rendu de l'écran laptop dynamique
  drawLaptopScreen(t);

  // Mise à jour FPS dans HUD
  const fps = Math.round(1 / Math.max(delta, 0.001));
  const fpsEl = document.getElementById('fps-counter');
  if (fpsEl && Math.random() < 0.05) fpsEl.textContent = Math.min(fps, 60);

  renderer.render(scene, camera);
}

function onWindowResize() {
  const canvas = document.querySelector('#scene');
  if (!canvas || !renderer || !camera) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}


/* ==========================================================================
   3. GESTIONNAIRE DE L'INTERFACE UTILISATEUR & ESPACE PROJETS UPLOAD
   ========================================================================== */
let dbManager = new DevDatabase();
let currentProjects = [];
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'newest';
let uploadedImageData = '';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialiser les icônes Lucide
  if (window.lucide) lucide.createIcons();

  // Mettre à jour l'année dans le footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialiser la scène 3D
  init3DScene();

  // Initialiser la base de données
  try {
    await dbManager.init();
    currentProjects = await dbManager.getAllProjects();

    // Si la base est vide, pré-remplir avec les projets démo
    if (currentProjects.length === 0) {
      for (const p of DEFAULT_PROJECTS) {
        await dbManager.saveProject(p);
      }
      currentProjects = await dbManager.getAllProjects();
    }
  } catch (e) {
    console.warn('Utilisation fallback données mémoire pour la base:', e);
    currentProjects = [...DEFAULT_PROJECTS];
  }

  // Afficher les projets et les stats
  renderProjects();
  updateDBStats();

  // Setup des évènements UI
  setupUIEvents();
});

function setupUIEvents() {
  // Toggle du son de frappe
  const btnSound = document.getElementById('btn-sound-toggle');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      btnSound.classList.toggle('active', soundEnabled);
      btnSound.innerHTML = soundEnabled ? '<i data-lucide="volume-2"></i>' : '<i data-lucide="volume-x"></i>';
      if (window.lucide) lucide.createIcons();
      showToast(soundEnabled ? 'Son de frappe activé ⌨️' : 'Son désactivé', 'info');
    });
  }

  // Caméra Presets Buttons
  document.querySelectorAll('.cam-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setCameraPreset(btn.dataset.cam);
    });
  });

  // Recherche textuelle
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      clearBtn.style.display = currentSearch ? 'block' : 'none';
      renderProjects();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearch = '';
      clearBtn.style.display = 'none';
      renderProjects();
    });
  }

  // Filtres par Catégorie
  const categoryPills = document.querySelectorAll('#category-pills .pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.cat;
      renderProjects();
    });
  });

  // Tri des projets
  const sortSelect = document.getElementById('sort-by');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProjects();
    });
  }

  // Modals : Ouverture Upload
  const btnOpenUpload = document.getElementById('btn-open-upload');
  const btnAddBanner = document.getElementById('btn-add-project-banner');
  const btnEmptyAdd = document.getElementById('btn-empty-add');
  const modalUpload = document.getElementById('modal-upload');
  const btnCloseUpload = document.getElementById('btn-close-upload');
  const btnCancelUpload = document.getElementById('btn-cancel-upload');

  const openUploadModal = (projectToEdit = null) => {
    resetProjectForm();
    if (projectToEdit) {
      document.getElementById('modal-form-title').innerHTML = '<i data-lucide="edit"></i> Modifier le Projet';
      document.getElementById('form-project-id').value = projectToEdit.id;
      document.getElementById('proj-title').value = projectToEdit.title;
      document.getElementById('proj-category').value = projectToEdit.category;
      document.getElementById('proj-tags').value = (projectToEdit.tags || []).join(', ');
      document.getElementById('proj-desc').value = projectToEdit.description;
      document.getElementById('proj-demo').value = projectToEdit.demoUrl || '';
      document.getElementById('proj-github').value = projectToEdit.githubUrl || '';
      if (projectToEdit.image) {
        setFormImagePreview(projectToEdit.image);
      }
    } else {
      document.getElementById('modal-form-title').innerHTML = '<i data-lucide="upload-cloud"></i> Ajouter un Nouveau Projet';
    }
    if (window.lucide) lucide.createIcons();
    modalUpload.style.display = 'grid';
  };

  if (btnOpenUpload) btnOpenUpload.addEventListener('click', () => openUploadModal());
  if (btnAddBanner) btnAddBanner.addEventListener('click', () => openUploadModal());
  if (btnEmptyAdd) btnEmptyAdd.addEventListener('click', () => openUploadModal());
  if (btnCloseUpload) btnCloseUpload.addEventListener('click', () => modalUpload.style.display = 'none');
  if (btnCancelUpload) btnCancelUpload.addEventListener('click', () => modalUpload.style.display = 'none');

  // Modal Details Close
  const modalDetails = document.getElementById('modal-details');
  const btnCloseDetails = document.getElementById('btn-close-details');
  if (btnCloseDetails) btnCloseDetails.addEventListener('click', () => modalDetails.style.display = 'none');

  // Fermeture modals au clic à l'extérieur
  [modalUpload, modalDetails].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }
  });

  // Dropzone Image Upload
  const dropzone = document.getElementById('dropzone');
  const imageInput = document.getElementById('proj-image-input');
  const btnRemoveImage = document.getElementById('btn-remove-image');

  if (dropzone && imageInput) {
    dropzone.addEventListener('click', (e) => {
      if (!e.target.closest('#btn-remove-image')) {
        imageInput.click();
      }
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    });

    imageInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageFile(e.target.files[0]);
      }
    });
  }

  if (btnRemoveImage) {
    btnRemoveImage.addEventListener('click', (e) => {
      e.stopPropagation();
      uploadedImageData = '';
      document.getElementById('image-preview-wrapper').style.display = 'none';
      document.getElementById('dropzone-prompt').style.display = 'block';
    });
  }

  // Formulaire d'enregistrement de projet
  const projectForm = document.getElementById('project-form');
  if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('form-project-id').value || 'proj-' + Date.now();
      const title = document.getElementById('proj-title').value.trim();
      const category = document.getElementById('proj-category').value;
      const tagsRaw = document.getElementById('proj-tags').value;
      const description = document.getElementById('proj-desc').value.trim();
      const demoUrl = document.getElementById('proj-demo').value.trim();
      const githubUrl = document.getElementById('proj-github').value.trim();

      const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
      const image = uploadedImageData || generatePlaceholderSVG(title, '#5379ff', '#78f1c1');

      const project = {
        id,
        title,
        category,
        tags,
        description,
        demoUrl,
        githubUrl,
        image,
        createdAt: new Date().toISOString()
      };

      try {
        await dbManager.saveProject(project);
        currentProjects = await dbManager.getAllProjects();
        renderProjects();
        updateDBStats();
        modalUpload.style.display = 'none';
        showToast('Projet enregistré avec succès dans IndexedDB !', 'success');
      } catch (err) {
        showToast('Erreur lors de la sauvegarde du projet', 'error');
      }
    });
  }

  // Actions Base de données : Exporter / Importer JSON
  const btnExport = document.getElementById('btn-export-db');
  const btnImport = document.getElementById('btn-import-db');
  const inputImport = document.getElementById('input-import-file');
  const btnReset = document.getElementById('btn-reset-db');

  if (btnExport) {
    btnExport.addEventListener('click', async () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentProjects, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `backup_projects_db_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Export de la base de données réussi !', 'success');
    });
  }

  if (btnImport && inputImport) {
    btnImport.addEventListener('click', () => inputImport.click());
    inputImport.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            for (const p of imported) {
              await dbManager.saveProject(p);
            }
            currentProjects = await dbManager.getAllProjects();
            renderProjects();
            updateDBStats();
            showToast(`${imported.length} projets importés dans IndexedDB !`, 'success');
          }
        } catch (err) {
          showToast('Fichier JSON invalide', 'error');
        }
      };
      reader.readAsText(file);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', async () => {
      if (confirm('Voulez-vous réinitialiser la base de données avec les projets par défaut ?')) {
        await dbManager.clearAll();
        for (const p of DEFAULT_PROJECTS) {
          await dbManager.saveProject(p);
        }
        currentProjects = await dbManager.getAllProjects();
        renderProjects();
        updateDBStats();
        showToast('Base de données réinitialisée !', 'info');
      }
    });
  }
}

function handleImageFile(file) {
  if (!file.type.startsWith('image/')) {
    showToast('Veuillez sélectionner un fichier image valide', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImageData = e.target.result;
    setFormImagePreview(uploadedImageData);
  };
  reader.readAsDataURL(file);
}

function setFormImagePreview(src) {
  uploadedImageData = src;
  document.getElementById('image-preview').src = src;
  document.getElementById('image-preview-wrapper').style.display = 'block';
  document.getElementById('dropzone-prompt').style.display = 'none';
}

function resetProjectForm() {
  document.getElementById('project-form').reset();
  document.getElementById('form-project-id').value = '';
  uploadedImageData = '';
  document.getElementById('image-preview-wrapper').style.display = 'none';
  document.getElementById('dropzone-prompt').style.display = 'block';
}

/* ==========================================================================
   4. RENDU DYNAMIQUE DE LA GRILLE DE PROJETS ET DETAIL MODAL
   ========================================================================== */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const emptyState = document.getElementById('empty-state');
  const countBadge = document.getElementById('project-count-badge');
  if (!grid) return;

  // Filtrage
  let filtered = currentProjects.filter(p => {
    const matchesCat = currentCategory === 'all' || p.category === currentCategory;
    const matchesSearch = !currentSearch ||
      p.title.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(currentSearch)));
    return matchesCat && matchesSearch;
  });

  // Tri
  filtered.sort((a, b) => {
    if (currentSort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (currentSort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (currentSort === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  if (countBadge) countBadge.textContent = currentProjects.length;

  if (filtered.length === 0) {
    grid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';

  grid.innerHTML = filtered.map(p => {
    const catLabels = { '3d': '3D & WebGL', 'web': 'Web App', 'mobile': 'Mobile App', 'ai': 'IA & Data' };
    const dateFormatted = new Date(p.createdAt || Date.now()).toLocaleDateString('fr-FR');
    const tagsHTML = (p.tags || []).map(t => `<span class="tag-badge">${t}</span>`).join('');

    return `
      <div class="project-card" data-id="${p.id}">
        <div class="card-media">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <span class="card-category">${catLabels[p.category] || p.category}</span>
          <div class="card-actions-overlay">
            <button class="action-btn-sm btn-edit" title="Modifier" onclick="editProject('${p.id}')">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="action-btn-sm delete-btn" title="Supprimer" onclick="deleteProject('${p.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.description}</p>
          <div class="card-tags">${tagsHTML}</div>
          <div class="card-footer">
            <span>${dateFormatted}</span>
            <button class="btn btn-secondary btn-sm" onclick="openProjectDetails('${p.id}')">
              En savoir plus <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

window.openProjectDetails = (id) => {
  const p = currentProjects.find(item => item.id === id);
  if (!p) return;

  const modalDetails = document.getElementById('modal-details');
  document.getElementById('detail-title').textContent = p.title;
  document.getElementById('detail-image').src = p.image;
  document.getElementById('detail-category').textContent = p.category.toUpperCase();
  document.getElementById('detail-date').innerHTML = `<i data-lucide="calendar"></i> Créé le ${new Date(p.createdAt).toLocaleDateString('fr-FR')}`;
  document.getElementById('detail-description').textContent = p.description;

  const tagsContainer = document.getElementById('detail-tags');
  tagsContainer.innerHTML = (p.tags || []).map(t => `<span class="tag-badge">${t}</span>`).join('');

  const demoLink = document.getElementById('detail-demo-link');
  const githubLink = document.getElementById('detail-github-link');

  if (p.demoUrl) {
    demoLink.href = p.demoUrl;
    demoLink.style.display = 'inline-flex';
  } else {
    demoLink.style.display = 'none';
  }

  if (p.githubUrl) {
    githubLink.href = p.githubUrl;
    githubLink.style.display = 'inline-flex';
  } else {
    githubLink.style.display = 'none';
  }

  if (window.lucide) lucide.createIcons();
  modalDetails.style.display = 'grid';
};

window.editProject = (id) => {
  const p = currentProjects.find(item => item.id === id);
  if (!p) return;
  const modalUpload = document.getElementById('modal-upload');
  document.getElementById('modal-form-title').innerHTML = '<i data-lucide="edit"></i> Modifier le Projet';
  document.getElementById('form-project-id').value = p.id;
  document.getElementById('proj-title').value = p.title;
  document.getElementById('proj-category').value = p.category;
  document.getElementById('proj-tags').value = (p.tags || []).join(', ');
  document.getElementById('proj-desc').value = p.description;
  document.getElementById('proj-demo').value = p.demoUrl || '';
  document.getElementById('proj-github').value = p.githubUrl || '';
  if (p.image) {
    setFormImagePreview(p.image);
  }
  if (window.lucide) lucide.createIcons();
  modalUpload.style.display = 'grid';
};

window.deleteProject = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet de la base de données ?')) {
    await dbManager.deleteProject(id);
    currentProjects = await dbManager.getAllProjects();
    renderProjects();
    updateDBStats();
    showToast('Projet supprimé de IndexedDB', 'info');
  }
};

async function updateDBStats() {
  const countVal = document.getElementById('db-count-val');
  const sizeVal = document.getElementById('db-size-val');

  if (countVal) countVal.textContent = currentProjects.length;
  if (sizeVal) {
    const kb = await dbManager.getStorageEstimate();
    sizeVal.textContent = kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb} KB`;
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconName = type === 'success' ? 'check-circle' : (type === 'error' ? 'alert-circle' : 'info');
  toast.innerHTML = `<i data-lucide="${iconName}"></i> <span>${message}</span>`;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
