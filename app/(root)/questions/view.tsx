"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { incrementViews } from "@/lib/actions/question.action";

const View = ({ questionId }: { questionId: string }) => {
  const handleIncrement = async () => {
    const result = await incrementViews({ questionId });
    if (result.success) {
      // ✅ Correct Sonner syntax
      toast.success("Success", {
        description: "Views incremented",
      });
    } else {
      // ✅ Correct Sonner syntax for error
      toast.error("Error", {
        description: result.error?.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    handleIncrement();
  }, []);
  return null;
};

export default View;
