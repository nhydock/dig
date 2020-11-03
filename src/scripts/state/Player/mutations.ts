import { MutationTree } from 'vuex';
import { Orientation, Point } from '../../Core/Common';
import { PlayerModel } from './model';

export enum MutationTypes {
    SET_ORIENT = 'SET_ORIENT',
    SET_POSITION = 'SET_POSITION',
};
export type Mutations<S = PlayerModel> = {
    [MutationTypes.SET_ORIENT](state: S, direction: Orientation): void;
    [MutationTypes.SET_POSITION](state: S, point: Point): void;
};
export const mutations: MutationTree<PlayerModel> & Mutations<PlayerModel> = {
    [MutationTypes.SET_ORIENT](state: PlayerModel, direction: Orientation): void {
        state.orient = direction;
    },
    [MutationTypes.SET_POSITION](state: PlayerModel, point: Point): void {
        state.x = point.x;
        state.y = point.y;
    }
};
