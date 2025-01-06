import Task from '../models/task.js';
import fs from 'fs';
import { partialTaskSchema, taskSchema } from '../schemas/taskSchema.js';



let tasks = [];
const loadTasks = () => {
  // LEER EL ARCHIVO JSON DE TAREAS DESDE EL FILESYSTEM
  const data = fs.readFileSync('tasks.json');
  // PARSEAR EL CONTENIDO DEL ARCHIVO JSON
  tasks = JSON.parse(data);
}

// OBTENER TODAS LAS TAREAS
const getAllTasks = (req, res) => {
  loadTasks();
  // DEVOLVER TODAS LAS TAREAS
  res.json(tasks);
};

// OBTENER UNA TAREA POR SU ID
const getTaskById = (req, res) => {
  // OBTENER EL ID DE LA TAREA
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'Task ID is required' });
  }
  // BUSCAR LA TAREA POR SU ID
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  // DEVOLVER LA TAREA
  res.status(200).json(task);
}

// CREAR UNA TAREA
const createTask = (req, res) => {
  const taskData = taskSchema.parse(req.body);
  // RECIBE EL BODY DE LA PETICIÓN E INSTANCIA UN OBJETO DE LA CLASE TASK
  try {
    loadTasks();
    const newTask = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, taskData.completed, taskData.tags);

    // Agregar la nueva tarea a la lista de tareas
    tasks.push(newTask.toJSON());
    // Guardar las tareas actualizadas en el archivo JSON
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));

    // Responder con la tarea recién creada
    return res.status(201).json(newTask.toJSON());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating task' });
  }
}

// ACTUALIZAR UNA TAREA
const updateTask = (req, res) => {
  const { id } = req.params;
  loadTasks();

  if (!id) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  // Buscar la tarea por su ID
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const actualTask = tasks[taskIndex];
  const taskData = partialTaskSchema.parse(req.body);

  try {
    // COMPARAR AMBOS OBJETOS Y REEMPLAZAR SOLO LOS DATOS DIFERENTES
    const updatedTaskData = { ...actualTask, ...taskData };
    const updatedTask = new Task(
      updatedTaskData.title || actualTask.title,
      updatedTaskData.description || actualTask.description,
      updatedTaskData.dueDate || actualTask.dueDate,
      updatedTaskData.priority || actualTask.priority,
      updatedTaskData.completed !== undefined ? updatedTaskData.completed : actualTask.completed,
      updatedTaskData.tags || actualTask.tags
    );
    updatedTask.setId(id);

    // Actualizar la tarea en la lista de tareas
    tasks[taskIndex] = updatedTask.toJSON();

    // Guardar las tareas actualizadas en el archivo JSON
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));

    // Responder con la tarea actualizada
    res.status(200).json({ message: 'Task updated', task: updatedTask.toJSON() });
  } catch (error) {
    // Manejar errores de validación de la clase Task
    return res.status(400).json({ error: error.message });
  }
};

// ELIMINAR UNA TAREA
const deleteTask = (req, res) => {
  const id = req.params.id;
  loadTasks();
  if (!id) {
    return res.status(400).json({ error: 'Task ID is required' });
  }
  // BUSCAR LA TAREA POR SU ID
  const task = tasks.some((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  // ELIMINAR LA TAREA
  tasks = tasks.filter((task) => task.id !== id);
  // GUARDAR LAS TAREAS ACTUALIZADAS EN EL ARCHIVO JSON
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
  // RESPONDER CON UN MENSAJE DE ÉXITO Y MOSTRAR LA TAREA ELIMINADA
  res.status(200).json({ message: 'Task deleted', taskId: id });
}

// EXPORTAR TODAS LAS FUNCIONES

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
