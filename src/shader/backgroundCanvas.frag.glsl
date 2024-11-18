precision mediump float;
#define S(a, b, t) smoothstep(a, b, t)

mat2 Rot(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
  return fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  float n = mix(
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
      dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
      dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  
  return 0.5 + 0.5 * n;
}

float N(float t) {
  return fract(sin(t * 12345.564) * 7658.76);
}


uniform float time;
uniform float speed;
uniform float scroll;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float ratio = resolution.x / resolution.y;
  vec2 centeredUV = uv - 0.5;

  // Rotate with Noise
  float degree = noise(vec2((time + (scroll * 0.0025)) * speed, centeredUV.x * centeredUV.y));
  centeredUV.y /= ratio;
  centeredUV *= Rot(radians((degree - 0.5) * 720.0 + 180.0));
  centeredUV.y *= ratio;

  // Wave warp with sin
  float frequency = 0.25;
  float amplitude = 2.0;
  float warpSpeed = time * speed * 0.05;
  centeredUV.x += sin(centeredUV.y * frequency + warpSpeed) / amplitude;
  centeredUV.y += sin(centeredUV.x * frequency * 1.5 + warpSpeed) / (amplitude * 0.5);

  // Draw the image
  // colorLightBlue = #C4EAF2
  vec3 colorLightBlue = vec3(0.768, 0.918, 0.949);
  // colorWhite = #E4EAD8
  vec3 colorWhite = vec3(0.894, 0.918, 0.847);
  vec3 layer1 = mix(colorLightBlue, colorWhite, S(-0.3, 0.2, (centeredUV * Rot(radians(-5.0))).x));
  
  // colorDeepBlue = #175073
  vec3 colorDeepBlue = vec3(0.090, 0.314, 0.451);
  // colorBlack = #2A3235
  vec3 colorBlack = vec3(0.165, 0.196, 0.208);
  vec3 layer2 = mix(colorLightBlue, colorDeepBlue, S(-0.3, 0.2, (centeredUV * Rot(radians(-5.0))).x));
  
  vec3 finalComp = mix(layer1, layer2, S(0.5, -0.3, centeredUV.y));

  
  // Add color noise to the tDiffuse.
  float timeSin = sin(time);
  float p = uv.x + uv.y;
  vec3 randomColor = vec3(N(timeSin + p), N(timeSin + p + 1.0), N(timeSin + p + 2.0));
  finalComp.rgb += randomColor * 0.075;



  gl_FragColor = vec4(finalComp, 1.0);
}
