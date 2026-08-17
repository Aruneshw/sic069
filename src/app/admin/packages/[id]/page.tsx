import { redirect } from "next/navigation";

interface PackagePageProps {
  params: Promise<{ id: string }>;
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const { id } = await params;
  redirect(`/admin/packages/${id}/edit`);
}
