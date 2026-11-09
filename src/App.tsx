import { useState, useCallback, useEffect } from 'react';
import {
  passages,
  initialGameState,
  getEffectivePassageId,
  type GameState,
} from './data/passages';

function GlitchHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="animate-glitch text-[var(--color-glitch-red)] font-bold">
      {children}
    </h2>
  );
}

function MetricsBar({ state }: { state: GameState }) {
  const metrics = [
    { label: 'Observe', value: state.observe, color: 'bg-pink-500' },
    { label: 'Feel', value: state.feel, color: 'bg-purple-500' },
    { label: 'Hack', value: state.hack, color: 'bg-red-500' },
    { label: 'Co-create', value: state.cocreate, color: 'bg-cyan-500' },
  ];

  return (
    <div className="mt-8 pt-4 border-t border-[var(--color-border-dark)]">
      <p className="text-sm text-[var(--color-text-muted)] mb-3">
        <strong className="text-[var(--color-text-main)]">Journey Metrics:</strong>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-1">
            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
              {m.label}
            </span>
            <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className={`h-full ${m.color} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(100, m.value * 20)}%` }}
              />
            </div>
            <span className="text-sm font-bold text-[var(--color-text-main)]">
              {m.value}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--color-text-muted)] mt-3">
        Glitches Encountered: {state.glitchesSeen.length}
      </p>
    </div>
  );
}

function ChoiceButton({
  text,
  onClick,
  index,
}: {
  text: string;
  onClick: () => void;
  index: number;
}) {
  return (
    <li
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100 + 200}ms`, opacity: 0 }}
    >
      <button
        onClick={onClick}
        className="text-left w-full text-[var(--color-link-pink)] font-bold text-lg
                   hover:text-[var(--color-link-hover)] hover:underline
                   transition-colors duration-200 py-2 group cursor-pointer"
      >
        <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
          &gt; {text}
        </span>
      </button>
    </li>
  );
}

function ScanlineOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.03]">
      <div
        className="w-full h-[2px] bg-white"
        style={{ animation: 'scanline 4s linear infinite' }}
      />
    </div>
  );
}

export default function App() {
  const [state, setState] = useState<GameState>(initialGameState);
  const [renderKey, setRenderKey] = useState(0);

  const navigateTo = useCallback(
    (targetId: string) => {
      setState((prevState) => {
        // Reset state on restart
        if (targetId === 'Start') {
          return { ...initialGameState };
        }

        // Check for rhizomatic interruptions
        const effectiveId = getEffectivePassageId(targetId, prevState);
        const passage = passages[effectiveId];

        // Apply onEnter effects
        let newState = prevState;
        if (passage.onEnter) {
          newState = passage.onEnter(prevState);
        }

        return { ...newState, currentPassage: effectiveId };
      });
      setRenderKey((k) => k + 1);
    },
    []
  );

  const currentPassage = passages[state.currentPassage];

  // Parse HTML text into React elements
  const renderPassageText = (html: string) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [renderKey]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <ScanlineOverlay />
      <div
        key={renderKey}
        className="max-w-3xl w-full p-6 sm:p-8 md:p-10 bg-[var(--color-bg-card)] rounded-lg shadow-2xl animate-fade-in"
      >
        <div className="passage-content">
          {currentPassage.isGlitch ? (
            <div className="animate-glitch">
              {renderPassageText(currentPassage.text)}
            </div>
          ) : (
            renderPassageText(currentPassage.text)
          )}
        </div>

        {currentPassage.choices.length > 0 && (
          <ul className="mt-6 space-y-1">
            {currentPassage.choices.map((choice, idx) => (
              <ChoiceButton
                key={`${state.currentPassage}-${idx}`}
                text={choice.text}
                onClick={() => navigateTo(choice.target)}
                index={idx}
              />
            ))}
          </ul>
        )}

        <MetricsBar state={state} />
      </div>
    </div>
  );
}
