import { createZodDto } from '@/src/auth/pipe/zod-validation.type';
import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[!@#$%^&])(?!.\s).{8,}$/, "Invalid password. Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."),
    remember_me: z.boolean(),
  })
  .required();

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().regex(/^(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[!@#$%^&])(?!.\s).{8,}$/, "Invalid password. Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email()
})

// export type SignInDto = z.infer<typeof signInSchema>;
// export type SignUpDto = z.infer<typeof signUpSchema>;
// export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export class SignInDto extends createZodDto(signInSchema) {}
export class SignUpDto extends createZodDto(signUpSchema) {}
export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}