import React, { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./App.css"
import { DropdownComponent } from "./pickTeam"
import { ListItem } from "./rosterSpot"
import data from "./databaseFiles/teamDatabase.json"
import { ordinal_suffix_of } from "./ordinalSuffix"
import { changePlayer } from "./changePlayer"
import { DropdownComponentBench } from "./pickBench"
import { calcStats } from "./calcStats"
import { statRankings } from "./teamStats"
import allPlayers from "./databaseFiles/playerDatabase.json"
import { changeOtherPlayer } from "./changeOtherPlayer"
import { Analytics } from '@vercel/analytics/react'
import { colorSchemes } from "./colorSchemes"
import { ReactComponent as HelpSvg } from "./help_small.svg"

const teams_list = Object.keys(data);

function App() {
  const [showStats, setShowStats] = useState(false)
  const [team, setTeam] = useState("Phillies")
  const [players, setPlayers] = useState(data.Phillies.starters)
  const [benchPlayers, setBenchPlayers] = useState(data.Phillies.bench)
  const [benchPlayer, setBenchPlayer] = useState(benchPlayers[0])
  const [otherPlayer, setOtherPlayer] = useState(benchPlayers[0])
  const [switchPlayerBench, setSwitchPlayerBench] = useState(false)
  const [switchPlayerOther, setSwitchPlayerOther] = useState(false)
  const [colorScheme, setColorScheme] = useState(colorSchemes.Phillies)


  const stats = calcStats(players)
  const rankings = statRankings(+stats[0], +stats[1], +stats[2])
  console.log(+stats[0], +stats[1], +stats[2])

  useEffect(() => {
    const current_players = data[team as keyof typeof data]
    setPlayers(current_players.starters)
    setBenchPlayers(current_players.bench)

    const current_color = colorSchemes[team.replace(/\s/g, "") as keyof typeof colorSchemes]
    setColorScheme(current_color)
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
    <div className="App" style={{ backgroundColor: colorScheme[0], height: showStats ? '135vh' : '100vh' }}>
      <h1>3up3down.app</h1>
      
      <div className="right">
        <a href="https://www.w3schools.com">< HelpSvg/></a>
      </div>


      {/* <p className="title">Set My Lineup</p> */}

      <button className="btn btn-blue view-stats" onClick={() => setShowStats((!showStats))}>
        {!showStats ? "view stats" : "hide stats"}
      </button>


      <DropdownComponent teams={teams_list} getTeam={(teamName) => { setTeam(teamName) }} />
      <br></br>
      <div> {team === "Mets" ? (

        <p style={{ color: colorScheme[1], marginTop: "100px" }}><b>poverty franchises not supported</b></p>
      ) : (

        <>
          <div className="draggable-zone">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="todo">
                {(provided) => (


                  <div {...provided.droppableProps} ref={provided.innerRef}>

                    {players.map((player, index) => {
                      return (
                        <Draggable key={player.name} draggableId={player.name} index={index}>

                          {(provided, snapshot) => (
                            <div className="roster-container"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}

                              style={{
                                background: snapshot.isDragging ? "#596475" : colorScheme[1],
                                ...provided.draggableProps.style
                              }}
                            >
                              <div onClick={() => {
                                if (switchPlayerBench) {
                                  const newRosters = changePlayer(player, benchPlayer, players, benchPlayers)
                                  setPlayers(newRosters[0])
                                  setBenchPlayers(newRosters[1])
                                  setSwitchPlayerBench(false)
                                };
                                if (switchPlayerOther) {
                                  const newRosters = changeOtherPlayer(player, otherPlayer, players, benchPlayers)
                                  setPlayers(newRosters[0])
                                  setBenchPlayers(newRosters[1])
                                  setSwitchPlayerOther(false)
                                };
                              }}>
                                <ListItem player={player} index={index + 1} showStats={showStats} color={colorScheme[1]} />
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
          </div><div className="mx-10">
            <div className="grid grid-cols-3 divide-y-1 divide-green-500 bottom">
              <div>
                <h4 className="text-slate-100">{stats[0]}</h4>
                <h5>Avg BA </h5>
                <h6>({ordinal_suffix_of(rankings[0])})</h6>
              </div>
              <div>
                <h4 className="text-slate-100">{stats[1]}</h4>
                <h5>Avg OBP</h5>
                <h6>({ordinal_suffix_of(rankings[1])})</h6>
              </div>
              <div>
                <h4 className="text-slate-100">{stats[2]}</h4>
                <h5>Avg OPS</h5>
                <h6>({ordinal_suffix_of(rankings[2])})</h6>
              </div>
            </div>
          </div>

          <div className="switch-players">

            <DropdownComponentBench benchPlayers={benchPlayers} btnName="bench" getPlayer={(player) => {
              setSwitchPlayerBench(true)
              setSwitchPlayerOther(false)
              setBenchPlayer(player)
            }} />

            <DropdownComponentBench benchPlayers={allPlayers.players} btnName="other" getPlayer={(player) => {
              setSwitchPlayerOther(true)
              setSwitchPlayerBench(false)
              setOtherPlayer(player)
            }} />

          </div>
        </>
      )}
      </div>

            
      {/* <div> {rankings[0] > 15 && rankings[1] > 15 && rankings[2] > 15 ? (
        <p className="muse">Poverty Detector Measuring High Reading</p>
      ) : (<p className="muse">developed by <a href="https://twitter.com/Phillies_Muse">@Phillies_Muse</a></p>
      )}</div> */}


      <Analytics />

    </div >
  )
}

export default App

