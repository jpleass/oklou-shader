import { Vector2 } from "three";
import { lerp } from "three/src/math/MathUtils.js";
import fragmentShader from "./backgroundCanvas.frag.glsl?raw";
import vertexShader from "./backgroundCanvas.vert.glsl?raw";

export const BackgroundCanvasShader = {
  uniforms: {
    time: { value: 0 },
    resolution: { value: new Vector2(0, 0) },
    speed: { value: 0.035 },
    seed: { value: lerp(0, 1000, Math.random()) },
    scroll: { value: 0 },
  },
  vertexShader,
  fragmentShader,
};
