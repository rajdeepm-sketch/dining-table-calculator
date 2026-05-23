/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Square, 
  Circle, 
  Tally4, 
  Settings2, 
  Maximize2, 
  Check, 
  Share2, 
  Printer, 
  ShoppingBag,
  Info,
  AlertTriangle,
  ArrowRight,
  Armchair
} from 'lucide-react';
import { CalculatorState, Unit, TableShape, ComfortLevel } from '../../types';
import { calculateResults } from '../../lib/calculator-logic';
import { RoomVisualization } from './RoomVisualization';

const SHAPES: { id: TableShape; name: string; icon: any; desc: string }[] = [
  { id: 'rectangle', name: 'Rectangle', icon: Square, desc: 'Classic choice for larger rooms and families.' },
  { id: 'round', name: 'Round', icon: Circle, desc: 'Ideal for small spaces and better conversation.' },
  { id: 'oval', name: 'Oval', icon: Circle, desc: 'Soft edges with the capacity of a rectangle.' },
  { id: 'square', name: 'Square', icon: Square, desc: 'Great for intimate 2-4 person dining in small rooms.' },
];

const COMFORT_LEVELS: { id: ComfortLevel; name: string; clearance: string }[] = [
  { id: 'compact', name: 'Compact', clearance: '30"' },
  { id: 'comfortable', name: 'Comfortable', clearance: '36"' },
  { id: 'luxury', name: 'Luxury', clearance: '48"' },
];

