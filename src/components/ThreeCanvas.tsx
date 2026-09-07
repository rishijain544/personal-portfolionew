import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 1. AI/ML NEURAL NETWORK GRAPH ---
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // Create Neural Network Nodes (3D Constellation - drastically toned down)
    const nodeCount = 28;
    const nodePositions: THREE.Vector3[] = [];
    const maxDistance = 2.4;

    // Generate random 3D positions in a spherical neural cluster
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    // Node Meshes - subtle low opacity
    const nodeGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6a00, // Orange accent
      transparent: true,
      opacity: 0.25,
    });

    const nodeInstancedMesh = new THREE.InstancedMesh(
      nodeGeometry,
      nodeMaterial,
      nodeCount
    );

    const dummy = new THREE.Object3D();
    nodePositions.forEach((pos, idx) => {
      dummy.position.copy(pos);
      const scale = 0.8 + Math.random() * 0.6;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      nodeInstancedMesh.setMatrixAt(idx, dummy.matrix);
    });
    nodeInstancedMesh.instanceMatrix.needsUpdate = true;
    nodeGroup.add(nodeInstancedMesh);

    // Synapse Lines
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const connectionPairs: [THREE.Vector3, THREE.Vector3][] = [];

    const orangeColor = new THREE.Color(0xff6a00);
    const darkOrangeColor = new THREE.Color(0xcc5200);
    const neutralGrayColor = new THREE.Color(0x444444);

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDistance) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );

          const mixFactor = (nodePositions[i].z + 3) / 6;
          const col = orangeColor.clone().lerp(mixFactor > 0.5 ? neutralGrayColor : darkOrangeColor, mixFactor);

          lineColors.push(col.r, col.g, col.b, col.r, col.g, col.b);
          connectionPairs.push([nodePositions[i], nodePositions[j]]);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.08,
      linewidth: 1,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodeGroup.add(linesMesh);

    // --- 2. SIGNAL PULSES ---
    const pulseCount = 8;
    interface Pulse {
      start: THREE.Vector3;
      end: THREE.Vector3;
      progress: number;
      speed: number;
      mesh: THREE.Mesh;
    }

    const pulseGeometry = new THREE.SphereGeometry(0.025, 6, 6);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6a00,
      transparent: true,
      opacity: 0.15,
    });

    const pulses: Pulse[] = [];
    for (let i = 0; i < pulseCount; i++) {
      const pair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
      if (pair) {
        const pMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
        nodeGroup.add(pMesh);
        pulses.push({
          start: pair[0],
          end: pair[1],
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.008,
          mesh: pMesh,
        });
      }
    }

    // --- 3. LATENT SPACE / LOSS LANDSCAPE GRID ---
    const planeGeo = new THREE.PlaneGeometry(28, 28, 36, 36);
    const posAttr = planeGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = Math.sin(x * 0.35) * Math.cos(y * 0.35) * 0.7;
      posAttr.setZ(i, z);
    }
    planeGeo.computeVertexNormals();

    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true,
      transparent: true,
      opacity: 0.03,
    });

    const landscapeMesh = new THREE.Mesh(planeGeo, planeMat);
    landscapeMesh.rotation.x = -Math.PI / 2.5;
    landscapeMesh.position.y = -3.8;
    scene.add(landscapeMesh);

    // --- 4. AMBIENT DATA PARTICLES ---
    const particlesCount = 80;
    const particlePositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 18;
      particlePositions[i + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xff6a00,
      transparent: true,
      opacity: 0.08,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- 5. INTERACTION & SCROLL DYNAMICS ---
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;
    let lastScrollY = 0;
    let scrollVelocity = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Damped smooth scroll value & velocity calculation
      scrollVelocity = (targetScrollY - scrollY);
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Normalize scroll between 0 and 1
      const totalScrollHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = scrollY / totalScrollHeight;

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Scroll-driven 3D Transformations
      // 1. Camera height shift & depth zoom
      camera.position.y = -scrollProgress * 2.5;
      camera.position.z = 7.5 + Math.sin(scrollProgress * Math.PI) * 1.5;

      // 2. Neural Network Cluster rotation & warping
      nodeGroup.rotation.y = elapsedTime * 0.1 + targetX * 0.6 + scrollProgress * Math.PI * 2;
      nodeGroup.rotation.x = elapsedTime * 0.05 + targetY * 0.4 + Math.sin(scrollProgress * Math.PI * 1.5) * 0.4;
      nodeGroup.rotation.z = scrollVelocity * 0.001;

      // 3. Dynamic Neural Pulses speed up with scroll velocity
      const speedBoost = 1 + Math.abs(scrollVelocity) * 0.03;
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed * speedBoost;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          const randomPair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
          if (randomPair) {
            pulse.start = randomPair[0];
            pulse.end = randomPair[1];
          }
        }
        pulse.mesh.position.lerpVectors(pulse.start, pulse.end, pulse.progress);
      });

      // 4. Loss Landscape Terrain reacts to scroll depth
      landscapeMesh.position.y = -3.8 + scrollProgress * 1.2;
      landscapeMesh.rotation.z = elapsedTime * 0.03 + scrollProgress * 0.8;
      particleSystem.rotation.y = elapsedTime * 0.02 + scrollProgress * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Memory Cleanup
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
