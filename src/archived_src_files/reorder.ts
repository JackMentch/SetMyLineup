import { DraggableLocation } from "react-beautiful-dnd";
import { Row } from "../types";

// a little function to help us with reordering the result
export const reorder = (
    list: any[],
    startIndex: number,
    endIndex: number
): any[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderRoster = (
    row: Row[],
    source: DraggableLocation,
    destination: DraggableLocation
) => {

    const current = row.find(x => x.id === source.droppableId)!;
    const next = row.find(x => x.id === destination.droppableId)!;
    const target = current.players[source.index];
    
    // moving to different list

    // remove from original
    current.players.splice(source.index, 1);
    // insert into next
    next.players.splice(destination.index, 0, target);



    return row.map(x => {
        if (current.id === x.id) {
            return {
                ...x,
                players: current.players
            };
        }
        else if (next.id === x.id) {
            return {
                ...x,
                players: next.players
            };
        }
        return x;
    });
}
