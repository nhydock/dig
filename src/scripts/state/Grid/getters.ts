import { GetterTree } from 'vuex';
import { GridModel } from './model';
import { Block, depthOrderedDb } from '../../Core/Block';
import { Point } from '../../Core/Common';

function createBlock(depth: number): Block {
    const blockRef = depthOrderedDb.reduce(
        (selected, ref) => depth > ref.startsAt ? ref : selected, 
        depthOrderedDb[0],
    );

    const health = blockRef.durability + blockRef.growth * (depth - blockRef.startsAt);
        return {
        type: blockRef.type,
        ref: blockRef,
        health: health,
        maxHealth: health,
        depth: depth,
    };
}

export type Getters = {
  dimensions(state: GridModel): { width: number, height: number }
  getBlock(state: GridModel): { (point: Point): Block | null }
  getMultiBlock(state: GridModel, getters: any): { (coords: Array<Point>): Array<Block> }
  row(state: GridModel): { (row: number): Array<Block> }
};

export const getters: GetterTree<GridModel, GridModel> & Getters = {
    dimensions(state) {
        return {
            width: state.width,
            height: state.height,
        };
    },
    row(state) {
        return (row: number) => {
            return state.grid.slice(row * state.width, (row + 1) * state.width);
        }
    },
    getBlock(state) {
        return (point) => {
            if (point.x >= 0 && point.x < state.width && point.y >= 0 && point.y < state.height) {
                const i = point.y * state.width + point.x;
                const block = state.grid[i] ?? createBlock(point.y);
                if (state.grid[i] == null) {
                    state.grid[i] == block;
                }
        
                return block;
            }
        
            return null;
        }
    },
    getMultiBlock(state, getters) {
        return (coords: Array<Point>) => {
            let bl: Block | null;
            const blocks = Array<Block>();
            for (const coord of coords) {
                if ((bl = getters.getBlock(coord)) != null) blocks.push(bl);
            }
            
            return blocks;
        }
    }
}
