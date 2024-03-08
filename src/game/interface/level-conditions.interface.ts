import RoseType from "../gameplay/interactive-elements/enum/rose-type.enum";

export interface LevelDataConditions {
  [name: RoseType | string]: number
}

export interface LevelData {
  level: number,
  conditions: LevelDataConditions,
  results: {all: number, success: number} | null,
}