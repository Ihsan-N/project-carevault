"use client";

import React from "react";
import { Button } from "../ui/button";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <Button onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button onClick={onConfirm}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
