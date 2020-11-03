import { Block } from '../../Core/Block';

const WIDTH = 64; // blocks/row
const HEIGHT = 10240; // rows

export const state = {
    grid: new Array<Block>(WIDTH * HEIGHT),
    width: WIDTH,
    height: HEIGHT,
};
export type GridModel = typeof state;
