import React from "react";
import useInputState from "../utilities/useInputState";
import { v4 as uuidv4 } from "uuid";

const Modal = (props) => {
    const [text, handleChangeText] = useInputState("");
    const [user, handleChangeUser] = useInputState("");

    const idColumn = props.columnData;

    const newTask = {
        id: uuidv4(),
        text: text,
        idColumn: idColumn,
        user: user,
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-100/70  z-10 flex justify-center items-center">
            <section className="flex  bg-gray-300/70 bg-blend-multiply p-4 rounded-md">

                <form
                    className="flex flex-col "
                    onSubmit={ (e) => {
                        e.preventDefault();
                        props.addTask(newTask);
                    } }
                >
                    <div >
                        <label htmlFor="task " className=" block bg-blue-600 p-2 rounded-t-md text-white" >Task: </label>
                        <textarea
                            className=" block w-full  rounded-b-md p-2 "
                            type="text"
                            cols="20"
                            rows="5"
                            value={ text }
                            onChange={ handleChangeText }
                            name="task"
                            id="task"
                        ></textarea>
                    </div>
                    <div className=" mt-3">
                        <label htmlFor="user" className="block bg-blue-600 p-2 rounded-t-md text-white">Assigned to(@): </label>
                        <input
                            className="Modal-input block w-full  rounded-b-md p-2"
                            type="text"
                            name="user"
                            id="user"
                            value={ user }
                            onChange={ handleChangeUser }
                        ></input>
                    </div>
                    <button className="p-4 rounded-md text-lg my-2 bg-blue-600 text-white w-full hstyle">
                        Submit
                    </button>
                </form>
                <span
                    className=" after:content-['✖'] ms-4 bg-white p-2 h-max rounded-full cursor-pointer hstyle "
                    onClick={ props.closeModal }
                ></span>
            </section>
        </div>
    );
};

export default Modal;
