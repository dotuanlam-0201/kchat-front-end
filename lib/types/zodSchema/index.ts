import { phone } from 'phone';
import { z } from "zod";

export const messageSchema = z.object({
  message: z.string().min(1).trim()
})

export const loginSchema = z.object({
  email: z.string().email().min(1, {
    message: 'Email is required!'
  }),
  password: z.string().min(1, {
    message: 'Password is required!'
  })
})

export const signupSchema = loginSchema.extend({
  phoneNumber: z.string().min(1, {
    message: 'Phone number is required!'
  }),
  confirmPassword: z.string().min(1),
}).superRefine(({ confirmPassword, password, phoneNumber }, ctx) => {
  if (!phone(phoneNumber, { country: 'VN' }).isValid) {
    ctx.addIssue({
      message: 'Phone Number not valid !',
      code: 'custom',
      path: ["phoneNumber"]
    })
  }
  if (confirmPassword !== password) {
    ctx.addIssue({
      message: 'ConfirmPassword and password not matched!',
      code: 'custom',
      path: ['confirmPassword']
    })
  }
})

export const UserProfileSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),

  avatarURL: z.string()
    .optional(),

  displayName: z.string()
    .min(1, 'Display name is required')
    .max(50, 'Display name cannot exceed 50 characters'),
  phoneNumber: z.string()
}).superRefine((data, ctx) => {
  // Validate phone number using the phone library
  if (!phone(data.phoneNumber, { country: 'VN' }).isValid) {
    ctx.addIssue({
      message: 'Phone Number not valid !',
      code: 'custom',
      path: ["phoneNumber"]
    })
  }
});
