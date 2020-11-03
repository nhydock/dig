import data from '../data/items.json';

export interface Item {
  readonly key: string
  readonly name: string
  readonly desc: string
  readonly value: number
} 

export const db = (<Item[]>data).reduce(
  (table: Map<string, Item>, record: Item) => {
    table.set(record.key, record);
    return table;
  },
  new Map<string, Item>(),
);
