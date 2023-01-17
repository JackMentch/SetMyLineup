import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Player } from "./types";

interface Props {
  player: Player;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

export const AuthorList: React.FC<Props> = ({ listId, listType, player }) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {dropProvided => (
        <div {...dropProvided.droppableProps}>
          <div style={{ display: "flex", backgroundColor: 'pink', margin:20, minHeight: 60}} ref={dropProvided.innerRef}>
            {player.urls.map((url, index) => (
              <Draggable key={url} draggableId={url} index={index}>
                {dragProvided => (
                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                  >
                    <img style={{width: 50}} src={url} /> 
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};