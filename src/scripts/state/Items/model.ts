import { Item } from '../../Core/Item';

export type HeldItem = {
    item: Item
    held: number
    known: boolean
}

export const state = {
    items: {} as { [x: string]: HeldItem },
    money: 0
};
export type InventoryModel = typeof state;
