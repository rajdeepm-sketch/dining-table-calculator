/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalculatorState, CalculationResults, Unit } from '../types';

export const CONVERSION_FACTORS: Record<Unit, number> = {
  in: 1,
  ft: 12,
  cm: 0.393701,
  m: 39.3701,
};

export function convertToInches(value: number, unit: Unit): number {
  return value * CONVERSION_FACTORS[unit];
}

export function convertFromInches(inches: number, unit: Unit): number {
  return inches / CONVERSION_FACTORS[unit];
}

export function calculateResults(state: CalculatorState): CalculationResults {
  const { roomDimensions, shape, seatingRequirement, comfortLevel, advanced } = state;

  const roomLengthIn = convertToInches(roomDimensions.length, roomDimensions.unit);
  const roomWidthIn = convertToInches(roomDimensions.width, roomDimensions.unit);

  const clearanceMap: Record<string, number> = {
    compact: 30,
    comfortable: 36,
    luxury: 48,
  };

  const clearance = clearanceMap[comfortLevel];
  const seatingWidth = 24; // standard inches per person
  
  let recLength = 0;
  let recWidth = 0;
  let maxComfortable = 0;
  let maxTight = 0;
  let comfortScore = 0;
  const warnings: string[] = [];

  // Logic based on shape
  if (shape === 'rectangle' || shape === 'oval') {
    // Basic rectangle logic: 24" per person on sides, maybe 1 at each head if needed
    // For 6 people: 3 per side (72") or 2 per side + 1 at each head (48" + 2*head)
    // We'll assume a balanced approach
    if (seatingRequirement <= 2) {
      recLength = 36;
      recWidth = 30;
    } else if (seatingRequirement <= 4) {
      recLength = 48;
      recWidth = 36;
    } else if (seatingRequirement <= 6) {
      recLength = 72;
      recWidth = 36;
    } else if (seatingRequirement <= 8) {
      recLength = 96;
      recWidth = 40;
    } else {
      recLength = 120;
      recWidth = 42;
    }

    if (shape === 'oval') {
       // Oval usually takes slightly more visual space but seating is similar
       recWidth += 2;
    }
  } else if (shape === 'square') {
    if (seatingRequirement <= 4) {
      recLength = 36;
    } else if (seatingRequirement <= 8) {
      recLength = 60;
    } else {
      recLength = 72;
    }
    recWidth = recLength;
  } else if (shape === 'round') {
    // Round diameter
    if (seatingRequirement <= 2) recLength = 36;
    else if (seatingRequirement <= 4) recLength = 48;
    else if (seatingRequirement <= 6) recLength = 60;
    else if (seatingRequirement <= 8) recLength = 72;
    else recLength = 84;
    recWidth = recLength;
  }

  // Calculate max seating based on room size and clearance
  const usableLength = Math.max(0, roomLengthIn - (clearance * 2));
  const usableWidth = Math.max(0, roomWidthIn - (clearance * 2));

  if (shape === 'rectangle' || shape === 'oval') {
    // Perimeter-based seating
    const p = (usableLength * 2) + (usableWidth * 2);
    maxComfortable = Math.floor(p / 24);
    maxTight = Math.floor(p / 20);
  } else if (shape === 'round') {
    const diameter = Math.min(usableLength, usableWidth);
    const circumference = Math.PI * diameter;
    maxComfortable = Math.floor(circumference / 24);
    maxTight = Math.floor(circumference / 20);
  } else if (shape === 'square') {
    const side = Math.min(usableLength, usableWidth);
    maxComfortable = Math.floor((side * 4) / 24);
    maxTight = Math.floor((side * 4) / 20);
  }

  // Comfort Score calculation (0-10)
  // Factors: 
  // 1. Is there enough clearance?
  // 2. Is the table proportioned nicely for the room?
  // 3. User seating requirement vs room capacity
  
  const widthRatio = (recWidth + clearance * 2) / roomWidthIn;
  const lengthRatio = (recLength + clearance * 2) / roomLengthIn;
  
  let score = 10;
  if (widthRatio > 1 || lengthRatio > 1) {
    score -= 5;
    warnings.push("Table may be too large for the room with desired clearance.");
  } else {
    // Deduct if it's too tight
    const buffer = 6; // extra buffer
    if (widthRatio > 0.9 || lengthRatio > 0.9) score -= 1;
    if (widthRatio > 0.95 || lengthRatio > 0.95) score -= 1;
  }

  if (seatingRequirement > maxComfortable) {
    score -= 2;
    warnings.push("Your seating requirement exceeds the comfortable capacity for this room size.");
  }

  comfortScore = Math.max(0, Math.min(10, score));

  return {
    recommendedLength: recLength,
    recommendedWidth: recWidth,
    maxSeatingComfortable: Math.max(0, maxComfortable),
    maxSeatingTight: Math.max(0, maxTight),
    comfortScore,
    clearanceInches: clearance,
    warnings
  };
}
