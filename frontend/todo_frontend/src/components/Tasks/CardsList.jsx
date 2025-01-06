import PopUpTaskForm from "./PopUpTaskForm";
import TaskCard from "./TaskCard";
import { PlusCircle } from "lucide-react";
import useTasks from "../../hooks/useTasks";
import { useModal } from '../../context/ModalContext';
import { useEffect } from "react";
import api from "../../utils/api";


const CardsList = () => {
  const { tasks, setTasks, deleteTask, updateTaskStatus} = useTasks();
  const { showModal, setModalData } = useModal();

  const handleDelete = async (id) => {
    await deleteTask(id)
  };

  const handleUpdate = async (task) => {
    try {
      await setModalData(task); // Pass task data to modal
      await showModal(); // Show the modal
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskDone = async (id, currentStatus) => {
    await updateTaskStatus(id, !currentStatus);
    getTasks();
  };

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTasks(response.data);
    console.log(tasks)
  }

  useEffect(() => {
    getTasks();
  }, [handleDelete, handleUpdate, handleTaskDone]);
  
  const startedTasks = tasks.filter(task => !task.completed);
  const doneTasks = tasks.filter(task => task.completed);

  return (
    <div className="lg:col-span-9 lg:row-span-2 p-4 bg-white shadow-md rounded-md">
      <header className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={showModal}
          className="flex items-center gap-2 bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md"
        >
          <PlusCircle />
          New Task
        </button>
      </header>
      <div className="grid grid-cols-2 gap-8 mt-4">
        <div>
          <h4 className="text-left text-xl font-semibold text-gray-500">Started</h4>
          <div className="mt-2 flex flex-col-reverse">
            {startedTasks.map(task => (
              <TaskCard
                key={task.id}
                isCompleted={false}
                title={task.title}
                description={task.description}
                tags={task.tags}
                onTaskDone={ () => handleTaskDone(task.id, task.completed)}
                onDelete={() => handleDelete(task.id)}
                onUpdate={() => handleUpdate(task)}
              />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-left text-xl font-semibold text-gray-500">Done</h4>
          <div className="mt-2 flex flex-col-reverse">
            {doneTasks.map(task => (
              <TaskCard
                key={task.id}
                isCompleted={true}
                title={task.title}
                description={task.description}
                tags={task.tags}
                onTaskDone={ () => handleTaskDone(task.id, task.completed)}
                onDelete={() => handleDelete(task.id)}
                onUpdate={() => handleUpdate(task)}
              />
            ))}
          </div>
        </div>
      </div>
      <PopUpTaskForm 
      />
    </div>
  );
};

export default CardsList;
