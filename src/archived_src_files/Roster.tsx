import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row } from "../types";
import "./index.css"

interface Props {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

export const Roster: React.FC<Props> = ({ listId, listType, row }) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {dropProvided => (
        <div {...dropProvided.droppableProps}>
          <div style={{ display: "block", backgroundColor: 'pink', minHeight: 60 }} ref={dropProvided.innerRef}>
            {row.players.map((player, index) => (
              <Draggable key={player.name} draggableId={player.name} index={index}>
                {dragProvided => (
                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                  >
                    <div className="roster-player">
                      <p style={{ margin: 5 }}>{player.name}</p>
                      <p style={{ margin: 5 }}>{player.team}</p>
                    </div>
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