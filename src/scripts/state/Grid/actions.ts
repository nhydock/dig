import { ActionTree } from 'vuex';
import { GridModel } from './model';
import { Point } from "../../Core/Common";
import { AugmentedActionContext } from '../typings';
import { Block } from '../../Core/Block';
import { Mutations, MutationTypes } from './mutations';

export enum DigResult {
    NO_ACTION = -1,
    DIGGING = 0,
    CLEARED = 1,
    JUST_CLEARED = 2
}
export enum ActionTypes {
    DIG = 'dig',
}
type GridActionContext = AugmentedActionContext<GridModel, Mutations>;

export interface Actions {
    [ActionTypes.DIG](
        context: GridActionContext,
        payload: { at: Point, damage: number },
    ): { block: Block, cleared: DigResult }
}

export const actions: ActionTree<GridModel, GridModel> & Actions = {
    [ActionTypes.DIG]({ commit, getters }, { at, damage }): { block: Block, cleared: DigResult } {
        const block = getters.block(at);

        if (!block) {
            return {
                block,
                cleared: DigResult.NO_ACTION,
            };
        }
        if (block.IsCleared) {
            return {
                block,
                cleared: DigResult.CLEARED,
            };
        }
        commit(MutationTypes.DIG_BLOCK, { at, damage });
        return {
            block,
            cleared: block.IsCleared
                ? DigResult.JUST_CLEARED
                : DigResult.DIGGING
        }
    }
}
