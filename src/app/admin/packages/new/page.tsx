"use client";

import AdminPackageForm from "@/components/admin/AdminPackageForm";
import { Toaster } from "react-hot-toast";

export default function NewPackagePage() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AdminPackageForm mode="create" />
    </>
  );
}
