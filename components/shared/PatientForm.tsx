"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { patientFormSchema } from "@/lib/validator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { createPatient } from "@/lib/actions/patient.actions";

interface PatientFormProps {
  userRole: string | null;
  userId: string | null;
}

export default function PatientForm({ userRole, userId }: PatientFormProps) {
  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      aadharNumber: 0,
      mobileNumber: 0,
      age: 0,
      gender: "",
      maritalStatus: "",
      bloodGroup: "",
      dob: new Date(),
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof patientFormSchema>) {
    try {
      await createPatient({ ...values, userRole, userId });
      console.log(values);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white rounded-[47px] p-9 shadow-[0px_4px_15px_0px_#9b92d6] dark:bg-slate-950">
      <h1 className="font-bold text-xl mb-8">Add Patient Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="aadharNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Aadhar Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Aadhar Number"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mobile Number"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="Age" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select College" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Marital Status</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select College" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Blood Group</FormLabel>
                  <FormControl>
                    <Input placeholder="Blood Group" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="relative mt-[0.6rem] w-full flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
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
                      maxDate={new Date("2023-12-31")}
                      minDate={new Date("1900-01-01")}
                      dateFormat="MM/dd/yyyy"
                      wrapperClassName="datePicker"
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
          <div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="mt-[0.6rem] w-full flex flex-col">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
