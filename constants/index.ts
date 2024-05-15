export const sidebarLinks = [
  {
    imgURL: "/assets/home1.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/dashboard-icon.png",
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: "/assets/patient.png",
    route: "/patient",
    label: "Patient",
  },
  {
    imgURL: "/assets/appointment.png",
    route: "/register",
    label: "Register",
  },
  {
    imgURL: "/assets/doctor.png",
    route: "/doctors",
    label: "Doctors",
  },
];

export const doctorDefaultValues = {
  firstName: "",
  lastName: "",
  mobileNumber: 0,
  email: "",
  age: 0,
  gender: "",
  dob: new Date(),
  specialization: "",
  imageUrl: "",
};
