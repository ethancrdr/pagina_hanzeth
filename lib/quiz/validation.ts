import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre.'),
  email: z.string().trim().email('Ingresa un correo válido.'),
  cc: z.string().min(1, 'Selecciona un código de país.'),
  phone: z
    .string()
    .trim()
    .min(6, 'Ingresa un número válido.')
    .regex(/^[\d\s().-]+$/, 'Sólo dígitos y separadores.'),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
