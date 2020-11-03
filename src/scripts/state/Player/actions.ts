import { ActionTree } from 'vuex';
import { PlayerModel } from './model';
import { Mutations, MutationTypes } from './mutations';
import { Orientation, Point, OrientationOf } from "../Core/Common";
import { AugmentedActionContext } from '../typings';

export enum ActionTypes {
    STEP = 'STEP',
    FACE = 'FACE',
}
type PlayerActionContext = AugmentedActionContext<PlayerModel, Mutations>;

export interface Actions {
    [ActionTypes.STEP](
        context: PlayerActionContext,
        payload: Point,
    ): void
    [ActionTypes.FACE](
        context: PlayerActionContext,
        payload: Point,
    ): void
}

export const actions: ActionTree<PlayerModel, PlayerModel> & Actions = {
    [ActionTypes.STEP]({ commit, state }, payload: Point) {
        const direction = OrientationOf(state, payload);
        commit(MutationTypes.SET_POSITION, payload);
        commit(MutationTypes.SET_ORIENT, direction);
    },
    [ActionTypes.FACE]({ commit, state }, payload: Point) {
        const direction = OrientationOf(state, payload)
        commit(MutationTypes.SET_ORIENT, direction);
    }
}