export function CalculatorContainer() {
  const [state, setState] = useState<CalculatorState>({
    roomDimensions: { length: 144, width: 144, unit: 'in' },
    shape: 'rectangle',
    seatingRequirement: 6,
    comfortLevel: 'comfortable',
    advanced: {
      chairWidth: 20,
      hasExpandableOption: false,
      hasBenchSeating: false,
      hasSideboard: false,
    }
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const results = useMemo(() => calculateResults(state), [state]);


  const updateRoom = (key: 'length' | 'width' | 'unit', value: any) => {
    setState(prev => ({
      ...prev,
      roomDimensions: { ...prev.roomDimensions, [key]: value }
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="pt-24 pb-16 bg-gray-50 border-b border-gray-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="max-w-3xl"
          >
            <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-6 leading-[1.1]">
              Find your perfect <span className="italic text-amber-700">dining fit</span>.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Professional dimensions calculator for homeowners and designers. Ensure every guest has the space they deserve.
            </p>
          </motion.div>
        </div>
        {/* Subtle Decorative Background */}
         <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-[120px] -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-8">
              
              {/* Section 1: Room Dimensions */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                    Room Size
                  </h3>
                  <select 
                    value={state.roomDimensions.unit}
                    onChange={(e) => updateRoom('unit', e.target.value as Unit)}
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 border-none rounded-full px-3 py-1 cursor-pointer hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-amber-500/20"
                  >
                    <option value="in">Inches</option>
                    <option value="ft">Feet</option>
                    <option value="cm">CM</option>
                    <option value="m">Meters</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-2">Length</label>
                    <input 
                      type="number" 
                      value={state.roomDimensions.length}
                      onChange={(e) => updateRoom('length', Number(e.target.value))}
                      className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500/20 transition-all font-medium" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-2">Width</label>
                    <input 
                      type="number" 
                      value={state.roomDimensions.width}
                      onChange={(e) => updateRoom('width', Number(e.target.value))}
                      className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500/20 transition-all font-medium" 
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full"></div>

              {/* Section 2: Table Shape */}
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Square className="w-3.5 h-3.5 text-amber-600" />
                  Table Shape
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SHAPES.map((s) => {
                    const Icon = s.icon;
                    const isActive = state.shape === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setState(prev => ({ ...prev, shape: s.id }))}
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                          isActive 
                          ? 'bg-amber-50 border-amber-600 shadow-sm' 
                          : 'bg-white border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-amber-900' : 'text-gray-500'}`}>
                          {s.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full"></div>

              {/* Section 3: Seating Capacity */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Tally4 className="w-3.5 h-3.5 text-amber-600" />
                    Seating Need
                  </h3>
                  <span className="text-lg font-serif italic text-amber-700">{state.seatingRequirement} guests</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="12" 
                  step="2"
                  value={state.seatingRequirement}
                  onChange={(e) => setState(prev => ({ ...prev, seatingRequirement: Number(e.target.value) }))}
                  className="w-full accent-amber-600 h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer mb-2"
                />
                <div className="flex justify-between px-1">
                  {[2, 4, 6, 8, 10, 12].map(n => (
                    <span key={n} className="text-[10px] font-bold text-gray-300">{n}</span>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full"></div>

              {/* Section 4: Comfort Level */}
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Settings2 className="w-3.5 h-3.5 text-amber-600" />
                  Comfort Logic
                </h3>
                <div className="bg-gray-50 p-1.5 rounded-2xl flex gap-1">
                  {COMFORT_LEVELS.map((c) => {
                    const isActive = state.comfortLevel === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setState(prev => ({ ...prev, comfortLevel: c.id }))}
                        className={`flex-1 py-3 px-1 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          isActive 
                          ? 'bg-white text-amber-600 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {c.name}
                      </button>
                    )
                  })}
                </div>
                <p className="mt-4 text-[10px] text-gray-500 uppercase tracking-wide leading-relaxed font-medium">
                  Currently using <span className="text-gray-900 font-bold">{COMFORT_LEVELS.find(c => c.id === state.comfortLevel)?.clearance}</span> clearance rule for movement.
                </p>
              </div>

              <div className="h-px bg-gray-100 w-full"></div>

              {/* Section 5: Advanced Options */}
              <div>
                 <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex justify-between items-center text-xs font-bold text-gray-900 uppercase tracking-widest group"
                 >
                    <span className="flex items-center gap-2">
                      <Settings2 className={`w-3.5 h-3.5 text-amber-600 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
                      Advanced Specs
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold">{showAdvanced ? 'HIDE' : 'SHOW'}</span>
                 </button>
                 <AnimatePresence>
                    {showAdvanced && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 space-y-4">
                           <div className="flex items-center justify-between">
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sideboard Present</label>
                              <button 
                                onClick={() => setState(prev => ({ ...prev, advanced: { ...prev.advanced, hasSideboard: !prev.advanced.hasSideboard }}))}
                                className={`w-10 h-5 rounded-full transition-colors relative ${state.advanced.hasSideboard ? 'bg-amber-600' : 'bg-gray-200'}`}
                              >
                                 <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${state.advanced.hasSideboard ? 'left-6' : 'left-1'}`} />
                              </button>
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Expandable Table</label>
                              <button 
                                onClick={() => setState(prev => ({ ...prev, advanced: { ...prev.advanced, hasExpandableOption: !prev.advanced.hasExpandableOption }}))}
                                className={`w-10 h-5 rounded-full transition-colors relative ${state.advanced.hasExpandableOption ? 'bg-amber-600' : 'bg-gray-200'}`}
                              >
                                 <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${state.advanced.hasExpandableOption ? 'left-6' : 'left-1'}`} />
                              </button>
                           </div>
                        </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>


            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Visual Header / Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Ideal Table Size</span>
                  <p className="text-3xl font-serif text-gray-900 mb-2">
                    {results.recommendedLength}" × {results.recommendedWidth}"
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-600 uppercase tracking-wide">
                    <Check className="w-3 h-3" />
                    Perfect for {state.seatingRequirement} People
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
               </div>

               <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Comfort Score</span>
                  <div className="flex items-end gap-3 mb-2">
                    <p className="text-4xl font-serif text-gray-900">{results.comfortScore}</p>
                    <p className="text-sm font-bold text-gray-300 mb-1 tracking-tighter">/ 10</p>
                  </div>
                   <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${results.comfortScore * 10}%` }}
                        className={`h-full ${results.comfortScore > 8 ? 'bg-emerald-500' : results.comfortScore > 5 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      />
                   </div>
               </div>

               <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Room Fit</span>
                  <p className="text-xl font-medium text-gray-900 mb-2 leading-tight uppercase tracking-tight">
                    {results.comfortScore > 7 ? 'Excellent Balance' : results.comfortScore > 4 ? 'Efficient Fit' : 'Tight Squeeze'}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                    Based on {state.comfortLevel} clearance rules.
                  </p>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visualization */}
                <RoomVisualization state={state} results={results} />

                {/* Secondary Results / Logic */}
                <div className="flex flex-col gap-6">
                  {/* Warning Box */}
                  <AnimatePresence>
                    {results.warnings.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-rose-50 border border-rose-100 p-6 rounded-3xl"
                      >
                         <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-rose-600" />
                            <h4 className="text-[11px] font-bold text-rose-900 uppercase tracking-widest">Sizing Advice</h4>
                         </div>
                         <ul className="space-y-3">
                           {results.warnings.map((w, i) => (
                             <li key={i} className="text-xs text-rose-700 leading-relaxed font-medium flex gap-2">
                                <span className="opacity-40 select-none">•</span>
                                {w}
                             </li>
                           ))}
                         </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-amber-600" />
                      Detailed Specs
                    </h3>
                    
                    <div className="space-y-6">
                       <div className="flex justify-between items-center group cursor-help">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-amber-600 transition-colors">Max Comfortable Seating</span>
                          <span className="font-serif text-2xl text-gray-900">{results.maxSeatingComfortable}</span>
                       </div>
                       <div className="flex justify-between items-center group cursor-help">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-amber-600 transition-colors">Max Tight Seating</span>
                          <span className="font-serif text-2xl text-gray-900">{results.maxSeatingTight}</span>
                       </div>
                       <div className="flex justify-between items-center group cursor-help">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-amber-600 transition-colors">Ideal Room Size</span>
                          <span className="font-medium text-xs text-gray-900 uppercase bg-gray-50 px-3 py-1.5 rounded-full">
                            {results.recommendedLength + results.clearanceInches * 2}" × {results.recommendedWidth + results.clearanceInches * 2}"
                          </span>
                       </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                        <button onClick={handleShare} className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
                          <Share2 className="w-3.5 h-3.5" />
                          Share Result
                        </button>
                        <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
                          <Printer className="w-3.5 h-3.5" />
                          Print PDF
                        </button>
                    </div>
                  </div>

                  {/* CTA Card */}
                  <div className="bg-amber-600 rounded-3xl p-8 text-white relative overflow-hidden group shadow-lg shadow-amber-600/20">
                     <div className="relative z-10">
                        <h4 className="font-serif text-2xl mb-2">Ready to shop?</h4>
                        <p className="text-amber-100 text-xs mb-6 max-w-[180px] leading-relaxed">
                          We've curated a selection of {state.shape} tables that perfectly fit your dimensions.
                        </p>
                        <button className="flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                          <ShoppingBag className="w-3.5 h-3.5" />
                          View Curated Tables
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                     </div>
                     <Armchair className="absolute -bottom-4 -right-4 w-32 h-32 text-amber-500/20 rotate-12" />
                  </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
