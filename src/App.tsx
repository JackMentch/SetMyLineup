import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderRoster } from "./reorder";
import { Roster } from "./Roster";
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

  // If web app was previously visited, then restore the last defaults
  React.useEffect(() => {
    const data = localStorage.getItem('my-roster');

    if (data) {
      setRoster(JSON.parse(data));
    }

  }, [])

  // Store the current state so that it can be accessed again
  React.useEffect(() => {
    localStorage.setItem("my-roster", JSON.stringify(roster));
  })

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
          <Roster
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