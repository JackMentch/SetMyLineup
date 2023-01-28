import React, { useState } from "react";
import { Player } from "./types";


interface Props {
    benchPlayers: Player[];
    getPlayer(teamName: Player): void;
}

export const DropdownComponentBench: React.FC<Props> = ({benchPlayers, getPlayer}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="dropdownTop" data-dropdown-placement="top">
            <button

                className="circle-button inline-flex items-center"
                onClick={() => setOpen((!isOpen))}
            >
                + bench player
                <svg
                    className="ml-1 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    ></path>
                </svg>
            </button>
            <div
                id="dropdownTop"
                className={`z-10 w-44 bg-white rounded divide-gray-100 shadow ${isOpen ? "block" : "hidden"}`}
            >

                <ul className="h-80 overflow-y-auto w-40 dropdown-up-item bg-white rounded divide-gray-100 shadow ">

                    {benchPlayers.map(player => {
                        return (
                            <li 
                            className="overflow"
                            key={player.id}
                            onClick={() => getPlayer(player)}>
                                <a href="#" className="block px-1 py-1 hover:bg-gray-100" onClick={() => setOpen((!isOpen))}>
                                    {player.name}
                                </a>
                            </li>
                        )
                    })
                    }

                </ul>
            </div>
        </div>
    );
};