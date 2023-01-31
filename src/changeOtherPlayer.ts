import { Player } from "./types";

export const changeOtherPlayer = (starterPlayer: Player, otherPlayer: Player, starters: Player[], bench: Player[]) => {
    let playerIndex: number = 0;

    starters.forEach((player, index) => {
        if (player === starterPlayer) {
            playerIndex = index;
        }
    });

    const firstHalf = starters.slice(0, playerIndex);
    const secondHalf = starters.slice(playerIndex + 1);



    let newStarters = [
        ...firstHalf,
        otherPlayer,
        ...secondHalf
    ]

    let newBench = [
        ...bench,
        starterPlayer
    ]

    return [newStarters, newBench] as const
}
