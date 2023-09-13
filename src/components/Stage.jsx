import React from "react";
import Block from "./Block";
import { Droppable } from "react-beautiful-dnd";
import Plus from '../assests/plus.svg'
import { Tooltip } from "react-tooltip";

const Stage = (props) => {
    return (
        <div

            style={ { backgroundColor: `${props.columnData.color}20` } }
            className="w-[20vw] p-4 m-1 rounded-md w-full "
        >
            <div >
                <Tooltip id="my-toolti" effect="solid" place="top" />
                <div>
                    <button
                        className="  bg-white p-2 rounded-md w-full flex justify-evenly items-center hstyle"
                        onClick={ () => props.openModal(props.columnData) }
                        disabled={
                            props.columnData.taskIds.length >= 5 ? true : false
                        }
                        data-tooltip-id="my-toolti"
                        data-tooltip-content="Use me to add tasks"
                    >
                        <img src={ Plus } alt="" />
                        Add task
                    </button>
                </div>
                <h2 className=" text-xl my-2 text-center mt-4">{ props.columnData.name }</h2>

                <div className="rounded-md flex flex-col justify-center items-center mt-6"
                    style={ { backgroundColor: `${props.columnData.color}20` } }
                >
                    <Droppable droppableId={ `${props.columnData.id - 1}` }
                    >
                        { (provided) => (
                            <div
                                ref={ provided.innerRef }
                                { ...provided.droppableProps }
                            >
                                { props.columnData.taskIds.map((task, index) => {
                                    return (
                                        <Block
                                            key={ task.id }
                                            id={ task.id }
                                            task={ task }
                                            color={ props.columnData.color }
                                            index={ index }
                                            removeTask={ props.removeTask }
                                            editTask={ props.editTask }
                                        />
                                    );
                                }) }
                                { provided.placeholder }
                            </div>
                        ) }
                    </Droppable>
                </div>

            </div>

        </div>
    );
};

export default Stage;
