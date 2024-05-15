import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLog } from "@/lib/actions/log.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role === "patient_admin") {
    redirect("/");
  }

  const logs = await getLog();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#EDF4FC] dark:bg-slate-800">
            <TableHead>Timestamp</TableHead>
            <TableHead>UserId</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs?.map((log, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {log.timestamp.toLocaleString()}
              </TableCell>
              <TableCell>{log.userId}</TableCell>
              <TableCell>{log.role}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
