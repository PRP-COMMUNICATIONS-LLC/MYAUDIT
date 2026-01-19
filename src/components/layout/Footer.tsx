import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 py-10 border-t border-slate-800 px-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-widest uppercase">RPR COMMUNICATIONS</span>
                    <p className="text-[9px] text-slate-600 tracking-[0.5em] uppercase mt-1">Sovereign Identity Substrate // Build 2026.01.15</p>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">© 2026 RPR Communications, LLC. Delaware, USA.</p>
                    <p className="text-[9px] uppercase font-bold text-cyan-400 mt-1 tracking-widest">Sovereign Logic Integrator v2.2 // Malaysia Active</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;