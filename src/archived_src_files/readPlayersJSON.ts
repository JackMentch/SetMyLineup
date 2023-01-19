import { Player } from "../types";
import players from "../players.json"

export const readPlayers = (): [Player[], Player[]] => {
    let bench: Player[] = [];
    let starters: Player[] = [];
    players.forEach(player => {

        const currentPlayer: Player = {
            id: player.id,
            default: player.default,
            name: player.name,
            team: player.team,
            ba: player.ba,
        };
        if (typeof player.default === 'string')
            bench.push(currentPlayer);
        else
            starters.push(currentPlayer);
        
        
    })

    starters.sort((a, b) => (a.default > b.default) ? 1 : -1)

    return [bench, starters]
}
