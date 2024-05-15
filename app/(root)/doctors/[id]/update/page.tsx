import DoctorForm from "@/components/shared/DoctorForm";
import { getDoctorById } from "@/lib/actions/doctor.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

type UpdateDoctorProps = {
  params: {
    id: string;
  };
};

const UpdateDoctor = async ({ params: { id } }: UpdateDoctorProps) => {
  const { sessionClaims } = auth();
  const userRole = sessionClaims?.metadata.role;
  const { userId } = auth();

  const doctor = await getDoctorById(id);

  const transformedDoctor = {
    ...doctor,
    mobileNumber: Number(doctor.mobileNumber),
  };

  return (
    <div className="pt-14">
      <DoctorForm
        userId={userId}
        userRole={userRole || ""}
        type="Update"
        doctor={transformedDoctor}
        doctorId={doctor.id}
      />
    </div>
  );
};

export default UpdateDoctor;
