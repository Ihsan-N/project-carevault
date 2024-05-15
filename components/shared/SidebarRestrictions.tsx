import { sidebarLinks } from "@/constants";
import { auth } from "@clerk/nextjs";
import React from "react";
import LeftSidebar from "./LeftSidebar";

const SidebarRestrictions = () => {
  const { sessionClaims } = auth();

  // Adjust the filter logic to exclude /dashboard for patient_admin users
  const filteredSidebarLinks = sidebarLinks.filter(
    (link) =>
      !(
        link.route === "/dashboard" &&
        sessionClaims?.metadata.role === "patient_admin"
      ) &&
      !(
        link.route === "/patient" &&
        sessionClaims?.metadata.role === "senior_admin"
      ) &&
      !(
        link.route === "/patient" &&
        sessionClaims?.metadata.role === "patient_admin"
      ) &&
      !(
        link.route === "/dashboard" && sessionClaims?.metadata.role === "doctor"
      ) &&
      !(link.route === "/register" && sessionClaims?.metadata.role === "doctor")
  );

  return <LeftSidebar filteredSidebarLinks={filteredSidebarLinks} />;
};

export default SidebarRestrictions;
