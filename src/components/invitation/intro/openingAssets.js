// Every layer of the opening scene is its own etched plate, so the camera, the
// curtain of branches and the little living details can each move on their own.
// The decorations are cut out on transparency, so they can sit over the painted
// venue without any blend trickery.

const base = "https://media.base44.com/images/public/6af0bdd0e6309a33407cc363";

export const OPENING = {
  scene: `${base}/5209e44a8_generated_5334c758.png`,
  branchLeft: `${base}/e87f0ef1a_generated_5175c0b4.png`,
  branchRight: `${base}/3e5dd2378_generated_205bec91.png`,
  branchTop: `${base}/7783f5895_generated_e6eaa223.png`,
  umbrella: `${base}/32c884b82_generated_1890d33a.png`,
  florals: `${base}/1380f6eab_generated_ce492825.png`,
};

// Cue sheet, in milliseconds — the same beats as the reference film.
export const OPENING_CUES = {
  curtain: 90, // the curtain begins to part and the camera pulls back
  eyebrow: 5000, // "The Wedding of"
  names: 7000, // the couple's names
  button: 8400, // open invitation
};

export const CLOSING_MS = 1500;