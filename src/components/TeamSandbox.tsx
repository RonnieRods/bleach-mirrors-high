import React from "react";
import type { Character } from '../types/game';

interface TeamSandboxProps {
  selectedTeam: Character[];
  onRemoveCharacter: (id: string) => void;
}

export const TeamSandbox: React.FC<TeamSandboxProps> = ({
  selectedTeam,
  onRemoveCharacter,
}) => {
  
  // DIRECT CHARACTER MATCHING: Instantly checks if any characters share a synergy link
  const getActiveSoulDriveCombos = () => {
    if (selectedTeam.length < 2) return [];

    const activeIds = selectedTeam.map(char => char.id);
    const discoveredCombos: Character[] = [];

    for (const char of selectedTeam) {
      const hasPartner = char.soulDriveLinks.triggersOn.some(partnerId => activeIds.includes(partnerId));
      if (hasPartner) {
        discoveredCombos.push(char);
      }
    }
    
    return discoveredCombos;
  };

  const activeCombos = getActiveSoulDriveCombos();
  const primaryCombo = activeCombos[0]; // Primary display for the right banner panel

  return (
    <div className="space-y-4">
      {/* Main Core Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5 bg-gameVoid/80 border border-slate-800 rounded-xl">
        
        {/* LEFT AREA: Squad Frame Slots */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-mono text-slate-400 tracking-wider">// ACTIVE_TACTICAL_SQUAD (MAX 3)</h3>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((index) => {
              const member = selectedTeam[index];
              return (
                <div 
                  key={index} 
                  className={`h-28 rounded-lg border relative flex flex-col items-center justify-center p-3 transition-all ${
                    member 
                      ? 'bg-gameSlate border-slate-700/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]' 
                      : 'bg-gameSlate/20 border-dashed border-slate-800 text-slate-600'
                  }`}
                >
                  {member ? (
                    <>
                      <button 
                        onClick={() => onRemoveCharacter(member.id)}
                        className="absolute top-1.5 right-1.5 text-slate-500 hover:text-rose-400 font-mono text-[10px] transition-colors"
                      >
                        [X]
                      </button>
                      <div className="w-10 h-10 bg-gameVoid rounded-md border border-slate-700 overflow-hidden mb-1">
                        <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold text-slate-200 truncate w-full text-center">{member.name.split(' ')[0]}</span>
                      <span className="text-[9px] font-mono text-gameCyan mt-0.5 uppercase tracking-tight">{member.role}</span>
                    </>
                  ) : (
                    <span className="text-[10px] font-mono tracking-widest text-slate-600">EMPTY_SLOT</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT AREA: Immediate State Display Panel */}
        <div className="bg-gameSlate/50 border border-slate-800/80 rounded-lg p-4 flex flex-col justify-center min-h-[120px]">
          {primaryCombo ? (
            <div className="bg-gameOrange/10 border border-gameOrange rounded p-4 text-center shadow-[0_0_20px_rgba(255,107,0,0.15)] animate-pulse">
              <p className="text-[10px] font-mono text-gameOrange tracking-widest font-black uppercase">// SOUL_DRIVE_CONNECTED!</p>
              <h4 className="text-base font-black text-white mt-1.5 tracking-wide">{primaryCombo.soulDriveLinks.comboFinisher}</h4>
              <p className="text-xs text-slate-400 mt-1 font-sans">Synergy engine successfully online.</p>
            </div>
          ) : (
            <div className="bg-gameVoid/40 border border-slate-800/80 rounded p-4 text-center py-8">
              <span className="text-[10px] font-mono text-slate-600 tracking-wider block">// NO_LINKS_RESOLVED</span>
              <span className="text-[11px] text-slate-500 font-sans block mt-1">Deploy cross-compatible heroes to link systems.</span>
            </div>
          )}
        </div>
      </div>

      {/* DYNAMIC SUB-PANEL: Appears directly below the squad grid when pairs match */}
      {activeCombos.length > 0 && (
        <div className="p-4 bg-gameSlate/30 border border-slate-800/60 rounded-lg space-y-2.5 animate-fadeIn">
          <p className="text-[10px] font-mono text-slate-400 tracking-wider">// SYSTEM_COMPILATION: REQUIRED_ARTS_CHAIN_BLUEPRINTS</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {activeCombos.map((char) => (
              <div key={char.id} className="bg-gameVoid/60 border border-slate-800 p-3 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{char.name}</span>
                  <span className="text-[11px] text-gameOrange font-mono italic block mt-0.5">{char.soulDriveLinks.comboFinisher}</span>
                </div>
                {/* Visual Sequence Badges */}
                <div className="flex gap-1.5 items-center">
                  {char.soulDriveLinks.requiredArtsChain.map((card, i) => (
                    <React.Fragment key={i}>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-black border ${
                        card === 'Attack' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                        card === 'Tech' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {card.substring(0, 4).toUpperCase()}
                      </span>
                      {i < char.soulDriveLinks.requiredArtsChain.length - 1 && (
                        <span className="text-slate-700 font-mono text-xs">&gt;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};