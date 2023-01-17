import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderRoster } from "./reorder";
import { AuthorList } from "./AuthorList";
import { generate } from "shortid";
import images from "./images.json"

const aId = generate(); 
const unrankedId = generate(); 

const App = () => {
  const [roster, setRoster] = React.useState([
    { id: aId, label: "a", urls: [] },
    {
      id: unrankedId,
      label: "unranked",
      urls: images
    }

  ]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }

        setRoster(reorderRoster(roster, source, destination));
      }}
    >
      <div>

        <button onClick={() => {

          setRoster([
            {
              id: generate(),
              label: "",
              urls: [],
            },
            ...roster,
          ])
        }}>add row</button>

        {roster.map(player => (
          <AuthorList
            internalScroll
            key={player.id}
            listId={player.id}
            listType="CARD"
            player={player}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;