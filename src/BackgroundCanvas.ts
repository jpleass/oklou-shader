import {
  Camera,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { BackgroundCanvasShader } from "./shader";

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
  }

  animationFrameId: number | null = null;
  fps = 24;
  lastTime = 0;
  tick(time: number) {
    time *= 0.001; // Convert time to seconds

    // only updae every 1/24th of a second
    if (time - this.lastTime < 1 / this.fps) {
      this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
      return;
    }
    this.lastTime = time;

    this.material.uniforms.time.value = time;
    this.renderer.render(this.scene, this.camera);

    this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
  }
}
