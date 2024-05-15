export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "doctor" | "senior_admin" | "patient_admin";
    };
  }
}
