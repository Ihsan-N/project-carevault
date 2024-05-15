"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAction } from "./log.actions";

type UpdateDoctorParams = {
  userId: string | null;
  userRole: string | null;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    mobileNumber: number;
    email: string;
    age: number;
    gender: string;
    dob: Date;
    specialization: string;
    imageUrl: string | null;
  };
  path: string;
};

interface createDoctorProps {
  userId: string | null;
  userRole: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  email: string;
  age: number;
  gender: string;
  dob: Date;
  specialization: string;
  imageUrl: string | null;
}

export async function createDoctor({
  userId,
  userRole,
  firstName,
  lastName,
  mobileNumber,
  email,
  age,
  gender,
  dob,
  specialization,
  imageUrl,
}: createDoctorProps) {
  try {
    const newDoctor = await prisma.doctor.create({
      data: {
        firstName,
        lastName,
        mobileNumber,
        email,
        age,
        gender,
        dob,
        specialization,
        imageUrl,
      },
    });

    console.log("Logging action with userId:", userId);
    await logAction(
      userId,
      userRole,
      "create doctor",
      `Created a new doctor with ID ${newDoctor.id}`
    );

    revalidatePath("/doctors");
    return newDoctor;
  } catch (error: any) {
    throw new Error(`Failed to create doctor: ${error.message}`);
  }
}

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany();
    return doctors;
  } catch (error: any) {
    throw new Error(`Failed to create patient: ${error.message}`);
  }
}

export async function getDoctorById(doctorId: string) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) throw new Error("Event not found");

    return doctor;
  } catch (error: any) {
    throw new Error(`Failed to update doctor: ${error.message}`);
  }
}

interface deleteDoctorProps {
  id: string;
  userId: string | null;
  userRole: string | null;
}

export async function deleteDoctor({
  id,
  userId,
  userRole,
}: deleteDoctorProps) {
  try {
    const deleteDoctor = await prisma.doctor.delete({
      where: { id },
    });

    console.log("Logging action with userId:", userId);
    await logAction(
      userId,
      userRole,
      "delete doctor",
      `Deleted a doctor with ID ${deleteDoctor.id}`
    );

    revalidatePath("/doctors");
    return deleteDoctor;
  } catch (error: any) {
    throw new Error(`Failed to delete doctor: ${error.message}`);
  }
}

export async function updateDoctor({
  userId,
  userRole,
  doctor,
  path,
}: UpdateDoctorParams) {
  try {
    const doctorToUpdate = await prisma.doctor.findUnique({
      where: { id: doctor.id },
    });

    if (!doctorToUpdate) throw new Error("Doctor not found");

    const updateDoctor = await prisma.doctor.update({
      where: { id: doctor.id },
      data: {
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        mobileNumber: doctor.mobileNumber,
        email: doctor.email,
        age: doctor.age,
        gender: doctor.gender,
        dob: doctor.dob,
        specialization: doctor.specialization,
        imageUrl: doctor.imageUrl,
      },
    });

    await logAction(
      userId,
      userRole,
      "update doctor",
      `Updated a doctor with ID ${doctor.id}`
    );

    revalidatePath(path);
    return updateDoctor;
  } catch (error: any) {
    throw new Error(`Failed to update doctor: ${error.message}`);
  }
}
