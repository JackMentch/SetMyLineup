import React, { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./App.css"
import { DropdownComponent } from "./pickTeam"
import { ListItem } from "./rosterSpot"
import data from "./database.json"
import { ordinal_suffix_of } from "./ordinalSuffix"
import { changePlayer } from "./changePlayer"
import { DropdownComponentBench } from "./pickBench"

const teams_list = Object.keys(data);

function App() {
  const [showStats, setShowStats] = useState(false)
  const [team, setTeam] = useState("Phillies")
  const [players, setPlayers] = useState(data.Phillies.starters)
  const [benchPlayers, setBenchPlayers] = useState(data.Phillies.bench)
  const [benchPlayer, setBenchPlayer] = useState(benchPlayers[0])
  const [switchPlayer, setSwitchPlayer] = useState(false)

  useEffect(() => {
    const current_players = data[team as keyof typeof data]
    setPlayers(current_players.starters)
    setBenchPlayers(current_players.bench)
  }, [team])



  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(players)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)

    setPlayers(items)
  }


  return (
    <div className="App">
      <h1>LineupBuildr.com</h1>

      <button className="btn btn-blue view-stats" onClick={() => setShowStats((!showStats))}>
        view stats
      </button>
      <DropdownComponent teams={teams_list} getTeam={(teamName) => { setTeam(teamName) }} />
      <br></br>
      <div className="draggable-zone">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo">
            {(provided) => (


              <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>

                {players.map((player, index) => {
                  return (
                    <Draggable key={player.id} draggableId={player.id} index={index}>

                      {(provided, snapshot) => (
                        <div className="roster-container"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}

                          style={{ background: snapshot.isDragging ? "#596475 " : "#374151", ...provided.draggableProps.style }}
                        >
                          <div onClick={() => {
                            if (switchPlayer) {
                              const newRosters = changePlayer(player, benchPlayer, players, benchPlayers);
                              setPlayers(newRosters[0]);
                              setBenchPlayers(newRosters[1]);
                              setSwitchPlayer(false);
                            };
                          }}>
                            <ListItem name={player.name} index={index + 1} showStats={showStats} />
                          </div>
                        </div>

                      )}

                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="mx-10">
        <div className="grid grid-cols-3 divide-y-1 divide-green-500 bottom">
          <div><h4 className="text-slate-100">.249</h4><h5>Avg BA </h5><h6>({ordinal_suffix_of(5)})</h6></div>
          <div><h4 className="text-slate-100">.249</h4><h5>Avg OBP</h5><h6>({ordinal_suffix_of(21)})</h6></div>
          <div><h4 className="text-slate-100">.249</h4><h5>Avg OPS</h5><h6>({ordinal_suffix_of(8)})</h6></div>
        </div>
      </div>



      <div>


        <div className="switch-players">

          <DropdownComponentBench benchPlayers={benchPlayers} getPlayer={(player) => {
            setSwitchPlayer(true);
            setBenchPlayer(player)
          }} />

          <button className="circle-button" onClick={() => { }}>
            + other player
          </button>
        </div>
      </div>





    </div>
  )
}

export default App

