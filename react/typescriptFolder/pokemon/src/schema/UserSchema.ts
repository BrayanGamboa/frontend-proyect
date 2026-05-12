import { z } from 'zod';

export const UserSchema = z.object({
  userName: z.string().min(3, 'Mínimo 3 letras').max(20, 'Máximo 20 letras'),
  email: z.string().email('Correo electrónico no válido'),
  points: z.number().int().positive('Los puntos deben ser un número entero positivo'),
  birthDate: z.date().optional()
});

export type User = z.infer<typeof UserSchema>;