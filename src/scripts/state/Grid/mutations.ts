import { MutationTree } from 'vuex';
import { GridModel } from './model';

export enum MutationTypes {
    DIG_BLOCK = 'DIG_BLOCK'
};
export type Mutations<S = GridModel> = {
    [MutationTypes.DIG_BLOCK](state: S, { at: Point, damage: number }): void,
};
export const mutations: MutationTree<GridModel> & Mutations<GridModel> = {
    [MutationTypes.DIG_BLOCK](state: GridModel, { at, damage }) {
        const i = at.y * state.width + at.x;
        state.grid[i].health -= damage;
    }
};
