import { createZodDto } from '@/src/auth/pipe/zod-validation.type';
import { z } from 'zod';
import { generateSchema } from '@anatine/zod-openapi';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.,<>?/;"'{()\[\]=+!@#$%^&*]).{8,}$/, "Invalid password. Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."),
  remember_me: z.boolean(),
})
.required();

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.,<>?/;"'{()\[\]=+!@#$%^&*]).{8,}$/, "Invalid password. Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email()
})

export const resetPasswordPostSchema = z.object({
  newPassword: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.,<>?/;"'{()\[\]=+!@#$%^&*]).{8,}$/, "Invalid password. Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
})

export const resetPasswordPostTokenSchema = z.object({
  token: z.string()
});
// export type SignInDto = z.infer<typeof signInSchema>;
// export type SignUpDto = z.infer<typeof signUpSchema>;
// export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export class SignInDto extends createZodDto(signInSchema) {}
export const SignInSchema = generateSchema(signInSchema);

export class SignUpDto extends createZodDto(signUpSchema) {}

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}

export class ResetPasswordPostDto extends createZodDto(resetPasswordPostSchema) {}

export class ResetPasswordPostTokenDto extends createZodDto(resetPasswordPostTokenSchema) {}