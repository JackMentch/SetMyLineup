import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./App.css"
import { ListItem } from "./rosterSpot"

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
	}
]

function App() {
	const [ todo, setTodo ] = useState(listItems)
	const [ showStats, setShowStats ] = useState(false)



	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) return

		const items = Array.from(todo)
		const [ newOrder ] = items.splice(source.index, 1)
		items.splice(destination.index, 0, newOrder)

		setTodo(items)
	}
	return (
		<div className="App">
			<h1>Drag and Drop</h1>
      <button onClick={() => setShowStats((true ? !showStats: showStats))}>Stats</button>
      
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
												style={{background: snapshot.isDragging ? "#4a2975" : "white", ...provided.draggableProps.style}}
											>
                      
												{/* <p className="circle">{index + 1}</p>
                        <p className="player-name">{name}</p>
                        <p className="player-position">{name[0]}</p> */}
                        <ListItem name={name} index={index} showStats={showStats}/>

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

