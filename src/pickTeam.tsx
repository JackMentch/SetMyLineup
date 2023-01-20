import React, { useState } from "react";
import { textSpanIsEmpty } from "typescript";
import teams from "./teams.json"

export interface Team {
    id: string;
    name: string;
}


export const DropdownComponent: React.FC = () => {
    const [isOpen, setOpen] = useState(false);

    const handleDropDown = () => {
        setOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-blue change-team rounded inline-flex items-center"
                onClick={handleDropDown}
            >
                pick team
                <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            <div
                id="dropdown"
                className={`z-10 w-44 bg-white rounded divide-gray-100 shadow ${isOpen ? "block" : "hidden"}`}
            >

                <ul className="h-80 overflow-y-auto w-44 dropdown-item bg-white rounded divide-gray-100 shadow ">

                    {teams.map(team => {
                        return(
                        <li >
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100" onClick={handleDropDown}>
                            {team.name}
                        </a>
                        </li>
                        )})
                    }

                </ul>
            </div>
        </div>
    );
};