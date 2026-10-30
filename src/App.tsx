import { useState, useEffect } from 'react';
import { AppLayout } from "./components/AppLayout"
import { CharacterGrid } from "./components/CharacterGrid"
import { TeamSandbox } from './components/TeamSandbox';
import { GachaTracker } from './components/GachaTracker';
import { CharacterDetail } from './components/CharacterDetail';
import type { Character } from './types/game';
import characterData from './data/characters.json';

const characters = characterData as Character[];
type ActivePage = 'sandbox' | 'roster' | 'details';

// Define a safe cache key name for local storage lookup
const SQUAD_CACHE_KEY = 'mirrors_high_sandbox_squad';

function App() {
  const [currentView, setCurrentView] = useState<ActivePage>('sandbox');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

  // Read from localStorage on mount to reconstruct the team
  const [selectedTeam, setSelectedTeam] = useState<Character[]>(() => {
    try {
      const cachedIdsJson = localStorage.getItem(SQUAD_CACHE_KEY);
      if (cachedIdsJson) {
        const cachedIds: string[] = JSON.parse(cachedIdsJson);
        // Map cached IDs back to full static character references from the data registry
        return cachedIds
          .map(id => characters.find(char => char.id === id))
          .filter((char): char is Character => !!char); // Filter out any undefined mismatches
      }
    } catch (error) {
      console.error("// ERROR: LOCAL_STORAGE_CACHE_READ_FAILURE", error);
    }
    return []; // Fallback to empty squad array if no cache exists
  });

  // Watch selectedTeam array and update cache on any alteration
  useEffect(() => {
    try {
      const idsToCache = selectedTeam.map(char => char.id);
      localStorage.setItem(SQUAD_CACHE_KEY, JSON.stringify(idsToCache));
    } catch (error) {
      console.error("// ERROR: LOCAL_STORAGE_CACHE_WRITE_FAILURE", error);
    }
  }, [selectedTeam]);

  // State mutator functions
  const handleAddCharacter = (character: Character) => {
    if (selectedTeam.some((c) => c.id === character.id)) return;
    if (selectedTeam.length >= 3) return;
    setSelectedTeam([...selectedTeam, character]);
  };

  const handleRemoveCharacter = (id: string) => {
    setSelectedTeam(selectedTeam.filter((c) => c.id !== id));
  };

  const handleNavigateToDetails = (id: string) => {
    setSelectedCharacterId(id);
    setCurrentView('details');
  }

  return (
    <AppLayout>
      {/* GLOBAL SYSTEM TAB SELECTION HEADER */}
      <div className="flex gap-4 border-b border-slate-800 pb-3 mb-6">
        <button 
          onClick={() => setCurrentView('sandbox')}
          className={`text-xs font-mono tracking-widest transition-all px-3 py-1 rounded ${
            currentView === 'sandbox' ? 'bg-gameOrange text-gameVoid font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          // SIMULATOR_SANDBOX
        </button>
        <button
          onClick={() => setCurrentView('roster')} 
          className={`text-xs font-mono tracking-widest transition-all px-3 py-1 rounded ${
            currentView === 'roster' ? 'bg-gameOrange text-gameVoid font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          // STANDALONE_ROSTER_INDEX
        </button>
      </div>

      {/* TAB ROW A: Tactical Compositions */}
      <div className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white mb-4">
          Unleash the <span className="text-gameCyan">Soul Drive</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto font-sans">
          Welcome to your ultimate tactical database. Plan team compositions, look up beta-tested card interactions, and track your summon pity projections.
        </p>
      </div>

      {/* VIEW DECODER ENGINE */}
      {currentView === 'sandbox' && (
        <div className="space-y-12">
          <div>
            <div className="mb-4">
              <h1 className="text-xl font-bold tracking-wider text-white font-mono uppercase">// SQUAD_LINK_SIMULATOR</h1>
            </div>
            <TeamSandbox selectedTeam={selectedTeam} onRemoveCharacter={handleRemoveCharacter} />
          </div>

          <div>
            <div className="mb-4">
              <p className="text-xs font-mono text-slate-400 tracking-wider">// DEPLOY_TEAM_UNITS_FROM_SANDBOX_CATALOG</p>
            </div>
            <CharacterGrid
              onDeployCharacter={handleAddCharacter}
              onViewDetails={handleNavigateToDetails}
              isSandboxMode={true}
            />
          </div>

          <div>
            <div className="mb-4">
              <h1 className="text-xl font-bold tracking-wider text-white font-mono uppercase">// RESERVE_PROJECTIONS</h1>
            </div>
            <GachaTracker />
          </div>
        </div>
      )}

      {currentView === 'roster' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black text-white font-mono uppercase">CHARACTER_DATABANK_INDEX</h1>
            <p className="text-xs text-slate-400 mt-1">Review static profiling and mechanics records independently from testing environments.</p>
          </div>
          <CharacterGrid
            onViewDetails={handleNavigateToDetails}
            isSandboxMode={false}
          />
        </div>
      )}

      {currentView === 'details' && selectedCharacterId && (
        <CharacterDetail
          characterId={selectedCharacterId}
          onBack={() => setCurrentView(selectedCharacterId ? 'sandbox' : 'roster')} // Smart routing fallback
          // Alternately, force back to roster catalog index directly:
          // onBack={() => setCurrentView('roster')}
        />
      )}
    </AppLayout>
  )
}

export default App;
