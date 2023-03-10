import { Player } from "./types";

export const changePlayer = (starterPlayer: Player, benchPlayer: Player, starters: Player[], bench: Player[]) => {
    let benchIndex: number = 0;
    let playerIndex: number = 0;

    starters.forEach((player, index) => {
        if (player === starterPlayer) {
            playerIndex = index;
        }
    });
    bench.forEach((player, index) => {
        if (player === benchPlayer) {
            benchIndex = index;
        }
    });
    const firstHalf = starters.slice(0, playerIndex);
    const secondHalf = starters.slice(playerIndex + 1);

    bench.splice(benchIndex, 1);


    let newStarters = [
        ...firstHalf,
        benchPlayer,
        ...secondHalf
    ]

    let newBench = [
        ...bench,
        starterPlayer
    ]

    return [newStarters, newBench] as const
}
