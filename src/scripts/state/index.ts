import Vue from "vue";
import Vuex from 'vuex';

import player from './Player';
import grid from './Grid';
import tools from './Tools';
import items from './Items';

import { Point } from './Core/Common';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        player,
        grid,
        tools,
        items,
    },
    actions: {
        async dig({ dispatch, state, getters }, payload: Point) {
            const {
                Width,
                Height,
            } : { Width:number, Height: number } = getters['grid/dimensions'];
            
            // no action out of bounds
            if (payload.x < 0 || payload.x >= Width || payload.y < -1 || payload.y >= Height)
                return;

            // prevent moving more than a single square at a time
            const distance = Math.hypot(payload.x - state.player.x, payload.y - state.player.y);
            if (distance !== 1.0) {
                return;
            }

            // attempt to clear a block at the location
            const damage = getters['tools/power']();
            const { block, cleared } = await dispatch('grid/dig', { at: payload, damage });

            // move player to the location if the block is now clear
            if (cleared > 0) {
                dispatch('player/step', payload);
            }
            if (cleared === 2) {
                dispatch('items/grantItem', { block });
            }
        },
    },
    getters: {
        progress(state: any) {
            return (Math.max(0, state.player.y) / state.grid.height) * 100;
        },
    },
});
