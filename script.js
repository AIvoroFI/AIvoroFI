const canvas = document.getElementById('bg-canvas'); const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); camera.position.z = 5;

const geometry = new THREE.BufferGeometry(); const count = 1000; const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) { positions[i] = (Math.random() - 0.5) * 10; }

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05 }); const points = new THREE.Points(geometry, material); scene.add(points);

function animate() { requestAnimationFrame(animate); points.rotation.y += 0.0015; renderer.render(scene, camera); } animate();

gsap.registerPlugin(ScrollTrigger);

gsap.from(".slogan", { opacity: 0, y: 50, duration: 1.2, ease: "power3.out" });

gsap.utils.toArray("section").forEach((sec, i) => { gsap.from(sec, { scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none none" }, opacity: 0, y: 80, duration: 1, delay: i * 0.1 }); });

document.getElementById("assistant").addEventListener("click", () => { alert("Hello! I'm your AI assistant."); });

document.getElementById("mint").addEventListener("click", () => { window.location.href = "nft.html"; });

const cardsContainer = document.querySelector(".cards"); let isDown = false; let startX; let scrollLeft;

cardsContainer.addEventListener("mousedown", (e) => { isDown = true; cardsContainer.classList.add("dragging"); startX = e.pageX - cardsContainer.offsetLeft; scrollLeft = cardsContainer.scrollLeft; });

cardsContainer.addEventListener("mouseleave", () => { isDown = false; cardsContainer.classList.remove("dragging"); });

cardsContainer.addEventListener("mouseup", () => { isDown = false; cardsContainer.classList.remove("dragging"); });

cardsContainer.addEventListener("mousemove", (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - cardsContainer.offsetLeft; const walk = (x - startX) * 2; cardsContainer.scrollLeft = scrollLeft - walk; });

