import React, { useState } from "react";

export const GachaTracker: React.FC = () => {
    // Input form states
    const [currentCrystals, setCurrentCrystals] = useState<number>(0);
    const [currentTickets, setCurrentTickets] = useState<number>(0);
    const [currentPity, setCurrentPity] = useState<number>(0);
    const [dailyIncome, setDailyIncome] = useState<number>(150); // Default base daily earnings

    // Standard static economy configurations based on beta benchmarks
    const CRYSTALS_PER_SUMMON = 150;
    const TOTAL_PITY_THRESHOLD = 200;

    // Calculation Math Engine
    const totalSummonsAvailable = Math.floor(currentCrystals / CRYSTALS_PER_SUMMON) + currentTickets;
    const summonsRemainingToPity = Math.max(0, TOTAL_PITY_THRESHOLD - currentPity);

    const balanceDeficitSummons = Math.max(0, summonsRemainingToPity - totalSummonsAvailable);
    const totalCrystalsNeeded = balanceDeficitSummons * CRYSTALS_PER_SUMMON;

    const daysRequired = dailyIncome > 0 ? Math.ceil(totalCrystalsNeeded / dailyIncome) : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5 bg-gameVoid/80 border border-slate-800 rounded-xl">

            {/* LEFT SECTION: Data Input Forms */}
            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xs font-mono text-slate-400 tracking-wider">// QUANTUM_RESOURCE_INPUT</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Crystals Input */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="" className="text-xs font-mono text-slate-400 tracking-wide">SOUL CRYSTALS</label>
                        <input 
                            type="number" 
                            min="0"
                            value={currentCrystals || ''}
                            placeholder="e.g. 4500"
                            onChange={(e) => setCurrentCrystals(Math.max(0, parseInt(e.target.value) || 0))}
                            className="px-3 py-2 bg-gameSlate border border-slate-700/60 rounded text-slate-100 placeholder-slate-600 focus:outline-none focus:border-gameOrange transition-colors font-mono text-sm"
                        />
                    </div>

                    {/* Tickets Input */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="" className="text-xs font-mono text-slate-400 tracking-wide">SUMMON TICKETS</label>
                        <input 
                            type="number" 
                            min="0"
                            value={currentTickets || ''}
                            placeholder="e.g. 15"
                            onChange={(e) => setCurrentTickets(Math.max(0, parseInt(e.target.value) || 0))}
                            className="px-3 py-2 bg-gameSlate border border-slate-700/60 rounded text-slate-100 placeholder-slate-600 focus:outline-none focus:border-gameOrange transition-colors font-mono text-sm"
                        />
                    </div>

                    {/* Current Banner Pity Counter */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="" className="text-xs font-mono text-slate-400 tracking-wide">CURRENT PITY COUNT</label>
                        <input 
                            type="number" 
                            min="0"
                            max="300"
                            value={currentPity || ''}
                            placeholder="e.g. 100"
                            onChange={(e) => setCurrentPity(Math.max(0, parseInt(e.target.value) || 0))}
                            className="px-3 py-2 bg-gameSlate border border-slate-700/60 rounded text-slate-100 placeholder-slate-600 focus:outline-none focus:border-gameOrange transition-colors font-mono text-sm"
                        />
                    </div>

                    {/* Estimated Daily Income */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="" className="text-xs font-mono text-slate-400 tracking-wide">DAILY CRYSTAL INCOME</label>
                        <input 
                            type="number"
                            min="1"
                            value={dailyIncome || ''}
                            placeholder="Default base: 150"
                            onChange={(e) => setDailyIncome(Math.max(1, parseInt(e.target.value) || 0))}
                            className="px-3 py-2 bg-gameSlate border border-slate-700/60 rounded text-slate-100 placeholder-slate-600 focus:outline-none focus:border-gameOrange transition-colors font-mono text-sm"
                        />
                    </div>
                </div>

                {/* Benchmarks Quick-Read Overlay */}
                <div className="pt-2 flex gap-4 text-[10px] font-mono text-slate-500">
                    <span>// EXCHANGE RATE: <span className="text-slate-300">1 SUMMON = {CRYSTALS_PER_SUMMON} CRYSTALS</span></span>
                    <span>// ASSUAGED PITY CAP: <span className="text-slate-300">{TOTAL_PITY_THRESHOLD} SUMMONS</span></span>
                </div>
            </div>

            {/* RIGHT SECTION: Real-Time Engine Projections */}
            <div className="bg-gameSlate/50 border border-slate-800/80 rounded-lg p-4 flex flex-col justify-between min-h-[220px]">
                <div>
                    <span className="text-sm font-mono text-slate-400 tracking-wider block mb-3">MATRIX_EVALUATION</span>

                    <div className="space-y-2.5">
                        {/* Net Summonable Pulls */}
                        <div className="flex justify-between items-center text-xs border-b border-slate-800/60 pb-1.5">
                            <span className="text-slate-400 font-sans">Liquid Summons Ready:</span>
                            <span className="font-mono text-gameCyan font-bold">{totalSummonsAvailable} Pulls</span>
                        </div>

                        {/* Pity Step Count Remaining */}
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-sans">Summoning Deficit:</span>
                            <span className={`font-mono font-bold ${balanceDeficitSummons > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                {balanceDeficitSummons > 0 ? `-${balanceDeficitSummons} Pulls` : 'SECURED'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* DYNAMIC RESULTS BANNER FRAME */}
                <div className="mt-4 pt-3 border-t border-slate-800/60">
                    {balanceDeficitSummons > 0 ? (
                        <div className="bg-gameOrange/10 border border-gameOrange/40 rounded p-3 text-left">
                            <p className="text-[10px] font-mono text-gameOrange tracking-widest font-black uppercase">// PITY_DEFICIT_INDEXED</p>
                            <h4 className="text-sm font-bold text-slate-200 mt-1">
                                Need <span className="text-gameOrange font-mono">{totalCrystalsNeeded.toLocaleString()}</span> more Crystals
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                                Achievable in approximately <span className="text-white font-mono font-bold">{daysRequired} days</span> of optimal routine clearing.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded p-3 text-center shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                            <p className="text-[10px] font-mono text-emerald-400 tracking-widest font-black uppercase">// TARGET_GAP_ACQUIRED</p>
                            <h4 className="text-sm font-bold text-white mt-1">200-Summon Guarantee Met!</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-sans">Your stockpiles comfortably insulate full safety tracking.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}