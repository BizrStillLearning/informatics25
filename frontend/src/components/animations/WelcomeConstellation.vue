<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'
import logo from "../../assets/img/logo2.png"

const canvasRef = ref(null)
const typedText = ref('')
const isTypingComplete = ref(false)
const fullText = "Welcome to Informatics25 Platform"
let charIndex = 0

const typeEffect = () => {
  if (charIndex < fullText.length) {
    typedText.value += fullText[charIndex]
    charIndex++
    setTimeout(typeEffect, 50)
  } else {
    isTypingComplete.value = true
  }
}

let scene, camera, renderer, animationId
const noise3D = createNoise3D()
const mouse = new THREE.Vector2(0, 0)
const lerpMouse = new THREE.Vector2(0, 0)

const initThree = () => {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 120

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const count = 50000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  const c1 = new THREE.Color('#2b7fff')
  const c2 = new THREE.Color('#9810fa')

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = Math.sqrt(Math.random())

    const x = Math.cos(angle) * 260 * radius
    const y = Math.sin(angle) * 140 * radius
    const z = (Math.random() - 0.5) * 300

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    const mix = (x + 260) / 520
    const color = c1.clone().lerp(c2, mix)

    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: `
      attribute vec3 color;
      varying vec3 vColor;
      uniform float uTime;
      uniform float uPixelRatio;

      void main() {
        vColor = color;
        vec3 pos = position;

        float angle = atan(pos.y, pos.x);
        float radius = length(pos.xy);

        // 🔥 swirl
        angle += 0.25 * sin(uTime + radius * 0.02);

        pos.x = cos(angle) * radius;
        pos.y = sin(angle) * radius;

        pos.y += mod(uTime * 10.0 + radius * 0.2, 40.0);

        float centerDist = length(pos.xy);
        if(centerDist < 80.0){
          pos.xy *= 1.05;
        }

        float fade = smoothstep(50.0, 200.0, centerDist);
        vColor *= fade;

        vColor += 0.15 * sin(uTime + pos.x * 0.01);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

        float size = mix(1.5, 5.0, (pos.z + 150.0) / 300.0);

        gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;

      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));

        if (dist > 0.5) discard;

        float strength = smoothstep(0.5, 0.0, dist);
        strength = pow(strength, 3.0);

        gl_FragColor = vec4(vColor, strength);
      }
    `
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  let time = 0

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    time += 0.01

    material.uniforms.uTime.value = time

    lerpMouse.lerp(mouse, 0.05)

    const posAttr = geometry.attributes.position

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      let x = posAttr.array[i3]
      let y = posAttr.array[i3 + 1]

      const dx = lerpMouse.x - x
      const dy = lerpMouse.y - y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1

      if (dist < 150) {
        const force = (150 - dist) / 150

        posAttr.array[i3] += (dx / dist) * force * 1.2
        posAttr.array[i3 + 1] += (dy / dist) * force * 1.2
      }
    }

    posAttr.needsUpdate = true
    renderer.render(scene, camera)
  }

  animate()
}

const onMouseMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 300
  mouse.y = -(e.clientY / window.innerHeight - 0.5) * 200
}

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  typeEffect()
  initThree()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', handleResize)
  renderer.dispose()
})
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center bg-white dark:bg-[#030712] overflow-hidden transition-colors duration-700">

    <canvas ref="canvasRef" class="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black_80%,transparent_100%)]"></canvas>

    <!-- overlay -->
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,white_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_20%,#030712_100%)]"></div>

    <!-- vignette -->
    <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20 dark:to-black/60"></div>

    <div class="relative z-10 text-center px-6 max-w-5xl mx-auto select-none pointer-events-none">
      <div v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, transition: { duration: 1500 } }">

        <div class="flex items-center justify-center gap-3 mb-10">
          <img :src="logo" class="h-8 md:h-10" />
          <div class="h-6 w-[1px] bg-slate-200 dark:bg-white/10 mx-2"></div>
          <p class="text-xs tracking-[0.6em] font-black text-blue-500/60 dark:text-purple-500/60 uppercase">
            Informatics 25 Platform
          </p>
        </div>

        <h1 class="text-5xl md:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-12 bg-gradient-to-b from-black to-slate-400 dark:from-white dark:to-slate-500 bg-clip-text text-transparent">
          {{ typedText }}
        </h1>

        <div class="mt-16 flex flex-col items-center gap-2 opacity-0 animate-fade-in [animation-delay:2s] [animation-fill-mode:forwards]">
          <p class="text-xs tracking-[0.4em] text-slate-400 uppercase">
            Version 2.0
          </p>
          <p class="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Universitas Muhammadiyah Surabaya • Fakultas Teknik
          </p>
        </div>

      </div>
    </div>

    <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent"></div>
  </section>
</template>

<style scoped>
h1 {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}
canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
.animate-fade-in {
  animation: fadeIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>