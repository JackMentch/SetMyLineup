import React from "react";

interface Props {
  name: string;
  index: number;
  showStats: boolean;
}

export const ListItem: React.FC<Props> = ({ name, index, showStats }) => {
  return (
    <article className="flex items-start space-x-6 p-2">
      <div>
        <dd className="px-1.5 ring-1 ring-slate-200 rounded">{index}</dd>
      </div>
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">{name}</h2>
        <dl className="flex flex-wrap text-sm leading-6 font-medium">
          <div className="absolute top-0 right-2 flex items-center space-x-1">
            <dd>{name}</dd>
          </div>
          <div className="flex-none w-full font-normal">
            {showStats?<dd className="text-slate-400 roster-stats">{name}</dd>:null}
          </div>
        </dl>
      </div>
    </article>
  )
}
