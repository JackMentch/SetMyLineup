import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./App.css"
import { DropdownComponent } from "./pickTeam"
import { ListItem } from "./rosterSpot"
import { ToggleStats } from "./toggleStats"


const listItems = [
  {
    id: "1",
    name: "Study Spanish"
  },
  {
    id: "2",
    name: "Workout"
  },
  {
    id: "3",
    name: "Film Youtube"
  },
  {
    id: "4",
    name: "Grocery Shop"
  },
  {
    id: "5",
    name: "Eat Dinner"
  },
  {
    id: "6",
    name: "Take Shower"
  },
  {
    id: "7",
    name: "Wash Face"
  },
  {
    id: "8",
    name: "Brush Teeth"
  },
  {
    id: "9",
    name: "Go to bed"
  }
]

function App() {
  const [todo, setTodo] = useState(listItems)
  const [showStats, setShowStats] = useState(false)



  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(todo)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)

    setTodo(items)
  }
  return (
    <div className="App">
      <h1>Hello World</h1>
      <br></br>
      <button className="btn btn-blue view-stats" onClick={() => setShowStats((!showStats))}>
        view stats
      </button>
      <DropdownComponent />
      <br></br>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>

              {todo.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div className="roster-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ background: snapshot.isDragging ? "#4a2975" : "white", ...provided.draggableProps.style }}
                      >
                        <ListItem name={name} index={index+1} showStats={showStats} />

                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App

