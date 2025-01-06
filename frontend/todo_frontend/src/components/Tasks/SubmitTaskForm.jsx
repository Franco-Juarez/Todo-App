import { CirclePlus } from "lucide-react";
import { Paperclip } from "lucide-react";

// eslint-disable-next-line react/prop-types
const SubmitTaskForm = ({ handleSubmit, handleChange, formData, showAlert, isEditMode }) => {
  
  const handleTagsChange = (event) => {
    const tags = event.target.value;
    // Convertimos el string separado por comas en un array de strings
    const tagsArray = tags.split(",").map(tag => tag.trim());
    
    // Actualizamos el estado con el array de tags
    handleChange({
      target: {
        name: "tags",
        value: tagsArray,
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex md:space-x-4 flex-col items-start justify-start md:flex-row">
      <div className="flex flex-col flex-1 w-full">
      <label htmlFor="title" className="text-gray-600 font-medium text-left pb-2">
          Task Name
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={isEditMode ? "Update task name" : "Enter task name"}
        />
        </div>
        <div className="flex flex-col flex-1 w-full">
          <label htmlFor="priority" className="text-gray-600 font-medium text-left pb-2">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-gray-600 font-medium text-left pb-2">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="md:min-h-20 border border-gray-300 border-dashed rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={isEditMode ? "Update task description" : "Add task description"}
        />
      </div>

      <div className="flex md:space-x-4 flex-col md:flex-row">
        <div className="flex flex-col flex-1 w-full">
          <label htmlFor="dueDate" className="text-gray-600 font-medium text-left pb-2">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="tags" className="text-gray-600 font-medium text-left pb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder={isEditMode ? "Update tags (comma-separated)" : "Add tags (comma-separated)"}
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t flex-col md:flex-row gap-4">
        <button
          onClick={showAlert}
          type="button"
          className="w-full md:max-w-40 justify-center flex gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
        >
          <Paperclip />
          Attach
        </button>
        <button
          type="submit"
          className="w-full md:max-w-44 justify-center flex gap-2 bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
        >
          <CirclePlus />
          {isEditMode ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default SubmitTaskForm;
