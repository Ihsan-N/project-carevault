import PatientSearchForm from "@/components/shared/PatientSearchForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const { sessionClaims } = auth();

  if (
    sessionClaims?.metadata.role !== "doctor" &&
    sessionClaims?.metadata.role !== "senior_admin"
  ) {
    redirect("/");
  }
  return (
    <div>
      <PatientSearchForm />
    </div>
  );
};

export default Page;
