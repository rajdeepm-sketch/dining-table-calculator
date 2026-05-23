/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Unit = 'ft' | 'in' | 'cm' | 'm';

export type TableShape = 'rectangle' | 'round' | 'oval' | 'square';

export type ComfortLevel = 'compact' | 'comfortable' | 'luxury';

export interface RoomDimensions {
  length: number;
  width: number;
  unit: Unit;
}

export interface CalculatorState {
  roomDimensions: RoomDimensions;
  shape: TableShape;
  seatingRequirement: number;
  comfortLevel: ComfortLevel;
  advanced: {
    chairWidth: number;
    hasExpandableOption: boolean;
    hasBenchSeating: boolean;
    hasSideboard: boolean;
  };
}

export interface CalculationResults {
  recommendedLength: number;
  recommendedWidth: number;
  maxSeatingComfortable: number;
  maxSeatingTight: number;
  comfortScore: number;
  clearanceInches: number;
  warnings: string[];
}
