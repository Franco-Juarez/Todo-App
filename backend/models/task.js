import crypto from 'crypto';
import { taskSchema } from '../schemas/taskSchema.js';

class Task {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #completed;
  #tags;

  constructor (title, description, dueDate, priority, completed = false, tags = []) {
    const taskData = taskSchema.parse({ title, description, dueDate, priority, completed, tags });
    this.#id = crypto.randomBytes(16).toString('hex');
    this.#title = taskData.title;
    this.#description = taskData.description;
    this.#dueDate = taskData.dueDate;
    this.#priority = taskData.priority;
    this.#completed = taskData.completed;
    this.#tags = taskData.tags;
  }

  getTitle () {
    return this.#title;
  }

  getDescription () {
    return this.#description;
  }

  getDueDate () {
    return this.#dueDate;
  }

  getPriority () {
    return this.#priority;
  }

  getId () {
    return this.#id;
  }

  getTags () {
    return this.#tags
  }

  isCompleted () {
    return this.#completed;
  }

  setId (id) {
    this.#id = id;
  }

  setTitle (title) {
    this.#title = title;
  }

  setDescription (description) {
    this.#description = description;
  }

  setDueDate (dueDate) {
    this.#dueDate = dueDate;
  }

  setPriority (priority) {
    this.#priority = priority;
  }

  setCompleteTask () {
    this.#completed = true;
  }

  setTags (tags) {
    this.#tags = tags
  }

  // Método para crear un json con los datos de la tarea
  toJSON () {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      completed: this.#completed,
      tags: this.#tags,
    };
  }

  // Método para crear una tarea a partir de un json
  fromJSON (json) {
    this.#id = json.id;
    this.#title = json.title;
    this.#description = json.description;
    this.#dueDate = json.dueDate;
    this.#priority = json.priority;
    this.#completed = json.completed;
    this.#tags = json.tags;
  }

}

export default Task;