import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TripDetailClient from "./TripDetailClient";

// Required for static export with dynamic routes
export async function generateStaticParams() {
  const trips = await prisma.trip.findMany({
    select: { slug: true },
  });

  return trips.map((trip) => ({
    slug: trip.slug,
  }));
}

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const trip = await prisma.trip.findUnique({
    where: { slug },
  });

  if (!trip) {
    notFound();
  }

  const serializedTrip = {
    ...trip,
    createdAt: trip.createdAt.toISOString(),
    updatedAt: trip.updatedAt.toISOString(),
  };

  return <TripDetailClient trip={serializedTrip} />;
}
