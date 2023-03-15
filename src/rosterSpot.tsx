import React from "react";
import { Player } from "./types";

interface Props {
  player: Player;
  index: number;
  showStats: boolean;
  color: string;
}

export const ListItem: React.FC<Props> = ({ player, index, showStats, color }) => {
  return (
    <article className="flex items-start space-x-2 p-1 ">
      <div>
        <dd className="px-1 ring-1 ring-slate-200 rounded">{index}</dd>
      </div>
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate text-gray-100">{player.name}</h2>
        <dl className="flex flex-wrap text-sm leading-6 font-medium">



          <div className="absolute top-0 right-2 flex items-center space-x-1">
            
            <input type="text" placeholder={player.pos} id="default-input" style={{backgroundColor: color}} className="placeholder-white focus:placeholder-opacity-25 w-8 border text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

          </div>


          <div className="flex-none w-full font-normal">
            {showStats ? <dd className="text-slate-400 roster-stats">Proj 2023: {player.ba} / {player.obp} / {player.ops}</dd> : null}
          </div>
        </dl>
      </div>
    </article>
  )
}
