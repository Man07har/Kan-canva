import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useToggle from "../utilities/useToggleState";
import EditForm from "./EditForm";
import Trash from "../assests/trash.svg"
import Edit from "../assests/edit.svg"
import { Tooltip } from 'react-tooltip'

const Block = (props) => {
    const [isEditing, toggle] = useToggle(false);

    return (<>
        <Tooltip id="my-tooltip" effect="solid" place="bottom" />

        <Draggable draggableId={ `${props.task.id}` } index={ props.index }>

            { (provided) => (
                <div
                    className=" bg-white m-3 p-3  rounded-md  break-normal w-auto   hstyle"
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                    ref={ provided.innerRef }
                >
                    { isEditing ? (
                        <EditForm
                            color={ props.color }
                            editTask={ props.editTask }
                            taskId={ props.task.id }
                            toggle={ toggle }
                            startUser={ props.task.user }
                            startText={ props.task.text }
                        />
                    ) : (
                        <>
                            <div>
                                <span className="text-xs bg-slate-50 px-2 py-1 rounded-full">
                                    @{ props.task.user }
                                </span>
                            </div>
                            <div className="w-full mt-2">
                                { props.task.text }
                            </div>
                            <div className="flex ">
                                <button
                                    className=" px-2 py-1 mr-2 mt-2 rounded-md text-white hstyle"
                                    style={ {
                                        backgroundColor: `${props.color}`,
                                    } }
                                    onClick={ toggle } data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Edit me"
                                >
                                    {/* Edit */ }
                                    <img src={ Edit } alt="" />
                                </button>
                                <button
                                    className=" px-2 py-1 mr-2 mt-2 rounded-md text-white hstyle"
                                    style={ {
                                        backgroundColor: `${props.color}`,
                                    } }
                                    onClick={ () =>
                                        props.removeTask(props.task.id)
                                    }
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Delete"
                                >
                                    <img src={ Trash } alt="" />
                                </button>
                            </div>
                        </>
                    ) }
                </div>
            ) }
        </Draggable></>
    );
};

export default Block;
