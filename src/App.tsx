import { useState, useCallback, useEffect } from 'react';

// ==================== TYPES ====================
interface Choice {
  text: string;
  target: string;
}

interface Passage {
  title: string;
  content: string;
  choices: Choice[];
  isGlitch?: boolean;
}

interface GameState {
  observe: number;
  feel: number;
  hack: number;
  cocreate: number;
  glitchesSeen: string[];
  currentPassage: string;
}

// ==================== REFERENCES DATA ====================
const references = {
  games: [
    {
      name: 'Dys4ia',
      author: 'Anna Anthropy',
      year: '2012',
      url: 'https://w.itch.io/dys4ia',
      authorUrl: 'https://w.itch.io/',
      desc: 'An autobiographical game about hormonal transition.',
    },
    {
      name: 'Lim',
      author: 'merritt k',
      year: '2012',
      url: 'https://merrittk.itch.io/lim',
      authorUrl: 'https://merrittk.itch.io/',
      desc: 'A game about the violent experience of inhabiting a liminal social space.',
    },
    {
      name: 'Tchia',
      author: 'Awaceb',
      year: '2023',
      url: 'https://www.awaceb.com/tchia',
      authorUrl: 'https://www.awaceb.com/',
      desc: 'An open-world adventure inspired by New Caledonia.',
    },
    {
      name: 'When Rivers Were Trails',
      author: 'Indian Land Tenure Foundation / Elizabeth LaPensée',
      year: '2019',
      url: 'https://indianlandtenure.itch.io/when-rivers-were-trails',
      authorUrl: 'https://elapensee.com/',
      desc: 'A point-and-click adventure about the impact of colonization on Indigenous communities.',
    },
    {
      name: 'Tell Me Why',
      author: 'DONTNOD Entertainment',
      year: '2020',
      url: 'https://www.tellmewhygame.com/',
      authorUrl: 'https://dont-nod.com/',
      desc: 'An episodic adventure featuring a transgender protagonist.',
    },
    {
      name: 'If Found...',
      author: 'Dreamfeel',
      year: '2020',
      url: 'https://store.steampowered.com/app/1041920/If_Found/',
      authorUrl: 'https://dreamfeel.ie/',
      desc: 'A visual novel about going home, coming out, and erasing everything.',
    },
    {
      name: 'Third World: The Bottom Dimension',
      author: 'Gabriel Massan / Serpentine Arts Technologies',
      year: '2022–ongoing',
      url: 'https://store.steampowered.com/app/2154250/Third_World_The_Bottom_Dimension/',
      authorUrl: 'https://www.serpentinegalleries.org/whats-on/gabriel-massan-third-world-the-bottom-dimension-game/',
      desc: 'A machinima exploring Black Brazilian experience through colonialism and extraction.',
    },
  ],
  theorists: [
    {
      name: 'Bonnie Ruberg',
      works: [
        { title: 'Video Games Have Always Been Queer', url: 'https://nyupress.org/9781479831036/video-games-have-always-been-queer/', year: '2019' },
        { title: 'Queer Game Studies', url: 'https://www.upress.umn.edu/9781517900373/queer-game-studies/', year: '2017' },
      ],
      desc: 'Argues that queerness is found in the practice of playing itself.',
    },
    {
      name: 'Jack (Judith) Halberstam',
      works: [
        { title: 'The Queer Art of Failure', url: 'https://www.dukeupress.edu/the-queer-art-of-failure', year: '2011' },
      ],
      desc: '"Failure is an alternative to capitalist, heteronormative logics of success."',
    },
    {
      name: 'Antônio Bispo dos Santos (Nêgo Bispo)',
      works: [
        { title: 'A terra dá, a terra quer (The Land Gives, the Land Wants)', url: 'https://www.goodreads.com/book/show/156430454-a-terra-d-a-terra-quer', year: '2023' },
      ],
      desc: 'Quilombola thought and indigenous epistemologies.',
    },
  ],
  archives: [
    {
      name: 'Mix Brasil Festival',
      url: 'https://mixbrasil.org.br/',
      desc: 'The largest LGBTQIA+ cultural festival in Latin America since 1993.',
    },
    {
      name: 'Serpentine Galleries',
      url: 'https://www.serpentinegalleries.org/whats-on/third-world-the-bottom-dimension/',
      desc: 'Commissioning body for Third World: The Bottom Dimension.',
    },
  ],
};

