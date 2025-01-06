import { SquareCheckBig } from "lucide-react";
import { Paperclip, Trash2, Square, Pencil } from "lucide-react";

const TaskCard = ({ isCompleted, title, description, tags, onDelete, onUpdate, onTaskDone }) => {
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <header className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-200 rounded-full px-2 py-1 text-xs font-semibold text-blue-800"
            >
              {tag}
            </span>
          ))}
          <span
            className={`inline-block ${
              isCompleted ? "bg-green-200" : "bg-gray-200"
            } rounded-full px-2 py-1 text-xs font-semibold text-${
              isCompleted ? "green" : "gray"
            }-800`}
          >
            {isCompleted ? "Completed" : "Incompleted"}
          </span>
        </div>
        {
          isCompleted ? <SquareCheckBig onClick={onTaskDone} className="text-gray-400 hover:text-gray-600 cursor-pointer" /> : <Square onClick={onTaskDone} className="text-gray-400 hover:text-gray-600 cursor-pointer" /> 
        }
        
      </header>
      <h4
        className={`text-lg font-semibold mb-2 text-left ${
          isCompleted ? "line-through text-gray-500" : ""
        }`}
      >
        {title}
      </h4>
      <p
        className={`text-gray-600 mb-4 text-left ${
          isCompleted ? "line-through text-gray-500" : ""
        }`}
      >
        {description}
      </p>
      <div className="flex justify-between items-center">
        <span className="flex items-center text-gray-500 transition-colors duration-200">
          <Paperclip className="hover:text-gray-800 cursor-pointer" />2
        </span>
        <div className="flex space-x-4">
          <Pencil
            onClick={onUpdate}
            className="cursor-pointer text-gray-500 hover:text-green-400 transition-colors duration-200"
          />
          <Trash2
            onClick={onDelete}
            className="text-gray-500 transition-colors duration-200 hover:text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
