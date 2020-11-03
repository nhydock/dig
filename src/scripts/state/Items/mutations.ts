import { MutationTree } from 'vuex';
import { isNil } from 'lodash';

import { InventoryModel, HeldItem } from './model';
import { db as ItemDatabase } from '../../Core/Item';

export enum MutationTypes {
    ADD_ITEM = 'ADD_ITEM',
};
export type Mutations<S = InventoryModel> = {
    [MutationTypes.ADD_ITEM](state: S, payload: { item: string, amount: number }): void;
};
export const mutations: MutationTree<InventoryModel> & Mutations<InventoryModel> = {
    [MutationTypes.ADD_ITEM](state: InventoryModel, payload: { item: string, amount: number }): void {
        const item = ItemDatabase.get(payload.item);

        if (isNil(item) {
            throw new Error('Item is not defined');
        }

        const {
            items: {
                [payload.item]: record = {
                    item: ItemDatabase.get(payload.item),
                    held: 0,
                    known: false,
                } as HeldItem,
            }
        } = state;

        record.held += payload.amount;
        if (record.held > 0) {
            record.known = true;
        }
        state.items[payload.item] = record;
    },
};
