export interface Choice {
  text: string;
  target: string;
}

export interface Passage {
  text: string;
  choices: Choice[];
  onEnter?: (state: GameState) => GameState;
  isGlitch?: boolean;
}

export interface GameState {
  observe: number;
  feel: number;
  hack: number;
  cocreate: number;
  glitchesSeen: string[];
  currentPassage: string;
}

export const initialGameState: GameState = {
  observe: 0,
  feel: 0,
  hack: 0,
  cocreate: 0,
  glitchesSeen: [],
  currentPassage: 'Start',
};

export const passages: Record<string, Passage> = {
  Start: {
    text: `<h2>Welcome to the "Queering the Game" Workshop</h2>
           <p>This is an interactive, rhizomatic journey through the 4 pillars of decolonial machinima creation: <strong>OBSERVE, FEEL, HACK, and CO-CREATE</strong>.</p>
           <p>Choose your portal:</p>`,
    choices: [
      { text: 'Portal A: "I want to break the rules"', target: 'PortalA' },
      { text: 'Portal B: "I want to listen to the land"', target: 'PortalB' },
      { text: 'Portal C: "I want to build a new body"', target: 'PortalC' },
      { text: 'Portal D: "I want to archive the unarchivable"', target: 'PortalD' },
    ],
  },

  PortalA: {
    onEnter: (state) => ({ ...state, observe: state.observe + 1 }),
    text: `<h2>Portal A - The Anti-Natural Museum</h2>
           <p>The word "natural" has historically been used as a moral and political weapon against queer bodies and non-binary ecologies. You are standing in the foyer of the Anti-Natural Museum, a digital space designed specifically to dismantle the logic of victory and extraction.</p>
           <p>Here, we do not play to win. As Bonnie Ruberg argues, queerness is found in the practice of playing itself: the failure, the slowness, the refusal of the victory state. Look at games like <em>Dys4ia</em> and <em>Lim</em>.</p>
           <p>Where will you direct your misplay?</p>`,
    choices: [
      { text: 'Examine the architecture of systemic frustration', target: 'A_Frustration' },
      { text: 'Observe the punishing loop of the everyday', target: 'A_DailyLoop' },
      { text: 'Embrace absurd transgression and satire', target: 'A_Absurd' },
      { text: 'I am tired of trying to succeed. I just want to give up.', target: 'Glitch1' },
    ],
  },

  A_Frustration: {
    onEnter: (state) => ({ ...state, observe: state.observe + 1 }),
    text: `<h2>The Architecture of Frustration</h2>
           <p>You step into a corridor where the walls seem to close in. You are learning to read games against the grain, finding the cracks in the system's logic. You are observing how mainstream mechanics enforce a binary, solid world.</p>`,
    choices: [
      { text: 'Linger where the game wants you to run', target: 'A_DailyLoop' },
      { text: 'Take this broken body and build a new one', target: 'PortalC' },
    ],
  },

  A_DailyLoop: {
    onEnter: (state) => ({ ...state, observe: state.observe + 1, feel: state.feel + 1 }),
    text: `<h2>The Daily Loop</h2>
           <p>You walk in a circle. You wake up, you get dressed, you walk down the street. This is the rhythm of the everyday. By refusing the objective, you document moments of resistance.</p>`,
    choices: [
      { text: 'Hack the camera and change the perspective', target: 'PortalC' },
      { text: 'Laugh at the absurdity of these rules', target: 'A_Absurd' },
    ],
  },

  A_Absurd: {
    onEnter: (state) => ({ ...state, observe: state.observe + 1, hack: state.hack + 1 }),
    text: `<h2>Absurd Transgressions</h2>
           <p>A sudden burst of neon and humor shatters the solemnity. The subversion of normative systems doesn't happen through quiet frustration here, but through escatological humor. Queerness can be joyful, silly, and entirely disruptive.</p>`,
    choices: [
      { text: 'Take this disruption and hack the engine', target: 'PortalC' },
      { text: 'Document this radical joy in the archive', target: 'PortalD' },
    ],
  },

  PortalB: {
    onEnter: (state) => ({ ...state, feel: state.feel + 1 }),
    text: `<h2>Portal B - Oozing Ecologies</h2>
           <p>You step outside the sterile confines of the game engine. Here, we practice Queer Ecology. We listen to the oozing, the strange, the multiplicitous. Look at games like <em>Tchia</em> and <em>When Rivers Were Trails</em>.</p>
           <p>What will you capture with your macro lens?</p>`,
    choices: [
      { text: 'The decay of the urban structure', target: 'B_Decay' },
      { text: 'The whispers of indigenous symbiosis', target: 'B_Symbiosis' },
    ],
  },

  B_Decay: {
    onEnter: (state) => ({ ...state, feel: state.feel + 1 }),
    text: `<h2>Decay and Growth</h2>
           <p>The slime mold doesn't follow straight lines. You document the glitching roots.</p>`,
    choices: [
      { text: 'Hack the camera and change the perspective', target: 'PortalC' },
    ],
  },

  B_Symbiosis: {
    onEnter: (state) => ({ ...state, feel: state.feel + 1 }),
    text: `<h2>Indigenous Symbiosis</h2>
           <p>You document the interconnectedness and pluriversal knowledge.</p>`,
    choices: [
      { text: 'Archive this knowledge', target: 'PortalD' },
    ],
  },

  PortalC: {
    onEnter: (state) => ({ ...state, hack: state.hack + 1 }),
    text: `<h2>Portal C - The Multiplicitous Avatar</h2>
           <p>Engines force avatars into binary, solid spaces. Here, bodies leak, merge, and occupy multiple states. Think of the counter-narrations in <em>Tell Me Why</em> or the fluidity in <em>If Found...</em>. Break the collision boxes.</p>
           <p>How will you rebuild your avatar?</p>`,
    choices: [
      { text: 'Glitch the textures', target: 'C_Glitch' },
      { text: 'Merge with the environment', target: 'PortalB' },
      { text: 'Re-voice the narrative', target: 'C_Revoice' },
    ],
  },

  C_Glitch: {
    onEnter: (state) => ({ ...state, hack: state.hack + 1 }),
    text: `<h2>Glitch Textures</h2>
           <p>Your avatar becomes an impossible shape, bleeding into the game geometry.</p>`,
    choices: [
      { text: 'Document this transformation in the archive', target: 'PortalD' },
    ],
  },

  C_Revoice: {
    onEnter: (state) => ({ ...state, hack: state.hack + 1 }),
    text: `<h2>Revoice Narrative</h2>
           <p>You take control of the microphone. The old script is gone.</p>`,
    choices: [
      { text: 'Create a new history', target: 'PortalD' },
    ],
  },

  PortalD: {
    onEnter: (state) => ({ ...state, cocreate: state.cocreate + 1 }),
    text: `<h2>Portal D - The Fabulated Archive</h2>
           <p>Welcome to the Archive. Here, you fabulate official documents for non-human entities and edit machinima to preserve erased queer memories, inspired by the Mix Brasil Archive and <em>Third World: The Bottom Dimension</em>.</p>
           <p>What will you archive today?</p>`,
    choices: [
      { text: "A river's passport", target: 'D_River' },
      { text: 'A forgotten memory', target: 'PortalC' },
      { text: 'Proceed to the arcade', target: 'Arcade' },
    ],
  },

  D_River: {
    onEnter: (state) => ({ ...state, cocreate: state.cocreate + 1 }),
    text: `<h2>River Passport</h2>
           <p>You issue a passport to a body of water, granting it ecological citizenship.</p>`,
    choices: [
      { text: 'Return to the start', target: 'Start' },
      { text: 'Celebrate at the Arcade', target: 'Arcade' },
    ],
  },

  Glitch1: {
    isGlitch: true,
    onEnter: (state) => ({
      ...state,
      hack: state.hack + 1,
      observe: Math.max(0, state.observe - 1),
      glitchesSeen: state.glitchesSeen.includes('G1')
        ? state.glitchesSeen
        : [...state.glitchesSeen, 'G1'],
    }),
    text: `<h2>CRITICAL ERROR: SUCCESS NOT FOUND.</h2>
           <p>The museum walls dissolve into raw, bleeding code. You refused to participate in the prescribed loop. You failed completely, and in doing so, you have broken the simulation.</p>
           <p><em>"Failure is an alternative to capitalist, heteronormative, and extractivist logics of success." — Jack Halberstam.</em></p>
           <p><strong>Micro-instruction:</strong> Close the game window for a moment. Look out the physical window next to you. Record the sound of the nearest non-human entity you can find.</p>`,
    choices: [
      { text: 'Proceed to hack the digital skin', target: 'PortalC' },
    ],
  },

  Glitch2: {
    isGlitch: true,
    onEnter: (state) => ({
      ...state,
      glitchesSeen: state.glitchesSeen.includes('G2')
        ? state.glitchesSeen
        : [...state.glitchesSeen, 'G2'],
    }),
    text: `<h2>THE EARTH DEMANDS</h2>
           <p><em>"A terra dá, a terra quer" (The earth gives, the earth demands) — Antonio Bispo dos Santos.</em></p>
           <p>You have extracted mechanics and hacked bodies without stopping to listen. The engine refuses to compile.</p>
           <p>Look away from the screen. Acknowledge the physical space you occupy before continuing.</p>`,
    choices: [
      { text: 'I am ready to listen', target: 'PortalB' },
    ],
  },

  Glitch4: {
    isGlitch: true,
    onEnter: (state) => ({
      ...state,
      glitchesSeen: state.glitchesSeen.includes('G4')
        ? state.glitchesSeen
        : [...state.glitchesSeen, 'G4'],
    }),
    text: `<h2>THE STRANGE STRANGER</h2>
           <p>What does the slime mold think of your game?</p>
           <p>The text scrambles. Fungal growth overtakes the code block. You are no longer the center of this ecosystem.</p>`,
    choices: [
      { text: 'Surrender to the mesh', target: 'PortalB' },
    ],
  },

  Arcade: {
    text: `<h2>Arcade Celebration</h2>
           <p>Congratulations. You have completed the loop and arrived at the Carnival of Games.</p>
           <p>Thank you for Queering the Game.</p>`,
    choices: [
      { text: 'Restart Workshop', target: 'Start' },
    ],
  },
};

// Determine if a glitch should intercept a passage
export function getEffectivePassageId(
  targetId: string,
  state: GameState
): string {
  if (targetId === 'PortalC' && state.feel === 0 && state.hack >= 2) {
    return 'Glitch2';
  }
  if (
    targetId === 'PortalD' &&
    Math.random() < 0.25 &&
    !state.glitchesSeen.includes('G4')
  ) {
    return 'Glitch4';
  }
  return targetId;
}
