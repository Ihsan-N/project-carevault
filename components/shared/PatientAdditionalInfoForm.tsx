"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker from "react-datepicker";

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
import { patientAdditionalInfoFormSchema } from "@/lib/validator";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { createPatientAdditionalInfo } from "@/lib/actions/patient.actions";

interface PatientAdditionalInfoFormProps {
  id: string;
  userId: string | null;
  userRole: string | null;
}

export default function PatientAdditionalInfoForm({
  id,
  userId,
  userRole,
}: PatientAdditionalInfoFormProps) {
  const form = useForm<z.infer<typeof patientAdditionalInfoFormSchema>>({
    resolver: zodResolver(patientAdditionalInfoFormSchema),
    defaultValues: {
      date: new Date(),
      doctorName: "",
      disease: "",
      medicine: "",
      treatment: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof patientAdditionalInfoFormSchema>
  ) {
    try {
      const updatedValues = { ...values, patientId: id, userId, userRole };
      await createPatientAdditionalInfo(updatedValues);
      console.log(updatedValues);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white rounded-[47px] p-9 shadow-[0px_4px_15px_0px_#9b92d6] dark:bg-slate-950">
      <h1 className="font-bold text-xl mb-8">
        Add Patient Treatment Details
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="doctorName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Doctor Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doctor Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disease"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Disease</FormLabel>
                  <FormControl>
                    <Input placeholder="Disease" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="medicine"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Medicine</FormLabel>
                  <FormControl>
                    <Input placeholder="Medicine" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Treatment</FormLabel>
                  <FormControl>
                    <Input placeholder="Treatment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="relative mt-[0.6rem] w-full flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Image
                    src="/assets/calendar.svg"
                    alt="calender"
                    width={24}
                    height={24}
                    className="filter-grey absolute top-4 w-[2rem] h-[2rem] z-10 right-2"
                  />
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      maxDate={new Date()}
                      minDate={new Date()}
                      dateFormat="MM/dd/yyyy"
                      wrapperClassName="datePicker"
                      readOnly
                      customInput={
                        <Input className="react-datepicker__input-container" />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