// ==================== PASSAGES DATA ====================
const passages: Record<string, Passage> = {
  Start: {
    title: 'Welcome to the "Queering the Game" Workshop',
    content: `<p>This is an interactive, rhizomatic journey through the 4 pillars of decolonial machinima creation: <strong>OBSERVE, FEEL, HACK, and CO-CREATE</strong>.</p><p>Choose your portal:</p>`,
    choices: [
      { text: 'Portal A: "I want to break the rules"', target: 'PortalA' },
      { text: 'Portal B: "I want to listen to the land"', target: 'PortalB' },
      { text: 'Portal C: "I want to build a new body"', target: 'PortalC' },
      { text: 'Portal D: "I want to archive the unarchivable"', target: 'PortalD' },
    ],
  },
  PortalA: {
    title: 'Portal A — The Anti-Natural Museum',
    content: `<p>The word "natural" has historically been used as a moral and political weapon against queer bodies and non-binary ecologies. You are standing in the foyer of the Anti-Natural Museum, a digital space designed specifically to dismantle the logic of victory and extraction.</p>
<p>Here, we do not play to win. As <RefLink href="https://nyupress.org/9781479831036/video-games-have-always-been-queer/">Bonnie Ruberg</RefLink> argues in <RefLink href="https://nyupress.org/9781479831036/video-games-have-always-been-queer/"><em>Video Games Have Always Been Queer</em></RefLink>, queerness is found in the practice of playing itself: the failure, the slowness, the refusal of the victory state. Look at games like <RefLink href="https://w.itch.io/dys4ia"><em>Dys4ia</em></RefLink> by <RefLink href="https://w.itch.io/">Anna Anthropy</RefLink> and <RefLink href="https://merrittk.itch.io/lim"><em>Lim</em></RefLink> by <RefLink href="https://merrittk.itch.io/">merritt k</RefLink>.</p>
<p>Where will you direct your misplay?</p>`,
    choices: [
      { text: 'Examine the architecture of systemic frustration', target: 'A_Frustration' },
      { text: 'Observe the punishing loop of the everyday', target: 'A_DailyLoop' },
      { text: 'Embrace absurd transgression and satire', target: 'A_Absurd' },
      { text: 'I am tired of trying to succeed. I just want to give up.', target: 'Glitch1' },
    ],
  },
  A_Frustration: {
    title: 'The Architecture of Frustration',
    content: `<p>You step into a corridor where the walls seem to close in. You are learning to read games against the grain, finding the cracks in the system's logic. You are observing how mainstream mechanics enforce a binary, solid world.</p>`,
    choices: [
      { text: 'Linger where the game wants you to run', target: 'A_DailyLoop' },
      { text: 'Take this broken body and build a new one', target: 'PortalC' },
    ],
  },
  A_DailyLoop: {
    title: 'The Daily Loop',
    content: `<p>You walk in a circle. You wake up, you get dressed, you walk down the street. This is the rhythm of the everyday. By refusing the objective, you document moments of resistance.</p>`,
    choices: [
      { text: 'Hack the camera and change the perspective', target: 'PortalC' },
      { text: 'Laugh at the absurdity of these rules', target: 'A_Absurd' },
    ],
  },
  A_Absurd: {
    title: 'Absurd Transgressions',
    content: `<p>A sudden burst of neon and humor shatters the solemnity. The subversion of normative systems doesn't happen through quiet frustration here, but through escatological humor. Queerness can be joyful, silly, and entirely disruptive.</p>`,
    choices: [
      { text: 'Take this disruption and hack the engine', target: 'PortalC' },
      { text: 'Document this radical joy in the archive', target: 'PortalD' },
    ],
  },
  PortalB: {
    title: 'Portal B — Oozing Ecologies',
    content: `<p>You step outside the sterile confines of the game engine. Here, we practice Queer Ecology. We listen to the oozing, the strange, the multiplicitous. Look at games like <RefLink href="https://www.awaceb.com/tchia"><em>Tchia</em></RefLink> by <RefLink href="https://www.awaceb.com/">Awaceb</RefLink> and <RefLink href="https://indianlandtenure.itch.io/when-rivers-were-trails"><em>When Rivers Were Trails</em></RefLink> by the <RefLink href="https://www.indianlandtenure.org/">Indian Land Tenure Foundation</RefLink> with <RefLink href="https://elapensee.com/">Elizabeth LaPensée</RefLink>.</p>
<p>What will you capture with your macro lens?</p>`,
    choices: [
      { text: 'The decay of the urban structure', target: 'B_Decay' },
      { text: 'The whispers of indigenous symbiosis', target: 'B_Symbiosis' },
    ],
  },
  B_Decay: {
    title: 'Decay and Growth',
    content: `<p>The slime mold doesn't follow straight lines. You document the glitching roots. The mycelium network rewrites the game's pathfinding algorithm.</p>`,
    choices: [
      { text: 'Hack the camera and change the perspective', target: 'PortalC' },
    ],
  },
  B_Symbiosis: {
    title: 'Indigenous Symbiosis',
    content: `<p>You document the interconnectedness and pluriversal knowledge. The land speaks in protocols older than any game engine.</p>`,
    choices: [
      { text: 'Archive this knowledge', target: 'PortalD' },
    ],
  },
  PortalC: {
    title: 'Portal C — The Multiplicitous Avatar',
    content: `<p>Engines force avatars into binary, solid spaces. Here, bodies leak, merge, and occupy multiple states. Think of the counter-narrations in <RefLink href="https://www.tellmewhygame.com/"><em>Tell Me Why</em></RefLink> by <RefLink href="https://dont-nod.com/">DONTNOD</RefLink> or the fluidity in <RefLink href="https://store.steampowered.com/app/1041920/If_Found/"><em>If Found...</em></RefLink> by <RefLink href="https://dreamfeel.ie/">Dreamfeel</RefLink>. Break the collision boxes.</p>
<p>How will you rebuild your avatar?</p>`,
    choices: [
      { text: 'Glitch the textures', target: 'C_Glitch' },
      { text: 'Merge with the environment', target: 'PortalB' },
      { text: 'Re-voice the narrative', target: 'C_Revoice' },
    ],
  },
  C_Glitch: {
    title: 'Glitch Textures',
    content: `<p>Your avatar becomes an impossible shape, bleeding into the game geometry. The collision mesh surrenders. Vertices scatter like seeds.</p>`,
    choices: [
      { text: 'Document this transformation in the archive', target: 'PortalD' },
    ],
  },
  C_Revoice: {
    title: 'Revoice Narrative',
    content: `<p>You take control of the microphone. The old script is gone. New words emerge from the static, spoken in tongues the engine was never designed to render.</p>`,
    choices: [
      { text: 'Create a new history', target: 'PortalD' },
    ],
  },
  PortalD: {
    title: 'Portal D — The Fabulated Archive',
    content: `<p>Welcome to the Archive. Here, you fabulate official documents for non-human entities and edit machinima to preserve erased queer memories, inspired by the <RefLink href="https://mixbrasil.org.br/">Mix Brasil Festival</RefLink> and <RefLink href="https://store.steampowered.com/app/2154250/Third_World_The_Bottom_Dimension/"><em>Third World: The Bottom Dimension</em></RefLink> by <RefLink href="https://www.serpentinegalleries.org/whats-on/gabriel-massan-third-world-the-bottom-dimension-game/">Gabriel Massan</RefLink>.</p>
<p>What will you archive today?</p>`,
    choices: [
      { text: "A river's passport", target: 'D_River' },
      { text: 'A forgotten memory', target: 'PortalC' },
      { text: 'Proceed to the arcade', target: 'Arcade' },
    ],
  },
  D_River: {
    title: 'River Passport',
    content: `<p>You issue a passport to a body of water, granting it ecological citizenship. The river now has a name, a history, and the right to refuse extraction.</p>`,
    choices: [
      { text: 'Return to the start', target: 'Start' },
      { text: 'Celebrate at the Arcade', target: 'Arcade' },
    ],
  },
  Glitch1: {
    isGlitch: true,
    title: '⚠ CRITICAL ERROR: SUCCESS NOT FOUND.',
    content: `<p>The museum walls dissolve into raw, bleeding code. You refused to participate in the prescribed loop. You failed completely, and in doing so, you have broken the simulation.</p>
<p><em>"Failure is an alternative to capitalist, heteronormative, and extractivist logics of success."</em> — <RefLink href="https://www.dukeupress.edu/the-queer-art-of-failure">Jack Halberstam, <em>The Queer Art of Failure</em></RefLink></p>
<p><strong>Micro-instruction:</strong> Close the game window for a moment. Look out the physical window next to you. Record the sound of the nearest non-human entity you can find.</p>`,
    choices: [
      { text: 'Proceed to hack the digital skin', target: 'PortalC' },
    ],
  },
  Glitch2: {
    isGlitch: true,
    title: '⚠ THE EARTH DEMANDS',
    content: `<p><em>"A terra dá, a terra quer"</em> (The earth gives, the earth demands) — <RefLink href="https://www.goodreads.com/book/show/156430454-a-terra-d-a-terra-quer">Antônio Bispo dos Santos (Nêgo Bispo)</RefLink></p>
<p>You have extracted mechanics and hacked bodies without stopping to listen. The engine refuses to compile.</p>
<p>Look away from the screen. Acknowledge the physical space you occupy before continuing.</p>`,
    choices: [
      { text: 'I am ready to listen', target: 'PortalB' },
    ],
  },
  Glitch4: {
    isGlitch: true,
    title: '⚠ THE STRANGE STRANGER',
    content: `<p>What does the slime mold think of your game?</p>
<p>The text scrambles. Fungal growth overtakes the code block. You are no longer the center of this ecosystem.</p>`,
    choices: [
      { text: 'Surrender to the mesh', target: 'PortalB' },
    ],
  },
  Arcade: {
    title: '🎮 Arcade Celebration',
    content: `<p>Congratulations. You have completed the loop and arrived at the Carnival of Games.</p>
<p>Thank you for Queering the Game.</p>`,
    choices: [
      { text: 'Restart Workshop', target: 'Start' },
    ],
  },
};

