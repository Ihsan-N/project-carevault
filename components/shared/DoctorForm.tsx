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
import { doctorFormSchema } from "@/lib/validator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { createDoctor, updateDoctor } from "@/lib/actions/doctor.actions";
import { useState } from "react";
import { FileUploader } from "@/components/shared/FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { doctorDefaultValues } from "@/constants";
import { useRouter } from "next/navigation";

type DoctorFormProps = {
  userId: string | null;
  userRole: string;
  type: "Create" | "Update";
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
    mobileNumber: number;
    email: string;
    age: number;
    gender: string;
    dob: Date;
    specialization: string;
    imageUrl: string | null;
  };
  doctorId?: string;
};

export default function DoctorForm({
  userId,
  userRole,
  type,
  doctor,
  doctorId,
}: DoctorFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");
  const initailValues =
    doctor && type === "Update"
      ? { ...doctor, imageUrl: doctor.imageUrl || "" }
      : doctorDefaultValues;

  const form = useForm<z.infer<typeof doctorFormSchema>>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: initailValues,
  });

  async function onSubmit(values: z.infer<typeof doctorFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        await createDoctor({
          ...values,
          imageUrl: uploadedImageUrl,
          userId,
          userRole,
        });
        console.log(values);
        console.log("User Id", userId);
        form.reset();
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!doctorId) {
        router.back();
        return;
      }

      try {
        const updatedDoctor = await updateDoctor({
          userId,
          userRole,
          doctor: { ...values, imageUrl: uploadedImageUrl, id: doctorId },
          path: `/doctors/${doctorId}`,
        });

        if (updatedDoctor) {
          console.log(values);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="bg-white rounded-[47px] p-9 shadow-[0px_4px_15px_0px_#9b92d6] dark:bg-slate-950">
      <h1 className="font-bold text-xl mb-8">Add Doctor Information</h1>
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
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
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select College" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Allergists / Immunologists">
                            Allergists / Immunologists
                          </SelectItem>
                          <SelectItem value="Anesthesiologists">
                            Anesthesiologists
                          </SelectItem>
                          <SelectItem value="Cardiologists">
                            Cardiologists
                          </SelectItem>
                          <SelectItem value="Dermatologistss">
                            Dermatologistss
                          </SelectItem>
                          <SelectItem value="Gastroenterologists">
                            Gastroenterologists
                          </SelectItem>
                          <SelectItem value="Geriatric Medicine Specialists">
                            Geriatric Medicine Specialists
                          </SelectItem>
                          <SelectItem value="Emergency Medicine Specialists">
                            Emergency Medicine Specialists
                          </SelectItem>
                          <SelectItem value="Neurologists">
                            Neurologists
                          </SelectItem>
                          <SelectItem value="Psychiatrists">
                            Psychiatrists
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Doctor Profile</FormLabel>
                  <FormControl className="h-72 border border-dashed">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
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
            {type === "Create"
              ? form.formState.isSubmitting
                ? "Submitting..."
                : "Submit"
              : form.formState.isSubmitting
              ? "Updating..."
              : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
