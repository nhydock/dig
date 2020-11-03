import { sortBy } from 'lodash';

import data from '../data/blocks.json';

export const db = (<BlockRef[]>data).reduce(
  (table: Map<string, BlockRef>, record: BlockRef) => {
    table.set(record.key, record);
    return table;
  },
  new Map<string, BlockRef>(),
);
export const depthOrderedDb = sortBy(<BlockRef[]>data, ['startsAt']) as BlockRef[];

export type BlockType = "SDIRT" | "MDIRT" | "HDIRT" | "BDROCK"

export interface BlockRef {
  readonly type: BlockType
  readonly key: string
  readonly name: string
  readonly startsAt: number
  readonly durability: number
  readonly growth: number
  readonly drops: DropRate[]
}

export interface Block {
  readonly type: BlockType
  readonly ref: BlockRef
  readonly depth: number
  readonly maxHealth: number
  health: number
}

export interface DropRate {
  readonly item: string
  readonly chance: number
  readonly min: number
  readonly max: number
}
