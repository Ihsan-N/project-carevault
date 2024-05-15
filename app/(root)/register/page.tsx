import PatientAdditionalInfoForm from "@/components/shared/PatientAdditionalInfoForm";
import PatientForm from "@/components/shared/PatientForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const { sessionClaims } = auth();

  const userRole = sessionClaims?.metadata.role;

  const { userId } = auth();

  if (
    sessionClaims?.metadata.role !== "patient_admin" &&
    sessionClaims?.metadata.role !== "senior_admin"
  ) {
    redirect("/");
  }
  return (
    <section>
      <div className="pt-20">
        <h1 className="font-bold text-4xl">Register</h1>
      </div>
      <div className="mt-10">
        <PatientForm userRole={userRole || ""} userId={userId} />
      </div>
    </section>
  );
};

export default Page;
