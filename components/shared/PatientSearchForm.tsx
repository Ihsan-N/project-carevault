"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { searchPatientByUniqueCode } from "@/lib/actions/patient.actions";
import PatientInformation from "@/components/shared/PatientInformation";

const searchFormSchema = z.object({
  uniqueCode: z.string().nonempty({ message: "Unique Code is required" }),
});

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  aadharNumber: bigint;
  mobileNumber: bigint;
  age: number;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  dob: Date;
  address: string;
  uniqueCode: string;
  createdAt: Date;
};

export default function PatientSearchForm() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      uniqueCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof searchFormSchema>) {
    try {
      const foundPatient = await searchPatientByUniqueCode(values.uniqueCode);
      setPatient(foundPatient);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-14">
      <div className="bg-white rounded-[47px] p-9 shadow-[0px_4px_15px_0px_#9b92d6] dark:bg-slate-950">
        <h1 className="font-bold text-xl mb-8">Search Patient</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="uniqueCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Patient ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Patient ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Search
            </Button>
          </form>
        </Form>
      </div>

      {patient && (
        <div className="bg-white rounded-[47px] p-9 shadow-[0px_4px_15px_0px_#9b92d6] mt-8 dark:bg-slate-950">
          {/* <h1 className="font-bold text-xl mb-8">Patient Information</h1>
          <p>First Name: {patient.firstName}</p>
          <p>Last Name: {patient.lastName}</p>
          <p>Aadhar Number: {patient.aadharNumber.toString()}</p>
          <p>Mobile Number: {patient.mobileNumber.toString()}</p>
          <p>Age: {patient.age}</p>
          <p>Gender: {patient.gender}</p>
          <p>Marital Status: {patient.maritalStatus}</p>
          <p>Blood Group: {patient.bloodGroup}</p>
          <p>Date of Birth: {patient.dob.toLocaleDateString()}</p>
          <p>Address: {patient.address}</p> */}
          <PatientInformation
            id={patient.id}
            firstName={patient.firstName}
            lastName={patient.lastName}
            aadharNumber={patient.aadharNumber.toString()}
            mobileNumber={patient.mobileNumber.toString()}
            address={patient.address}
          />
        </div>
      )}
    </div>
  );
}
