import React, { useState } from "react";
import "../../styles/index.css";

//icons
import { AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { GrRotateLeft } from "react-icons/gr";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [hoveredTask, setHoveredTask] = useState(null);
    const [selectedTasks, setSelectedTasks] = useState(new Set());

    const handleAddTask = (e) => {
        if (e.key === "Enter" && newTask.trim() !== "") {
            setTasks([...tasks, { label: newTask, done: false }]);
            setNewTask("");
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleToggleDone = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, done: !task.done } : task
        );
        setTasks(updatedTasks);
    };

    const handleToggleUndone = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, done: false } : task
        );
        setTasks(updatedTasks);
    };

    const handleTaskClick = (index) => {
        const updatedSelectedTasks = new Set(selectedTasks);
        if (updatedSelectedTasks.has(index)) {
            updatedSelectedTasks.delete(index);
        } else {
            updatedSelectedTasks.add(index);
        }
        setSelectedTasks(updatedSelectedTasks);
    };

    const handleSelectAll = () => {
        const allTasksSelected = tasks.map((_, index) => index);
        setSelectedTasks(new Set(allTasksSelected));
    };
    
    const handleDeselectAll = () => {
        setSelectedTasks(new Set());
    };

    const handleDeleteSelected = () => {
        const updatedTasks = tasks.filter((_, i) => !selectedTasks.has(i));
        setTasks(updatedTasks);
        setSelectedTasks(new Set());
    };

    const handleMarkAsDoneSelected = () => {
        const updatedTasks = tasks.map((task, i) =>
            selectedTasks.has(i) ? { ...task, done: true } : task
        );
        setTasks(updatedTasks);
        setSelectedTasks(new Set([...selectedTasks]));
    };
    
    const handleMarkAsUndoneSelected = () => {
        const updatedTasks = tasks.map((task, i) =>
            selectedTasks.has(i) ? { ...task, done: false } : task
        );
        setTasks(updatedTasks);
        setSelectedTasks(new Set([...selectedTasks]));
    };

    const areAllSelectedTasksDone = [...selectedTasks].every(
        (index) => tasks[index].done
    );

    const areAllSelectedTasksUndone = [...selectedTasks].every(
        (index) => !tasks[index].done
    );

    return (
        <div className="container mt-4">
            <h1 className="text-center pb-3">Todo List</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleAddTask}
                />
            </div>
            {tasks.length > 0 ? (
                <div>
                    <div className="mb-2">
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedTasks.size === tasks.length}
                                onChange={selectedTasks.size === tasks.length ? handleDeselectAll : handleSelectAll}
                            />
                            <label className="form-check-label me-3">
                                {selectedTasks.size === tasks.length ? 'Uncheck All' : 'Select All'}
                            </label>
                        </div>
                            {selectedTasks.size > 0 && areAllSelectedTasksDone && (
                                <GrRotateLeft onClick={handleMarkAsUndoneSelected} className="icon yellow" />
                            )}
                            {selectedTasks.size > 0 && areAllSelectedTasksUndone && (
                                <MdDone onClick={handleMarkAsDoneSelected} className="icon green" />
                            )}
                            {selectedTasks.size > 0 && (
                                <AiFillDelete onClick={handleDeleteSelected} className="icon red" />
                            )}
                        </div>
                        <ul className="list-group">
                            {tasks.map((task, index) => (
                                <li
                                    key={index}
                                    className={`list-group-item d-flex justify-content-between align-items-center ${
                                        task.done ? "done" : ""
                                    } form-check`}
                                    onMouseEnter={() => setHoveredTask(index)}
                                    onMouseLeave={() => setHoveredTask(null)}
                                >
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={selectedTasks.has(index)}
                                            onChange={() => handleTaskClick(index)}
                                        />
                                        <span className="form-check-label">
                                            {task.label}
                                        </span>
                                    </div>
                                    {hoveredTask === index && (
                                        <div>
                                            {task.done ? (
                                                <GrRotateLeft onClick={() => handleToggleUndone(index)} className="icon yellow" />
                                            ) : (
                                                <MdDone onClick={() => handleToggleDone(index)} className="icon green"/>
                                            )}
                                            <AiFillDelete onClick={() => handleDeleteTask(index)} className="icon red" />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
            ) : (
                <div className="alert alert-primary mt-3" role="alert">
                    No hay tareas, añadir tareas
                </div>
            )}
        </div>
    );
};

export default Home;