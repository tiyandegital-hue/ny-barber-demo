'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Procedural animated barber pole — code-generated, no external assets.
 * A striped cylinder (canvas texture) between two chrome caps, rotating slowly.
 * Pauses when off-screen; renders a static CSS fallback if WebGL fails or
 * the user prefers reduced motion.
 */
export default function BarberPole() {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) return;
    const mount = mountRef.current;
    if (!mount) return;
    let renderer;
    let raf = 0;
    let observer;
    let visible = true;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, 420);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121110);
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / 420, 0.1, 100);
    camera.position.set(0, 0.4, 7.0);

    // Striped texture drawn on a canvas: classic red / white / navy diagonal.
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f6f2ea';
    ctx.fillRect(0, 0, 512, 512);
    const bands = ['#c0392b', '#f6f2ea', '#1f3a5f', '#f6f2ea'];
    ctx.save();
    ctx.translate(256, 256);
    ctx.rotate(-0.5);
    for (let i = -8; i < 8; i += 1) {
      ctx.fillStyle = bands[((i % 4) + 4) % 4];
      ctx.fillRect(i * 64, -512, 32, 1024);
    }
    ctx.restore();
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = 2;
    texture.colorSpace = THREE.SRGBColorSpace;

    const pole = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.85, 2.6, 48),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35, metalness: 0.1 })
    );
    pole.add(body);
    const chrome = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.25, metalness: 0.9 });
    const capTop = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), chrome);
    capTop.position.y = 1.3;
    const capBottom = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), chrome);
    capBottom.position.y = -1.3;
    const neckTop = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.35, 24), chrome);
    neckTop.position.y = 2.1;
    const neckBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.35, 24), chrome);
    neckBottom.position.y = -2.1;
    pole.add(capTop, capBottom, neckTop, neckBottom);
    pole.rotation.z = 0.08;
    scene.add(pole);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb08d3e, 1.1);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const onResize = () => {
      const w = mount.clientWidth;
      renderer.setSize(w, 420);
      camera.aspect = w / 420;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(mount);

    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      texture.offset.x = (t * 0.05) % 1;
      pole.rotation.y = t * 0.55;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (observer) observer.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  if (failed || reduced) {
    return (
      <div className="pole-fallback" role="img" aria-label="Classic striped barber pole">
        <span>BARBER POLE</span>
      </div>
    );
  }
  return <div ref={mountRef} aria-label="Animated 3D barber pole" role="img" />;
}
