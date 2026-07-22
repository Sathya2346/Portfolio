import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

const CanvasBackground = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particles Geometry
    const particlesCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const randomScales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 12; // spread particles
    }
    for (let i = 0; i < particlesCount; i++) {
      randomScales[i] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Color selection based on theme
    const pColor = theme === "dark" ? 0xE84D89 : 0xEDA5C3;

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.04,
      color: new THREE.Color(pColor),
      transparent: true,
      opacity: theme === "dark" ? 0.45 : 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Create Points
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate particle cloud slowly
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = elapsedTime * 0.015;

      // Mouse interactive drift
      particleSystem.position.x += (mouseX * 0.5 - particleSystem.position.x) * 0.05;
      particleSystem.position.y += (mouseY * 0.5 - particleSystem.position.y) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden"
    />
  );
};

export default CanvasBackground;
