import DoctorCard from "@/components/shared/DoctorCard";
import DoctorForm from "@/components/shared/DoctorForm";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const doctors = await getDoctors();
  const { sessionClaims } = auth();
  const userRole = sessionClaims?.metadata.role;

  const { userId } = auth();

  if (sessionClaims?.metadata.role === "senior_admin") {
    return (
      <div className="pt-14">
        <DoctorForm userId={userId} type="Create" userRole={userRole || ""} />
        <div className="pt-16">
          {doctors.length > 0 && (
            <h1 className="font-bold text-4xl mb-4">All Doctors</h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {doctors.length > 0 && (
        <h1 className="font-bold text-4xl mb-4">All Doctors</h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Page;
