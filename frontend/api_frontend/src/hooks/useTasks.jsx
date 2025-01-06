import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../utils/api"; // Instancia de Axios personalizada

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks cuando el hook se monta
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
      showAlert("Error", "No se pudieron cargar las tareas.", "error");
    }
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({ title, text, icon });
  };

  const updateTaskStatus = async (id, currentStatus) => {
    try {
      await api.put(`/tasks/${id}`, { completed: currentStatus });
      await fetchTasks();
      const statusText = currentStatus ? "completada" : "incompleta";
      showAlert("Éxito", `La tarea ha sido marcada como ${statusText}.`, "success");
      console.log(tasks)
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
      showAlert("Error", "No se pudo actualizar el estado de la tarea.", "error");
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await Swal.fire({
        title: "¿Desea borrar la tarea?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      });
      if (response.isConfirmed) {
        await api.delete(`/tasks/${id}`);
        await fetchTasks(); // Actualiza la lista desde el backend
        showAlert("¡Eliminada!", "La tarea ha sido eliminada correctamente.", "success");
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      showAlert("Error", "No se pudo eliminar la tarea.", "error");
    }
  };

  const createTask = async (formData) => {
    if (!formData.title || !formData.description) {
      showAlert("Error", "El título y la descripción son obligatorios.", "error");
      return;
    }
    try {
      await api.post("/tasks", formData);
      await fetchTasks(); // Actualiza la lista desde el backend
      showAlert("Tarea Creada", "Tu tarea ha sido creada con éxito", "success");
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      showAlert("Error", "Hubo un problema al crear la tarea.", "error");
    }
  };

  const updateTask = async (formData, taskId) => {
    try {
      await api.put(`/tasks/${taskId}`, formData);
      await fetchTasks(); // Actualiza la lista desde el backend
      showAlert("Tarea Actualizada", "Tu tarea ha sido actualizada con éxito", "success");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      showAlert("Error", "No se pudo actualizar la tarea.", "error");
    }
  };

  return { tasks, setTasks, updateTaskStatus, deleteTask, createTask, updateTask };
};

export default useTasks;
