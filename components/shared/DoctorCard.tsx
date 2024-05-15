import { auth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface DoctorCardProps {
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    mobileNumber: bigint;
    email: string;
    age: number;
    gender: string;
    dob: Date;
    specialization: string;
    imageUrl: string | null;
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { sessionClaims } = auth();
  const userRole = sessionClaims?.metadata.role;

  const { userId } = auth();
  return (
    <div className="p-4 border bg-white rounded-md shadow-[0px_4px_15px_0px_#9b92d6] relative dark:bg-slate-950">
      <Image
        src={doctor.imageUrl || "/default-doctor-image.jpg"}
        alt={`${doctor.firstName} ${doctor.lastName}`}
        className="w-full object-cover rounded-md"
        width={600}
        height={600}
      />

      {sessionClaims?.metadata.role === "senior_admin" && (
        <div className="absolute top-5 right-5 flex gap-2">
          <Link
            href={`/doctors/${doctor.id}/update`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 p-3 rounded-lg"
          >
            <Pencil className="h-5 w-5" />
          </Link>
          <DeleteButton
            id={doctor.id}
            userId={userId}
            userRole={userRole || ""}
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mt-2">
          {doctor.firstName} {doctor.lastName}
        </h2>
        <h2 className="font-medium">Age - {doctor.age}</h2>
      </div>
      <p className="text-gray-500">{doctor.specialization}</p>

      <div className="flex justify-between items-center">
        <h2 className="font-medium">{doctor.email}</h2>
        <h2 className="capitalize font-medium">{doctor.gender}</h2>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-medium">{doctor.mobileNumber.toString()}</h2>
        <h2 className="capitalize font-medium">
          {doctor.dob.toLocaleDateString()}
        </h2>
      </div>
    </div>
  );
};

export default DoctorCard;
