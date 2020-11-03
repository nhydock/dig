import { Orientation } from "../../Core/Common";

export const state = {
    x: 0,
    y: 0,
    orient: Orientation.SOUTH,
};
export type PlayerModel = typeof state;
