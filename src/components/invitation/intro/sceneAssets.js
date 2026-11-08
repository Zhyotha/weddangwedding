// Every layer of the opening painting is its own watercolour asset so each one
// can enter from its own direction, at its own time, with its own movement.
// Art is painted on white paper and drawn with `multiply`, so the paper
// disappears into the scene while the pigment layers like real watercolour.

const base = "https://media.base44.com/images/public/6af08608d3d7f11087d59cc7";

export const SCENE = {
  bgWide: `${base}/9fc6b785d_generated_image.png`,
  bgPortrait: `${base}/309d9a16c_generated_image.png`,

  branchTL: `${base}/99aaf7f2d_generated_image.png`,
  branchTR: `${base}/9946b59c6_generated_image.png`,
  branchBL: `${base}/35cf42acf_generated_image.png`,
  branchBR: `${base}/545f50fd9_generated_image.png`,

  sideLeft: `${base}/3cb651a5d_generated_image.png`,
  sideRight: `${base}/f348cdc28_generated_image.png`,

  bottomCenter: `${base}/6e7e7f010_generated_image.png`,
  bottomLeft: `${base}/1069d1144_generated_image.png`,
  bottomRight: `${base}/3d6d78232_generated_image.png`,

  vegLeft: `${base}/31a030012_generated_image.png`,
  vegRight: `${base}/0b2eef29a_generated_image.png`,

  cornerUR: `${base}/9cadf2a8a_generated_image.png`,
  cornerUL: `${base}/00dc75190_generated_image.png`,
};

// Phase timings (ms). Each entry begins the step the index names.
export const INTRO_STEPS = [
  0, // 0 · four branches grow in
  2600, // 1 · branches spread out, camera pushes through
  5000, // 2 · two side branches spring into frame
  6300, // 3 · bottom-centre vegetation rises
  6800, // 4 · bottom-left flowers
  7300, // 5 · bottom-right flowers
  7900, // 6 · left-hand botanicals
  8400, // 7 · right-hand botanicals
  9000, // 8 · upper-right arrangement
  9500, // 9 · upper-left arrangement
  10200, // 10 · hanging vines drop in
  10800, // 11 · butterflies and falling leaves
  12000, // 12 · wedding names
  13600, // 13 · diagonal shine
  15400, // 14 · open invitation ready
];

const sway = (rotate, drift, duration, delay) => ({
  animate: { rotate, x: drift },
  transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
});

export const SWAY = {
  branchTL: sway([0, 1.1, -0.5, 0], ["0%", "1.4%", "-0.9%", "0%"], 15, 0.6),
  branchTR: sway([0, -1.2, 0.6, 0], ["0%", "-1.5%", "1%", "0%"], 18, 1.4),
  branchBL: sway([0, -0.9, 0.5, 0], ["0%", "1.1%", "-0.8%", "0%"], 13, 0.9),
  branchBR: sway([0, 1, -0.6, 0], ["0%", "-1.2%", "0.9%", "0%"], 20, 1.8),
  sideLeft: sway([0, 1.6, -0.9, 0], ["0%", "1.2%", "-0.7%", "0%"], 12, 0.4),
  sideRight: sway([0, -1.5, 0.8, 0], ["0%", "-1.1%", "0.8%", "0%"], 16, 1.1),
  bottomCenter: sway([0, 0.8, -0.5, 0], ["0%", "0.9%", "-0.6%", "0%"], 11, 0.3),
  bottomLeft: sway([0, -0.7, 0.4, 0], ["0%", "0.7%", "-0.5%", "0%"], 14, 0.8),
  bottomRight: sway([0, 0.9, -0.4, 0], ["0%", "-0.8%", "0.6%", "0%"], 17, 1.6),
  vegLeft: sway([0, 1.2, -0.7, 0], ["0%", "1%", "-0.6%", "0%"], 13, 0.5),
  vegRight: sway([0, -1.1, 0.6, 0], ["0%", "-0.9%", "0.7%", "0%"], 19, 1.3),
  cornerUR: sway([0, 1.4, -0.8, 0], ["0%", "0.8%", "-0.5%", "0%"], 15, 0.7),
  cornerUL: sway([0, -1.3, 0.7, 0], ["0%", "-0.8%", "0.5%", "0%"], 18, 1.2),
};