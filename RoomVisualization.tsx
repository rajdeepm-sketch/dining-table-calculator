/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CalculatorState, CalculationResults } from '../../types';
import { convertToInches } from '../../lib/calculator-logic';

interface RoomVisualizationProps {
  state: CalculatorState;
  results: CalculationResults;
}

export function RoomVisualization({ state, results }: RoomVisualizationProps) {
  const { roomDimensions, shape } = state;
  const { recommendedLength, recommendedWidth, clearanceInches } = results;

  const roomL = convertToInches(roomDimensions.length, roomDimensions.unit);
  const roomW = convertToInches(roomDimensions.width, roomDimensions.unit);

  // Scaling factor for SVG
  const padding = 40;
  const maxSize = 400;
  const scale = Math.min((maxSize - padding * 2) / roomL, (maxSize - padding * 2) / roomW);

  const svgW = roomW * scale + padding * 2;
  const svgH = roomL * scale + padding * 2;

  const tableW = recommendedWidth * scale;
  const tableH = recommendedLength * scale;
  const clearance = clearanceInches * scale;

  const tableX = (svgW - tableW) / 2;
  const tableY = (svgH - tableH) / 2;

  // Chair representation
  const chairSize = 18 * scale;
  const chairPadding = 4 * scale;

  const renderChairs = () => {
    const chairs = [];
    const count = state.seatingRequirement;
    
    if (shape === 'rectangle' || shape === 'oval' || shape === 'square') {
      const perSide = Math.ceil(count / 2);
      const spacingAcross = tableW / (perSide + 1);
      
      // Top side
      for (let i = 0; i < perSide; i++) {
        chairs.push(
          <motion.rect
            key={`top-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            x={tableX + (i + 1) * spacingAcross - chairSize / 2}
            y={tableY - chairSize - chairPadding}
            width={chairSize}
            height={chairSize}
            rx={4}
            fill="#d1d5db"
          />
        );
      }
      // Bottom side
      for (let i = 0; i < perSide; i++) {
        chairs.push(
          <motion.rect
            key={`bottom-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            x={tableX + (i + 1) * spacingAcross - chairSize / 2}
            y={tableY + tableH + chairPadding}
            width={chairSize}
            height={chairSize}
            rx={4}
            fill="#d1d5db"
          />
        );
      }
    } else if (shape === 'round') {
      for (let i = 0; i < count; i++) {
        const angle = (i * 360) / count;
        const rad = (angle * Math.PI) / 180;
        const dist = (tableW / 2) + chairPadding + (chairSize / 2);
        const cx = (svgW / 2) + Math.cos(rad) * dist;
        const cy = (svgH / 2) + Math.sin(rad) * dist;
        
        chairs.push(
          <motion.circle
            key={`chair-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            cx={cx}
            cy={cy}
            r={chairSize / 2}
            fill="#d1d5db"
          />
        );
      }
    }

    return chairs;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">
      <div className="mb-6 flex justify-between w-full items-end">
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Room Visualization</h3>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-tighter">Scaled Top-Down View</p>
        </div>
        <div className="flex gap-4 text-[10px] items-center">
            <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full border border-amber-600 bg-amber-50"></div>
                <span className="text-gray-400 uppercase tracking-widest font-bold">Clearance</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-gray-900	"></div>
                <span className="text-gray-400 uppercase tracking-widest font-bold">Table</span>
            </div>
        </div>
      </div>

      <div className="relative border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50 p-4">
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="max-w-full h-auto drop-shadow-sm">
          {/* Room Boundaries */}
          <rect x={padding} y={padding} width={roomW * scale} height={roomL * scale} fill="white" stroke="#e5e7eb" strokeWidth={2} />
          
          {/* Legend helper info */}
          <text x={padding + (roomW * scale) / 2} y={padding - 10} textAnchor="middle" fontSize="10" fill="#9ca3af" fontStyle="italic">
            {roomW.toFixed(0)}" Wall
          </text>
          <text 
            x={padding - 15} 
            y={padding + (roomL * scale) / 2} 
            textAnchor="end" 
            fontSize="10" 
            fill="#9ca3af" 
            fontStyle="italic"
            transform={`rotate(-90, ${padding - 15}, ${padding + (roomL * scale) / 2})`}
          >
             {roomL.toFixed(0)}" Wall
          </text>

          {/* Clearance Zone */}
          <motion.rect
            initial={false}
            animate={{
              x: tableX - clearance,
              y: tableY - clearance,
              width: tableW + clearance * 2,
              height: tableH + clearance * 2,
            }}
            rx={shape === 'round' || shape === 'oval' ? (tableW + clearance * 2) / 2 : 12}
            fill="#fff7ed"
            stroke="#f59e0b"
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* Chairs */}
          {renderChairs()}

          {/* Table */}
          <motion.rect
            initial={false}
            animate={{
              x: tableX,
              y: tableY,
              width: tableW,
              height: tableH,
            }}
            rx={shape === 'round' || shape === 'oval' ? tableW / 2 : 4}
            fill="#111827"
            stroke="#111827"
            strokeWidth={2}
          />
          
          {/* Inner Surface Detail */}
          <motion.rect
             initial={false}
             animate={{
               x: tableX + 4,
               y: tableY + 4,
               width: tableW - 8,
               height: tableH - 8,
             }}
             rx={shape === 'round' || shape === 'oval' ? (tableW - 8) / 2 : 2}
             fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 w-full">
         <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
            <span className="block text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Walking Space</span>
            <span className="block text-lg font-serif text-gray-900">{clearanceInches}" clearance</span>
         </div>
         <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Table dimensions</span>
            <span className="block text-lg font-serif text-gray-900">{recommendedLength}" × {recommendedWidth}"</span>
         </div>
      </div>
    </div>
  );
}
