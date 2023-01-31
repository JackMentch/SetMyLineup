export interface Row {
    id: string;
    label: string;
    players: Player[];
}

export interface Player {
    name: string;
    pos: string;
    ba: string;
    obp: string;
    ops: string;
}
