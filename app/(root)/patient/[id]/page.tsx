import PatientAdditionalInfoForm from "@/components/shared/PatientAdditionalInfoForm";
import { auth } from "@clerk/nextjs";
import React from "react";

interface Params {
  id: string;
}

const Page = ({ params }: { params: Params }) => {
  const { sessionClaims } = auth();

  const userRole = sessionClaims?.metadata.role;

  const { userId } = auth();

  return (
    <div className="pt-14">
      <PatientAdditionalInfoForm
        id={params.id}
        userRole={userRole || ""}
        userId={userId}
      />
    </div>
  );
};

export default Page;
