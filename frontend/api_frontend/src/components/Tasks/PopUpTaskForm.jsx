import { X } from "lucide-react";
import Swal from "sweetalert2";
import { useModal } from "../../context/ModalContext";
import SubmitTaskForm from "./SubmitTaskForm";
import useTasks from "../../hooks/useTasks";
import useFormData from "../../hooks/useFormData";

const PopUpTaskForm = () => {
  // REVISAR SI SE PUEDE PASAR ESTA LÓGICA DE GESTION DE DATOS DIRECTAMENTE EN LOS HOOKS DE USE TASKS
  const { isModalVisible, modalData, hideModal } = useModal();
  const { formData, handleChange, handleTagsChange } = useFormData(modalData); // Usamos el hook para gestionar el formulario
  const { updateTask, createTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalData) {
        // Editar tarea
        await updateTask(formData, modalData.id);
      } else {
        // Crear nueva tarea
        await createTask(formData);
      }
      hideModal();
    } catch (error) {
      console.error("Error al enviar tarea:", error);
      Swal.fire("Error", "Hubo un problema al enviar la tarea.", "error");
    }
  };

  return (
    <div
      className={`${
        isModalVisible
          ? "shadow-large block absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "hidden"
      } max-w-4xl w-full mx-auto bg-white p-4 rounded-lg space-y-2`}
    >
      <X onClick={hideModal} className="ml-auto cursor-pointer" />
      <div className="flex gap-6 items-center border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {modalData ? "Edit Task" : "New Task"}
        </h2>
      </div>
      <SubmitTaskForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleTagsChange={handleTagsChange}
        isEditMode={!!modalData}
        formData={formData}
        showAlert={() =>
          Swal.fire("Feature no disponible", "Pronto estará disponible", "info")
        }
      />
    </div>
  );
};

export default PopUpTaskForm;
