import { Vector2 } from "three";
import fragmentShader from "./backgroundCanvas.frag.glsl?raw";
import vertexShader from "./backgroundCanvas.vert.glsl?raw";

export const BackgroundCanvasShader = {
  uniforms: {
    time: { value: 0 },
    resolution: { value: new Vector2(0, 0) },
    speed: { value: 0.035 },
    scroll: { value: 0 },
  },
  vertexShader,
  fragmentShader,
};
