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
    starters.splice(playerIndex,1);
    bench.splice(benchIndex,1);


    let newStarters =  [
        ...starters,
        benchPlayer
    ]

    let newBench =  [
        ...bench,
        starterPlayer
    ]

    console.log(newBench);
    console.log(newStarters);
    
    
    return [newStarters, newBench] as const
}
