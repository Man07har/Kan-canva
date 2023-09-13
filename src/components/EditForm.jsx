import React from "react";
import useInputState from "../utilities/useInputState";

const EditForm = (props) => {
    const [text, handleChangeText] = useInputState(props.startText);
    const [user, handleChangeUser] = useInputState(props.startUser);
    return (
        <form
            onSubmit={ (e) => {
                e.preventDefault();
                props.editTask(props.taskId, user, text);
                props.toggle();
            } }
            className="EditForm"
        >
            <div className=" flex flex-col">
                <label htmlFor="task" className=" block bg-blue-600 p-2 rounded-t-md text-white ">Task: </label>
                <textarea
                    className=" block w-full  rounded-b-md p-2 bg-gray-100 "
                    type="text"
                    cols="15"
                    rows="5"
                    value={ text }
                    onChange={ handleChangeText }
                    name="task"
                    id="task"
                    required
                ></textarea>
            </div>
            <div className=" mt-3">
                <label htmlFor="user" className="block bg-blue-600 p-2 rounded-t-md text-white">Assigned to(@): </label>
                <input
                    className=" bg-gray-100 block w-full  rounded-b-md p-2"
                    type="text"
                    name="user"
                    id="user"
                    value={ user }
                    onChange={ handleChangeUser }
                    required
                ></input>
            </div>
            <button
                className={ `p-4 rounded-md text-lg my-2 bg-[${props.color}] text-white w-full hstyle` }
                style={ { backgroundColor: `${props.color}` } }
            >
                Save
            </button>
        </form>
    );
};

export default EditForm;
