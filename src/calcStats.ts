import { Player } from "./types";

export const calcStats = (starters: Player[]) => {
    let totalBA: number = 0;
    let totalOBP: number = 0;
    let totalOPS: number = 0;

    starters.forEach((player) => {
        totalBA += +player.ba;
        totalOBP += +player.obp;
        totalOPS += +player.ops;
    });

    return [(Math.round(totalBA / 9 * 1000) / 1000).toFixed(3),
    (Math.round(totalOBP / 9 * 1000) / 1000).toFixed(3),
    (Math.round(totalOPS / 9 * 1000) / 1000).toFixed(3)] as const
}