"use client";

import React from "react";
import { Trash } from "lucide-react";
import { deleteDoctor } from "@/lib/actions/doctor.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
  id: string;
  userId: string | null;
  userRole: string | null;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  userId,
  userRole,
}) => {
  const handleDelete = async () => {
    try {
      await deleteDoctor({ id, userId, userRole });
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-600 text-primary-foreground hover:bg-red-600/90 p-3 rounded-lg">
        <Trash className="h-5 w-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            doctor&apos;s data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-600/90"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
