import type { GameRarity, GameElement } from "../types/game";

// STAR RARITY CARD DESIGN THEMES
export const getRarityStyles = (rarity: GameRarity): string => {
    switch (rarity) {
        case 4: // High-end Red to Blue shifting visual style gradient frame
            return 'border-transparent text-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient text-shadow shadow-[0_0_15px_rgba(239,68,68,0.25)] font-black';
        case 3:
            return 'border-amber-400 text-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.15)] font-bold';
        case 2:
            return 'border-slate-300 text-slate-200 bg-slate-400/10 font-medium';
        case 1:
        default:
            return 'border-amber-700 text-amber-600 bg-amber-900/10 font-normal'
    }
};

export const getRarityLabel = (rarity: GameRarity): string => {
    return '★'.repeat(rarity);
};

// ELEMENTAL COLOR MAPS
export const getElementStyles = (element: GameElement): string => {
    const mapping: Record<GameElement, string> = {
        Red: 'text-red-400 border-red-500/30 bg-red-950/20',
        Orange: 'text-orange-400 border-orange-500/30 bg-orange-950/20',
        Yellow: 'text-amber-300 border-amber-400/30 bg-amber-950/20',
        Green: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
        Cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
        Blue: 'text-blue-400 border-blue-500/30 bg-blue-950/20',
        Violet: 'text-purple-400 border-purple-500/30 bg-purple-950/20',
        Gray: 'text-slate-400 border-slate-500/30 bg-slate-900/40'
    };
    return mapping[element] || mapping['Gray'];
}