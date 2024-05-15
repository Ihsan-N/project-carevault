"use server";

import prisma from "@/lib/prisma";
import { logAction } from "./log.actions";

interface createPatientProps {
  userRole: string | null;
  userId: string | null;
  firstName: string;
  lastName: string;
  aadharNumber: number;
  mobileNumber: number;
  age: number;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  dob: Date;
  address: string;
}

export async function createPatient({
  userRole,
  userId,
  firstName,
  lastName,
  aadharNumber,
  mobileNumber,
  age,
  gender,
  maritalStatus,
  bloodGroup,
  dob,
  address,
}: createPatientProps) {
  try {
    const uniqueCode = `${aadharNumber.toString().slice(0, 4)}${firstName}`;
    const newPatient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        aadharNumber,
        mobileNumber,
        age,
        gender,
        maritalStatus,
        bloodGroup,
        dob,
        address,
        uniqueCode,
      },
    });

    console.log("Logging action with userId:", userId);
    await logAction(
      userId,
      userRole,
      "create patient",
      `Created a new patient with ID ${newPatient.id}`
    );

    return newPatient;
  } catch (error: any) {
    throw new Error(`Failed to create patient: ${error.message}`);
  }
}

interface createPatientAdditionalInfoProps {
  userId: string | null;
  userRole: string | null;
  date: Date;
  doctorName: string;
  disease: string;
  medicine: string;
  treatment: string;
  patientId: string;
}

export async function createPatientAdditionalInfo({
  userId,
  userRole,
  date,
  doctorName,
  disease,
  medicine,
  treatment,
  patientId,
}: createPatientAdditionalInfoProps) {
  try {
    const newPatientAdditionalInfo = await prisma.patientAdditionalInfo.create({
      data: {
        date,
        doctorName,
        disease,
        medicine,
        treatment,
      },
    });

    console.log("Logging action with userId:", userId);
    await logAction(
      userId,
      userRole,
      "create Additional Patient Information",
      `Created a additional patient information ${patientId}`
    );

    await prisma.patientAdditionalInfoPatient.create({
      data: {
        patientId: patientId,
        infoId: newPatientAdditionalInfo.id,
      },
    });

    return newPatientAdditionalInfo;
  } catch (error: any) {
    throw new Error(
      `Failed to create patient additional info: ${error.message}`
    );
  }
}

export async function searchPatientByUniqueCode(uniqueCode: string) {
  const patient = await prisma.patient.findUnique({
    where: { uniqueCode },
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
}

export async function searchPatientInfoById(id: string) {
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      PatientAdditionalInfoPatient: {
        include: {
          info: true,
        },
        orderBy: {
          info: {
            date: "desc",
          },
        },
        take: 3,
      },
    },
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  const patientInfo = patient.PatientAdditionalInfoPatient.map(
    (patientInfoPatient) => ({
      date: patientInfoPatient.info.date,
      doctorName: patientInfoPatient.info.doctorName,
      disease: patientInfoPatient.info.disease,
      medicine: patientInfoPatient.info.medicine,
      treatment: patientInfoPatient.info.treatment,
    })
  );

  return patientInfo;
}
