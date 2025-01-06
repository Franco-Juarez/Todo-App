import { z } from 'zod';

// Schema para la tarea completa
const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title debe ser un string no vacío')
    .max(100, 'Title no puede tener más de 100 caracteres')
    .trim(),
  description: z
    .string()
    .min(1, 'Description debe ser un string no vacío')
    .max(500, 'Description no puede tener más de 500 caracteres')
    .trim(),
  dueDate: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      'DueDate debe ser una fecha válida en formato ISO (ej. 2024-12-31T23:59:59)'
    )
    .refine(
      (date) => new Date(date).getTime() > Date.now(),
      'DueDate debe ser una fecha futura'
    ),
  priority: z
    .string()
    .min(1, 'Priority debe ser un string no vacío')
    .max(20, 'Priority no puede tener más de 20 caracteres')
    .trim(),
  completed: z
    .boolean()
    .optional(),
  tags: z
    .array(
      z
        .string()
        .min(1, 'Cada tag debe ser un string no vacío')
        .max(50, 'Cada tag no puede tener más de 50 caracteres')
        .trim()
    )
    .max(10, 'No se pueden incluir más de 10 tags') // Limitar el número máximo de tags
    .optional(), // Si `tags` es opcional
});

// Schema para la tarea parcial (cuando solo se actualizan algunos campos)
const partialTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title debe ser un string no vacío')
    .max(100, 'Title no puede tener más de 100 caracteres')
    .trim()
    .optional(),
  description: z
    .string()
    .min(1, 'Description debe ser un string no vacío')
    .max(500, 'Description no puede tener más de 500 caracteres')
    .trim()
    .optional(),
  dueDate: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      'DueDate debe ser una fecha válida'
    )
    .refine(
      (date) => new Date(date).getTime() > Date.now(),
      'DueDate debe ser una fecha futura'
    )
    .optional(),
  priority: z
    .string()
    .min(1, 'Priority debe ser un string no vacío')
    .max(20, 'Priority no puede tener más de 20 caracteres')
    .trim()
    .optional(),
  completed: z
    .boolean()
    .optional(),
  tags: z
    .array(
      z
        .string()
        .min(1, 'Cada tag debe ser un string no vacío')
        .max(50, 'Cada tag no puede tener más de 50 caracteres')
        .trim()
    )
    .max(10, 'No se pueden incluir más de 10 tags')
    .optional(),
});

// Exportar ambos esquemas
export { taskSchema, partialTaskSchema };
