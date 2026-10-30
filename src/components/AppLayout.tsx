import React, { useState } from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className='min-h-screen bg-gameVoid text-slate-100 font-sans relative overflow-x-hidden selection:bg-gameCyan selection:text-gameVoid'>
            {/* Background Cyber-Grid Overlay */}
            <div className='absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px), linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none' />
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-gameCyan/5 to-transparent blur-[120px] pointer-events-none' />

            {/* Global Navigation Header */}
            <header className='sticky top-0 z-50 w-full border-b border-slate-800/60 bg-gameVoid/80 backdrop-blur-md'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
                    {/* Logo Brand Area */}
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-gradient-to-tr from-gameOrange to-gameCyan rotate-45 flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.3)]'>
                            <span className='text-gameVoid font-black text-sm -rotate-45'>MH</span>
                        </div>
                        <div>
                            <span className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">MIRRORS HIGH</span>
                            <span className="text-xs block text-gameCyan font-mono tracking-widest uppercase">Companion Hub</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 font-mono text-sm tracking-wide">
                        <a href="#roster" className='px-4 py-2 text-slate-300 hover:text-gameCyan transition-colors relative group'>
                            // ROSTER
                            <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gameCyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </a>
                        <a href="#combo-builder" className='px-4 py-2 text-slate-300 hover:text-gameCyan transition-colors relative group'>
                            // SOUL_DRIVE
                            <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gameCyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </a>
                        <a href="#pity-tracker" className='px-4 py-2 text-slate-300 hover:text-gameOrange transition-colors relative group'>
                            // GACHA_CALC
                            <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gameOrange scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </a>
                    </nav>

                    {/* Action Button */}
                    <div className="hidden md:flex items-center">
                        <button className="px-4 py-1.5 bg-gameSlate border border-gameCyan/40 text-gameCyan text-xs font-mono rounded hover:bg-gameCyan hover:text-gameVoid transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                            BETA_MODE v0.4
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='md:hidden p-2 text-slate-400 hover:text-white focus:outline-none'
                        >
                        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            {isMobileMenuOpen ? (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            ) : (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Drawer */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gameSlate/95 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 font-mono text-sm">
                        <a href="#roster" onClick={() => setIsMobileMenuOpen(false)} className='block px-3 py-2.5 rounded text-slate-300 hover:bg-gameVoid hover:text-gameCyan'>// ROSTER</a>
                        <a href="#combo-builder" onClick={() => setIsMobileMenuOpen(false)} className='block px-3 py-2.5 rounded text-slate-300 hover:bg-gameVoid hover:text-gameCyan'>// SOUL_DRIVE</a>
                        <a href="#pity-tracker" onClick={() => setIsMobileMenuOpen(false)} className='block px-3 py-2.5 rounded text-slate-300 hover:bg-gameVoid hover:text-gameOrange'>// GACHA_CALC</a>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 min-h-[calc(100vh-10rem)]">
                <div className="border border-slate-800/80 bg-gameSlate/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl relative overflow-hidden">
                    {/* Subtle Cybernetic Edge Details */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gameCyan" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gameCyan" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gameCyan" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gameCyan" />

                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-slate-900 bg-gameVoid mt-auto py-6 font-mono text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        &copy; {new Date().getFullYear()} Mirrors High Hub. Built for fans by a beta player.
                    </div>
                    <div className="text-center sm:text-right text-slate-600 max-w-md">
                        This website is an unofficial game guide and is not affiliated with KLab, Bandai Namco, Pierrot Studios, or Tite Kubo.
                    </div>
                </div>
            </footer>
        </div>
    )
}