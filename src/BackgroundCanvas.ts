import {
  Camera,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { BackgroundCanvasShader } from "./shader/index";

export class BackgroundCanvas {
  renderer: WebGLRenderer;

  scene: Scene;
  camera: Camera;

  material: ShaderMaterial;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas, antialias: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new Scene();
    this.camera = new Camera();
    this.camera.position.z = 1;

    // Shader material
    this.material = new ShaderMaterial(BackgroundCanvasShader);

    // Create a full-screen quad
    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, this.material);
    this.scene.add(mesh);

    this.tick(0);

    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("scroll", () => this.onScroll());
    this.onResize();
  }

  onScroll() {
    this.material.uniforms.scroll.value = window.scrollY;
  }

  onResize() {
    const { innerWidth, innerHeight } = window;
    const ratio = innerHeight / innerWidth;
    this.renderer.setSize(640, 640 * ratio, true);
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.material.uniforms.resolution.value.set(640, 640 * ratio);
    this.renderer.render(this.scene, this.camera);
  }

  animationFrameId: number | null = null;
  fps = 24;
  lastRenderTime = performance.now(); // Start time in milliseconds

  tick(timeInMilliseconds: number) {
    const interval = 1000 / this.fps; // Interval in milliseconds for 24 fps

    if (timeInMilliseconds - this.lastRenderTime >= interval) {
      this.material.uniforms.time.value = timeInMilliseconds / 1000; // Use seconds if required for uniforms
      this.renderer.render(this.scene, this.camera);
      this.lastRenderTime = timeInMilliseconds;
    }

    this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
  }
}
