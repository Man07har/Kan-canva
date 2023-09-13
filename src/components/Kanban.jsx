import React, { useEffect, useState } from "react";
import { columnsRawData } from "../data/KanbanData";
import Stage from "./Stage";

import Modal from "./Modal";
import { DragDropContext } from "react-beautiful-dnd";

const Kanban = () => {
    const [columns, setColumns] = useState(
        JSON.parse(window.localStorage.getItem("columns")) || columnsRawData
    );
    const [modal, setModal] = useState(false);


    // CRUD FUNCTIONS -----------------
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            console.log("no destination");
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log("index and destination the same");
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);

            const swapTask = newTaskIds[source.index];
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, swapTask);

            const newColumnsState = columns.map((c) => {
                if (c.id === start.id) {
                    c.taskIds = newTaskIds;
                    return c;
                } else return c;
            });

            const newColumnsState2 = [...newColumnsState];
            setColumns(newColumnsState2);
        } else {
            if (finish.taskIds.length < finish.limit) {
                const startTaskIds = Array.from(start.taskIds);
                const [item] = startTaskIds.splice(source.index, 1);

                const finishTaskIds = Array.from(finish.taskIds);
                finishTaskIds.splice(destination.index, 0, item);

                const newColumnsState = columns.map((c) => {
                    if (c.id === start.id) {
                        c.taskIds = startTaskIds;
                        return c;
                    } else if (c.id === finish.id) {
                        c.taskIds = finishTaskIds;
                        return c;
                    } else return c;
                });
                const newColumnsState2 = [...newColumnsState];
                setColumns(newColumnsState2);
            } else return;
        }
    };

    const openModal = (data) => {
        const columnId = data.id;
        setModal(columnId);
    };

    const closeModal = () => {
        setModal(false);
    };

    const addTask = (newTask) => {
        setModal(false);
        const updatedColumns = columns.map((column) => {
            if (column.id === newTask.idColumn && column.taskIds.length < 5) {
                column.taskIds.push(newTask);
                return column;
            } else return column;
        });
        setColumns(updatedColumns);
    };

    const removeTask = (taskId) => {
        const updatedColumns = columns
            .map((column) => {
                return Object.assign({}, column, {
                    taskIds: column.taskIds.filter(
                        (task) => task.id !== taskId
                    ),
                });
            })
            .filter((column) => column.taskIds.length >= 0);
        setColumns(updatedColumns);
    };

    const editTask = (taskId, newUser, newText) => {
        const updatedColumns = columns.map((column) => {
            return Object.assign({}, column, {
                taskIds: column.taskIds.map((task) => {
                    if (task.id === taskId) {
                        task.user = newUser;
                        task.text = newText;
                        return task;
                    }
                    return task;
                }),
            });
        });
        setColumns(updatedColumns);
    };

    useEffect(() => {
        window.localStorage.setItem("columns", JSON.stringify(columns));
    }, [columns]);

    return (
        <>

            <DragDropContext onDragEnd={ onDragEnd }>
                <div className="bg-gray-100 container min-h-screen  mx-auto  mt-4 mx-3">
                    <div className=" container max-w-screen-xl  mx-auto">
                        { modal && (
                            <Modal
                                closeModal={ closeModal }
                                addTask={ addTask }
                                columnData={ modal }
                            />
                        ) }
                        <h1 className=" text-4xl font-black my-3 " >:Kanban <span className="text-sm font-normal">[ kahn-bahn ]</span></h1>
                        <div className=" flex justify-center flex-col md:flex-row">
                            { columns.map((c) => {
                                return (
                                    <Stage
                                        columnData={ c }
                                        key={ c.name }
                                        openModal={ openModal }
                                        removeTask={ removeTask }
                                        editTask={ editTask }
                                    />
                                );
                            }) }
                        </div>
                    </div>
                </div>
            </DragDropContext>
        </>
    );
};

export default Kanban;
