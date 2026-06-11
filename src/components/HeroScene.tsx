import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Animated constellation globe rendered behind the hero.
 * Brand-colored particles on a sphere, linked by faint lines,
 * with a sparse ambient starfield and mouse parallax.
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // WebGL not available
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // --- Constellation sphere -------------------------------------------
    const COUNT = isMobile ? 320 : 620;
    const RADIUS = 2.45;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const teal = new THREE.Color("#33cc99");
    const amber = new THREE.Color("#faa61a");
    const white = new THREE.Color("#d9e6f2");

    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      positions[i * 3] = Math.cos(theta) * r * RADIUS;
      positions[i * 3 + 1] = y * RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;

      const roll = Math.random();
      const c = roll < 0.72 ? teal : roll < 0.86 ? amber : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pointsMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);

    // Connect close neighbors with faint lines
    const linePositions: number[] = [];
    const MAX_DIST = isMobile ? 0.85 : 0.72;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < MAX_DIST) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x33cc99,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    const globe = new THREE.Group();
    globe.add(points);
    globe.add(lines);
    globe.rotation.z = 0.22;
    // Push the globe toward the right edge on desktop, center on mobile
    globe.position.x = isMobile ? 0 : 1.9;
    globe.position.y = isMobile ? 0.8 : 0;
    scene.add(globe);

    // --- Ambient starfield ----------------------------------------------
    const STAR_COUNT = isMobile ? 90 : 200;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 16;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x9fb3c8,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Interaction & loop ----------------------------------------------
    const target = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    const renderFrame = () => {
      const t = clock.getElapsedTime();
      globe.rotation.y = t * 0.08;
      stars.rotation.y = -t * 0.012;
      // Ease toward pointer for parallax
      globe.rotation.x += (target.y * 0.18 - globe.rotation.x) * 0.04;
      camera.position.x += (target.x * 0.35 - camera.position.x) * 0.04;
      camera.lookAt(globe.position.x * 0.6, 0, 0);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderFrame);
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera); // static frame only
    } else {
      frameId = requestAnimationFrame(renderFrame);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      pointsGeo.dispose();
      pointsMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer!.dispose();
      mount.removeChild(renderer!.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10"
    />
  );
}
