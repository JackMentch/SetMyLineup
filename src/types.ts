export interface Row {
    id: string;
    label: string;
    players: Player[];
}

export interface Player {
    id: string;
    default: string | number;
    name: string;
    team: string;
    ba: string;
}
