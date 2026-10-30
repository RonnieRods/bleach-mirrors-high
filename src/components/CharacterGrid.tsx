import React, { useState } from 'react';
import characterData from '../data/characters.json';
import type { Character, GameRarity, GameElement } from '../types/game';
import { getRarityStyles, getRarityLabel, getElementStyles } from '../utils/styleHelpers';

// Explicitly cast the raw JSON import to our clean TypeScript definition
const characters = characterData as Character[];

// Tell TypeScript that this component receives the deploy function
interface CharacterGridProps {
    onDeployCharacter?: (character: Character) => void;
    onViewDetails: (id: string) => void;
    isSandboxMode?: boolean; // Toggles whether the deployment button shows up
}

// Destructure the function inside the component definition argument
export const CharacterGrid: React.FC<CharacterGridProps> = ({ 
    onDeployCharacter,
    onViewDetails,
    isSandboxMode = false
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRarity, setSelectedRarity] = useState<GameRarity | 'ALL'>('ALL');
    const [selectedElement, setSelectedElement] = useState<GameElement | 'ALL'>('ALL');

    // Multi-tier filtering engine
    const filteredCharacters = characters.filter((char) => {
        const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              char.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRarity = selectedRarity === 'ALL' || char.rarity === selectedRarity;
        const matchesElement = selectedElement === 'ALL' || char.element === selectedElement;

        return matchesSearch && matchesRarity && matchesElement;
    });

    return (
        <div className="space-y-6">
            {/* Filtering Control Panel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gameVoid/60 rounded-lg border border-slate-800/80">
                
                {/* Real-time Search Input */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="" className="text-xs font-mono text-slate-400 tracking-wider">// ACCESS_NAME</label>
                    <input 
                        type="text" 
                        placeholder='Search characters or positions...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full px-3 py-2 bg-gameSlate border border-slate-700/60 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gameCyan transition-colors font-sans text-sm'
                    />
                </div>

                {/* Rarity Select Toggles */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="" className="text-xs font-mono text-slate-400 tracking-wider">// RARITY_FILTER</label>
                    <div className="grid grid-cols-3 gap-1 bg-gameSlate p-1 border border-slate-700/60 rounded">
                        {(['ALL', 4, 3, 2, 1] as const).map((rarity) => (
                            <button
                                key={rarity}
                                onClick={() => setSelectedRarity(rarity)}
                                className={`py-1 text-xs font-mono rounded transition-all ${
                                    selectedRarity === rarity ? 'bg-slate-200 text-gameVoid font-bold' : 'text-slate-400'
                                }`}
                            >
                                {rarity === 'ALL' ? 'ALL' : `${rarity}★`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Element Filter Toggles */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="" className="text-xs font-mono text-slate-400 tracking-wider">// ATTRIBUTE_NODE</label>
                    <select 
                        name="" 
                        id=""
                        value={selectedElement}
                        onChange={(e) => setSelectedElement(e.target.value as GameElement | 'ALL')}
                        className='w-full px-3 py-2 bg-gameSlate border border-slate-700/60 rounded text-slate-300 focus:outline-none focus:border-gameCyan transition-colors font-mono text-sm'
                    >
                        <option value="ALL">ALL ELEMENTS</option>
                        <option value="Power">POWER</option>
                        <option value="Control">CONTROL</option>
                        <option value="Speed">SPEED</option>
                        <option value="Spirit">SPIRIT</option>
                    </select>
                </div>

            </div>

            {/* Roster Character Output Display */}
            {filteredCharacters.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg">
                    <p className="text-sm font-mono text-slate-500">// ERROR: NO_RECORDS_FOUND_IN_SYSTEM_INDEX</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredCharacters.map((char) => (
                        <div 
                            key={char.id}
                            className="bg-gameSlate border border-slate-800 rounded-lg overflow-hidden group hover:border-slate-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Card Thumbnail Area */}
                            <div 
                                onClick={() => onViewDetails(char.id)}
                                className="p-4 flex gap-4 items-start border-b border-slate-800/50"
                            >
                                <div className="w-14 h-14 bg-gameVoid rounded overflow-hidden flex-shrink-0 relative border border-slate-700">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gameVoid to-transparent opacity-40" />
                                    <img src={char.avatarUrl} alt={char.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform' />
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`text-[10px] px-1.5 font-mono border rounded ${getRarityStyles(char.rarity)}`}>
                                            {getRarityLabel(char.rarity)}
                                        </span>
                                        <span className={`text-[10px] px-1.5 font-mono tracking-wider uppercase ${getElementStyles(char.element)}`}>
                                            {char.element}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-100 text-sm truncate">{char.name}</h3>
                                    <p className="text-xs text-slate-400 tracking-wide font-sans truncate">{char.title}</p>
                                </div>
                            </div>

                            {/* Arts Deck Information Block */}
                            <div className="p-4 space-y-2 flex-grow bg-gameVoid/20">
                                <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">// INVENTORY DECK</div>
                                <div className="space-y-1.5">
                                    {char.artsDeck.map((art) => (
                                        <div key={art.id} className="flex items-center justify-between text-xs bg-gameVoid/50 px-2 py-1 rounded border border-slate-800/60">
                                            <span className="text-slate-300 font-sans truncate pr-2">{art.name}</span>
                                            <span className={`text-[9px] font-mono px-1 rounded-sm ${
                                                art.type === 'Attack' ? 'text-rose-400 bg-rose-950/40' :
                                                art.type === 'Tech' ? 'text-amber-400 bg-amber-950/40' : 'text-emerald-400 bg-emerald-950/40'
                                            }`}>
                                                {art.type.toUpperCase()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Interaction Call to Action Footer */}
                            <div className="p-3 bg-gameVoid/50 border-t border-slate-800/60 flex justify-between items-center text-[10px] font-mono text-slate-500">
                                <button 
                                    onClick={() => onViewDetails(char.id)}
                                    className="text-[10px] font-mono text-slate-400 hover:text-white transition-colors"
                                >
                                    [VIEW_PROFILE]
                                </button>
                                <span>ROLE: <span className="text-slate-300">{char.role.toUpperCase()}</span></span>

                                {/* Bind the prop function to onClick, passing the current Loop character */}
                                {isSandboxMode && onDeployCharacter && (
                                    <button 
                                        onClick={() => onDeployCharacter(char)}
                                        className="text-gameCyan hover:text-white transition-colors"
                                    >
                                        [DEPLOY_HERO] &rarr;
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};