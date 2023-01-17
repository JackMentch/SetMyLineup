import { DraggableLocation } from "react-beautiful-dnd";
import { Player, RosterMap } from "./types";

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
    roster: Player[],
    source: DraggableLocation,
    destination: DraggableLocation
) => {

    const current = roster.find(x => x.id === source.droppableId)!;
    const next = roster.find(x => x.id === destination.droppableId)!;
    const target = current.urls[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current.urls, source.index, destination.index);

        return roster.map(x => x.id === current.id ? { ...x, urls: reordered } : x)
    };

    // moving to different list

    // remove from original
    current.urls.splice(source.index, 1);
    // insert into next
    next.urls.splice(destination.index, 0, target);

    return roster.map(x => {
        if (current.id === x.id) {
            return {
                ...x,
                urls: current.urls
            };
        }
        else if (next.id === x.id) {
            return {
                ...x,
                urls: next.urls
            };
        }
        return x;
    });
}
