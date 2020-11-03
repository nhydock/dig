import { MutationTree } from 'vuex';
import { ActionTree, ActionContext } from 'vuex';

export type AugmentedActionContext<S, M extends MutationTree<S>> = {
    commit<K extends keyof M>(
        key: K,
        payload: Parameters<M[K]>[1]
    ): ReturnType<M[K]>
} & Omit<ActionContext<S, S>, 'commit'>;
