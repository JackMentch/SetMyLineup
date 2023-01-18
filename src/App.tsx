import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderRoster } from "./reorder";
import { Roster } from "./Roster";
import { generate } from "shortid";
import images from "./images.json"
import "./index.css"
import players from "./players.json"
import { Player } from "./types";
import { readPlayers } from "./readPlayersJSON";


const App = () => {

  let [benchList, starterList] = readPlayers();

  const [roster, setRoster] = React.useState([
    { id: generate(), label: "1", urls: [] },
    { id: generate(), label: "2", urls: [] },
    { id: generate(), label: "3", urls: [] },
    { id: generate(), label: "4", urls: [] },
    { id: generate(), label: "5", urls: [] },
    { id: generate(), label: "6", urls: [] },
    { id: generate(), label: "7", urls: [] },
    { id: generate(), label: "8", urls: [] },
    { id: generate(), label: "9", urls: [] },
    {
      id: generate(),
      label: "bench",
      urls: images
    }

  ]);



  // If web app was previously visited, then restore the last defaults
  // React.useEffect(() => {
  //   const data = localStorage.getItem('my-roster');

  //   if (data) {
  //     setRoster(JSON.parse(data));
  //   }

  // }, [])

  // // Store the current state so that it can be accessed again
  // React.useEffect(() => {
  //   localStorage.setItem("my-roster", JSON.stringify(roster));
  // })

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

        <p>{benchList[0].name}</p>
        <p>{starterList[0].name}</p>
        
        <div className="roster-container">
          {roster.map(row => (
            <Roster
              internalScroll
              key={row.id}
              listId={row.id}
              listType="CARD"
              row={row}
            />
          ))}
        </div>
      </div>
    </DragDropContext>




  );
};

export default App;