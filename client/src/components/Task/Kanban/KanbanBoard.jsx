import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, moveTask as moveTaskAction, selectAllTasks } from '../../../slices/task'; 
import { useParams } from 'react-router-dom';
import axios from '../../../axios'; 
import "./card-task.css"
import Column from './Column'; 

const KanbanBoard = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const columns = [
        { id: 'new', title: 'Нове' },
        { id: 'in-progress', title: 'В процесі' },
        { id: 'completed', title: 'Виконано' },
    ];

    useEffect(() => {
        dispatch(fetchTasks(projectId)); 
    }, [dispatch, projectId]);

    const handleTaskDrop = async (taskId, targetColumnId) => {
        try {
            await axios.patch(`/${projectId}/tasks/${taskId}`, {
                status: targetColumnId, 
            });
            
            dispatch(moveTaskAction({ taskId, targetColumnId }));
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban_board">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        column={column}
                        tasks={tasks.filter((task) => task.status === column.id)}
                        onTaskDrop={handleTaskDrop}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default KanbanBoard;
