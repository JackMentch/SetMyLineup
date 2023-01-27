import { Player } from "./types";

export const changePlayer = (starterPlayer: Player, benchPlayer: Player, starters: Player[], bench: Player[]) => {
    let benchIndex: number = 0;
    let playerIndex: number = 0;
    
    starters.forEach((player, index) => {
        if (player.name === starterPlayer.name) {
            playerIndex = index;
        }
    });
    bench.forEach((player, index) => {
        if (player.name === benchPlayer.name) {
            benchIndex = index;
        }
    });
    starters.splice(0,1);
    
    bench.splice(0,1);


    let newStarters =  [
        ...starters,
        benchPlayer
    ]

    let newBench =  [
        ...bench,
        starterPlayer
    ]
    
    
    return [newStarters, newBench] as const
}
