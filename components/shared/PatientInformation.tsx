"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { searchPatientInfoById } from "@/lib/actions/patient.actions";

interface PatientInformationProps {
  id: string;
  firstName: string;
  lastName: string;
  aadharNumber: string;
  mobileNumber: string;
  address: string;
}

type PatientInfo = {
  date: Date;
  doctorName: string;
  disease: string;
  medicine: string;
  treatment: string;
}[];

const PatientInformation = ({
  id,
  firstName,
  lastName,
  aadharNumber,
  mobileNumber,
  address,
}: PatientInformationProps) => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const info = await searchPatientInfoById(id);
      setPatientInfo(info);
    };

    fetchPatientInfo();
  }, [id]);

  return (
    <div className="bg-white rounded-[47px] p-9 shadow-[0px_4px_15px_0px_#9b92d6] dark:bg-slate-950">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Patient Information</h1>
        <Link
          href={`/patient/${id}`}
          className="bg-[#FF706F] px-2 py-2 rounded-lg text-white font-medium text-sm"
        >
          Add Treatment Details
        </Link>
      </div>

      <div className="flex mt-8">
        <Image
          src="/assets/no-profile.png"
          alt="patient"
          width={770}
          height={770}
          className="rounded-[47px] shadow-[0px_4px_15px_0px_#D8D2FC] mr-5"
        />

        <div className="rounded-[47px] shadow-[0px_4px_15px_0px_#D8D2FC] py-9 px-10">
          <h3 className="font-semibold text-lg mb-1">About Patient</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.Lorem Ipsum has
            been the industry&apos;s standard dummy text ever since the 1500s,
            when an unknown.
          </p>

          <div className="mt-10 flex justify-between">
            <div>
              <h4 className="font-bold mb-1">Name</h4>
              <p>
                {firstName} {lastName}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-1">Phone Number</h4>
              <p>+91 {mobileNumber}</p>
            </div>
            <div>
              <h4 className="font-bold mb-1">Address</h4>
              <p>{address}</p>
            </div>
            <div>
              <h4 className="font-bold mb-1">Aadhar Number</h4>
              <p>{aadharNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <div className="rounded-[47px] shadow-[0px_4px_15px_0px_#D8D2FC] py-9 px-10 mt-5 w-full">
          <h3 className="font-bold text-lg mb-5">Past Visit History</h3>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#EDF4FC] dark:bg-slate-800">
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Disease</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead>Treatment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientInfo?.map((info, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {info.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{info.doctorName}</TableCell>
                  <TableCell>{info.disease}</TableCell>
                  <TableCell>{info.medicine}</TableCell>
                  <TableCell>{info.treatment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PatientInformation;
