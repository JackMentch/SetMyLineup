import React from "react";

interface Props {
  name: string;
  index: number;
  showStats: boolean;
}

export const ListItem: React.FC<Props> = ({ name, index, showStats }) => {
  return (
    <article className="flex items-start space-x-2 p-1 ">
      <div>
        <dd className="px-1 ring-1 ring-slate-200 rounded">{index}</dd>
      </div>
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate text-gray-100">{name}</h2>
        <dl className="flex flex-wrap text-sm leading-6 font-medium">



          <div className="absolute top-0 right-2 flex items-center space-x-1">
            
            <input type="text" placeholder={name[0]} id="default-input" className="placeholder-white focus:placeholder-opacity-25 w-8 bg-gray-50 border text-center border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

          </div>


          <div className="flex-none w-full font-normal">
            {showStats ? <dd className="text-slate-400 roster-stats">{name}</dd> : null}
          </div>
        </dl>
      </div>
    </article>
  )
}
