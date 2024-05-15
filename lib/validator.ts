import * as z from "zod";

export const patientFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "FirstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "LastName must be at least 2 characters.",
  }),
  aadharNumber: z.coerce.number().min(2),
  mobileNumber: z.coerce.number().min(2),
  age: z.coerce.number().min(1),
  gender: z.string(),
  maritalStatus: z.string(),
  bloodGroup: z.string().min(1),
  dob: z.date(),
  address: z.string().min(3),
});

export const patientAdditionalInfoFormSchema = z.object({
  date: z.date(),
  doctorName: z.string().min(2, {
    message: "Doctor name must be at least 2 characters.",
  }),
  disease: z.string().min(2, {
    message: "Disease must be at least 2 characters.",
  }),
  medicine: z.string().min(2, {
    message: "Medicine must be at least 2 characters.",
  }),
  treatment: z.string().min(2, {
    message: "Treatment must be at least 2 characters.",
  }),
});

export const doctorFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "FirstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "LastName must be at least 2 characters.",
  }),
  mobileNumber: z.coerce.number().min(2),
  email: z.string().min(4),
  age: z.coerce.number().min(1),
  gender: z.string(),
  dob: z.date(),
  specialization: z.string(),
  imageUrl: z.string(),
});
