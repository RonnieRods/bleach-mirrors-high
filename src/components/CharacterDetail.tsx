import React from "react";
import characterData from '../data/characters.json';
import type { Character } from "../types/game";

const characters = characterData as Character[];

interface CharacterDetailProps {
    characterId: string;
    onBack: () => void;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({ characterId, onBack }) => {
    const character = characters.find(c => c.id === characterId);

    if (!character) {
        return (
            <div className="p-6 bg-gameVoid text-center border border-slate-800 rounded-xl">
                <p className="text-rose-400 font-mono">// ERROR: DATABANK_RECORD_CORRUPTED</p>
                <button onClick={onBack} className="mt-4 text-xs font-mono text-gameCyan hover:underline">&larr; RETURN_TO_REGISTRY</button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Back Button Action Bar */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                <button onClick={onBack} className="text-xs cursor-pointer font-mono text-gameCyan hover:text-white transition-colors flex items-center gap-1">
                    &larr; [RETURN_TO_REGISTRY]
                </button>
                <span className="text-[10px] font-mono text-slate-500 tracking-wider">// RECORD_ID: {character.id.toUpperCase()}</span>
            </div>

            {/* Main Profile Header Card */}
            <div className="p-6 bg-gameVoid/90 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="w-28 h-28 bg-gameSlate border-2 border-slate-700 rounded-xl overflow-hidden shadow-xl mx-auto md:mx-0">
                    <img src={character.avatarUrl} alt={character.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-3 space-y-2 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className={`px-2 py-0.5 text-xs font-mono border rounded ${
                            character.rarity === 'SSR' ? 'border-gameOrange text-gameOrange bg-gameOrange/10' : 'border-gameCyan text-gameCyan bg-gameCyan/10'
                        }`}>
                            {character.rarity}
                        </span>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest bg-gameSlate px-2 py-0.5 rounded border border-slate-800">
                            {character.element} ATTRIBUTE
                        </span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-wide">{character.name}</h2>
                    <p className="text-sm text-gameCyan font-mono italic">{character.title}</p>
                    <p className="text-xs text-slate-400">Designed Combat Core Position: <span className="text-slate-200 font-bold uppercase">{character.role}</span></p>
                </div>
            </div>

            {/* Arts Deck Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Arts Deck Node Panel */}
                <div className="p-5 bg-gameSlate/40 border border-slate-800 rounded-xl space-y-4">
                    <h3 className="text-xs font-mono text-slate-400 tracking-wider">// COMBAT_ARTS_DECK_PROFILES</h3>
                    <div className="space-y-3">
                        {character.artsDeck.map((art) => (
                            <div key={art.id} className="p-3 bg-gameVoid/70 border border-slate-800/80 rounded-lg space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-200">{art.name}</span>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-[10px] font-mono text-slate-500">COST: <span className="text-gameOrange">{art.cost}</span></span>
                                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                                            art.type === 'Attack' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                            art.type === 'Tech' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                            {art.type.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-sans">{art.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Soul Drive Mechanical Target Links */}
                <div className="p-5 bg-gameSlate/40 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono text-slate-400 tracking-wider">// SOUL_DRIVE_MATRIX_SYNCHRONIZATION</h3>

                        <div className="p-4 bg-gameOrange/5 border border-gameOrange/20 rounded-xl space-y-3">
                            <div>
                                <span className="text-[10px] font-mono text-gameOrange tracking-widest block uppercase">// CRITICAL_FINISHER_IDENTIFIER</span>
                                <span className="text-base font-black text-white block mt-0.5 tracking-wide">{character.soulDriveLinks.comboFinisher}</span>
                            </div>

                            <div>
                                <span className="text-[10px] font-mono text-slate-500 tracking-widest block uppercase">// REQUIRED_CHAIN_INPUT_SEQUENCE</span>
                                <div className="flex gap-1.5 items-center mt-1">
                                    {character.soulDriveLinks.requiredArtsChain.map((card, i) => (
                                        <React.Fragment key={i}>
                                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                                                card === 'Attack' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                card === 'Tech' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            }`}>
                                                {card.toUpperCase()}
                                            </span>
                                            {i < character.soulDriveLinks.requiredArtsChain.length - 1 && <span className="text-slate-700 text-xs font-mono">&gt;</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gameVoid/60 border border-slate-800 p-3.5 rounded-lg text-xs text-slate-400 space-y-1">
                        <span className="font-mono text-[10px] text-slate-500 tracking-widest block">// COMPATIBLE_LINK_PARTNERS</span>
                        <p>This unit launches its terminal matrix drive if deployed alongside character keys: <span className="text-gameCyan font-mono">{character.soulDriveLinks.triggersOn.join(', ')}</span></p>
                    </div>
                </div>

            </div>
        </div>
    )
}