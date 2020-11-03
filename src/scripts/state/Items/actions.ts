import { ActionTree } from 'vuex';
import { AugmentedActionContext } from '../typings';
import { Mutations, MutationTypes } from './mutations';
import { Block, DropRate } from '../../Core/Block';
import { InventoryModel } from './model';

export enum ActionTypes {
    GRANT_ITEM = 'GRANT_ITEM',
}
type GridActionContext = AugmentedActionContext<InventoryModel, Mutations>;

export interface Actions {
    [ActionTypes.GRANT_ITEM](
        context: GridActionContext,
        payload: { block: Block },
    ): void
}

export const actions: ActionTree<InventoryModel, InventoryModel> & Actions = {
    [ActionTypes.GRANT_ITEM]({ commit }, { block } : { block: Block }): void {

        const {
            ref: {
                drops = [] 
            }
         } = block;

        drops.forEach(({ item, chance, min, max }: DropRate) => {
            if (Math.random() > chance) {
                return;
            }

            const t = Math.random();
            const amount = Math.round(min * (1-t) + max * t);
            commit(MutationTypes.ADD_ITEM, { item, amount });
        });
    }
}
