export interface Row {
    id: string;
    label: string;
    players: Player[];
}

export interface Player {
    id: string;
    default: string;
    name: string;
    ba: string;
}