// ==================== HELPER COMPONENTS ====================
function RefLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-ref-green)] border-b border-dotted border-[var(--color-ref-green)] hover:text-[#8be9fd] hover:border-[#8be9fd] transition-colors"
    >
      {children}
    </a>
  );
}

function EditableContent({ html }: { html: string }) {
  // We need to process the HTML to replace RefLink tags with actual anchor tags
  const processedHtml = html
    .replace(/<RefLink href="([^"]+)">(.*?)<\/RefLink>/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="ref-link">$2</a>');

  return (
    <div
      className="passage-content"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}

// ==================== STATE MANAGEMENT ====================
const initialState: GameState = {
  observe: 0,
  feel: 0,
  hack: 0,
  cocreate: 0,
  glitchesSeen: [],
  currentPassage: 'Start',
};

function applyOnEnter(id: string, state: GameState): GameState {
  switch (id) {
    case 'PortalA':
      return { ...state, observe: state.observe + 1 };
    case 'A_Frustration':
      return { ...state, observe: state.observe + 1 };
    case 'A_DailyLoop':
      return { ...state, observe: state.observe + 1, feel: state.feel + 1 };
    case 'A_Absurd':
      return { ...state, observe: state.observe + 1, hack: state.hack + 1 };
    case 'PortalB':
      return { ...state, feel: state.feel + 1 };
    case 'B_Decay':
      return { ...state, feel: state.feel + 1 };
    case 'B_Symbiosis':
      return { ...state, feel: state.feel + 1 };
    case 'PortalC':
      return { ...state, hack: state.hack + 1 };
    case 'C_Glitch':
      return { ...state, hack: state.hack + 1 };
    case 'C_Revoice':
      return { ...state, hack: state.hack + 1 };
    case 'PortalD':
      return { ...state, cocreate: state.cocreate + 1 };
    case 'D_River':
      return { ...state, cocreate: state.cocreate + 1 };
    case 'Glitch1':
      return {
        ...state,
        hack: state.hack + 1,
        observe: Math.max(0, state.observe - 1),
        glitchesSeen: state.glitchesSeen.includes('G1') ? state.glitchesSeen : [...state.glitchesSeen, 'G1'],
      };
    case 'Glitch2':
      return {
        ...state,
        glitchesSeen: state.glitchesSeen.includes('G2') ? state.glitchesSeen : [...state.glitchesSeen, 'G2'],
      };
    case 'Glitch4':
      return {
        ...state,
        glitchesSeen: state.glitchesSeen.includes('G4') ? state.glitchesSeen : [...state.glitchesSeen, 'G4'],
      };
    default:
      return state;
  }
}

function getEffectiveId(targetId: string, state: GameState): string {
  if (targetId === 'PortalC' && state.feel === 0 && state.hack >= 2) {
    return 'Glitch2';
  }
  if (targetId === 'PortalD' && Math.random() < 0.25 && !state.glitchesSeen.includes('G4')) {
    return 'Glitch4';
  }
  return targetId;
}

// ==================== MAIN APP ====================
export default function App() {
  const [state, setState] = useState<GameState>(initialState);
  const [editMode, setEditMode] = useState(true);
  const [renderKey, setRenderKey] = useState(0);

  const navigateTo = useCallback((targetId: string) => {
    setState((prev) => {
      if (targetId === 'Start') {
        return { ...initialState };
      }
      const effectiveId = getEffectiveId(targetId, prev);
      const newState = applyOnEnter(effectiveId, prev);
      return { ...newState, currentPassage: effectiveId };
    });
    setRenderKey((k) => k + 1);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [renderKey]);

  const passage = passages[state.currentPassage];

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4">
      <div className="max-w-4xl w-full">
        {/* Edit Banner */}
        <div className="bg-[#2a2a2a] border border-dashed border-[#555] rounded-md px-4 py-3 mb-6 flex items-center justify-between flex-wrap gap-2 text-sm text-[#aaa]">
          <span>📝 <strong className="text-[var(--color-text-main)]">EDITABLE MODE</strong> — Click any text to edit it directly. All links open in new tabs.</span>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-[var(--color-link-pink)] text-[var(--color-bg-dark)] border-none px-3 py-1.5 rounded font-bold font-mono text-sm cursor-pointer hover:bg-[var(--color-link-hover)] hover:text-white transition-colors"
          >
            {editMode ? '🔒 Lock Editing' : '🔓 Unlock Editing'}
          </button>
        </div>

        {/* Legend */}
        <div className="flex gap-4 flex-wrap text-xs text-[#888] mb-4">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-link-pink)] inline-block"></span>
            Game choices
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-ref-green)] inline-block"></span>
            External references (hyperlinked)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-glitch-red)] inline-block"></span>
            Glitch events
          </span>
        </div>

        {/* Game Container */}
        <div
          key={renderKey}
          className="bg-[var(--color-bg-card)] rounded-lg shadow-2xl p-6 sm:p-8 md:p-10 animate-fade-in"
        >
          {/* Passage Title */}
          <h1
            contentEditable={editMode}
            suppressContentEditableWarning
            className={`text-2xl font-bold mb-4 pb-3 border-b border-[#333] ${
              passage.isGlitch ? 'text-[var(--color-glitch-red)] animate-glitch' : 'text-[var(--color-link-pink)]'
            }`}
          >
            {passage.title}
          </h1>

          {/* Passage Content */}
          <div contentEditable={editMode} suppressContentEditableWarning>
            <EditableContent html={passage.content} />
          </div>

          {/* Choices */}
          {passage.choices.length > 0 && (
            <ul className="mt-6 space-y-1">
              {passage.choices.map((choice, idx) => (
                <li
                  key={`${state.currentPassage}-${idx}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${idx * 100 + 200}ms`, opacity: 0 }}
                >
                  <button
                    onClick={() => navigateTo(choice.target)}
                    className="text-left w-full text-[var(--color-link-pink)] font-bold text-lg
                               hover:text-[var(--color-link-hover)] hover:underline
                               transition-colors duration-200 py-2 group cursor-pointer bg-transparent border-none font-mono"
                  >
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                      › {choice.text}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Back to start */}
          {state.currentPassage !== 'Start' && (
            <button
              onClick={() => navigateTo('Start')}
              className="mt-4 text-sm text-[var(--color-link-pink)] hover:text-[var(--color-link-hover)] cursor-pointer bg-transparent border-none font-mono"
            >
              ↩ Return to start
            </button>
          )}

          {/* Metrics */}
          <div className="mt-8 pt-4 border-t border-[#333] text-sm text-[#888]">
            <strong className="text-[var(--color-text-main)]">Journey Metrics:</strong>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {[
                { label: 'Observe', value: state.observe, color: 'bg-pink-500' },
                { label: 'Feel', value: state.feel, color: 'bg-purple-500' },
                { label: 'Hack', value: state.hack, color: 'bg-red-500' },
                { label: 'Co-create', value: state.cocreate, color: 'bg-cyan-500' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center gap-1">
                  <span className="text-xs text-[#888] uppercase tracking-wider">{m.label}</span>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${m.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(100, m.value * 20)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[var(--color-text-main)]">{m.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3">Glitches Encountered: {state.glitchesSeen.length}</p>
          </div>
        </div>

        {/* ==================== REFERENCES SECTION ==================== */}
        <div className="bg-[var(--color-bg-card)] rounded-lg shadow-2xl p-6 sm:p-8 md:p-10 mt-8 border-t-2 border-[#333]">
          <h2 className="text-xl font-bold text-[var(--color-ref-green)] mb-4">📚 References & Hyperlinks</h2>
          <p className="text-sm text-[#888] mb-6">All games, theorists, and archives referenced in this workshop:</p>

          {/* Games */}
          <h3 className="text-lg font-bold text-[var(--color-link-pink)] mt-6 mb-3">Games</h3>
          <ul className="space-y-3">
            {references.games.map((game) => (
              <li key={game.name} className="flex items-start gap-2">
                <span className="text-[var(--color-ref-green)] mt-0.5">→</span>
                <div>
                  <a href={game.url} target="_blank" rel="noopener noreferrer" className="ref-link font-bold">
                    <em>{game.name}</em>
                  </a>
                  {' — '}
                  <a href={game.authorUrl} target="_blank" rel="noopener noreferrer" className="ref-link">
                    {game.author}
                  </a>
                  {' (' + game.year + '). '}
                  <span className="text-[#aaa]">{game.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Theorists */}
          <h3 className="text-lg font-bold text-[var(--color-link-pink)] mt-8 mb-3">Theorists & Writers</h3>
          <ul className="space-y-3">
            {references.theorists.map((theorist) => (
              <li key={theorist.name} className="flex items-start gap-2">
                <span className="text-[var(--color-ref-green)] mt-0.5">→</span>
                <div>
                  <span className="font-bold text-[var(--color-text-main)]">{theorist.name}</span>
                  {' — '}
                  {theorist.works.map((work, i) => (
                    <span key={work.title}>
                      {i > 0 && ' Also: '}
                      <a href={work.url} target="_blank" rel="noopener noreferrer" className="ref-link">
                        <em>{work.title}</em>
                      </a>
                      {' (' + work.year + ')'}
                    </span>
                  ))}
                  <p className="text-[#aaa] text-sm mt-1">{theorist.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Archives */}
          <h3 className="text-lg font-bold text-[var(--color-link-pink)] mt-8 mb-3">Archives & Festivals</h3>
          <ul className="space-y-3">
            {references.archives.map((archive) => (
              <li key={archive.name} className="flex items-start gap-2">
                <span className="text-[var(--color-ref-green)] mt-0.5">→</span>
                <div>
                  <a href={archive.url} target="_blank" rel="noopener noreferrer" className="ref-link font-bold">
                    {archive.name}
                  </a>
                  {' — '}
                  <span className="text-[#aaa]">{archive.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Download standalone HTML link */}
        <div className="text-center mt-6 mb-8">
          <a
            href="/queering-the-game.html"
            download
            className="inline-block bg-[#2a2a2a] border border-[#555] text-[var(--color-link-pink)] px-6 py-3 rounded-md font-bold font-mono hover:bg-[#333] hover:text-[var(--color-link-hover)] transition-colors"
          >
            ⬇ Download Standalone Editable HTML
          </a>
        </div>
      </div>
    </div>
  );
}
