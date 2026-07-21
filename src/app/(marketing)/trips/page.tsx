import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import TripsClient from "./TripsClient";

export default async function TripsPage() {
  const trips = await prisma.trip.findMany({
    where: { status: "Published" },
    orderBy: { createdAt: "desc" },
  });

  // Remove Date objects to avoid serialization issues to client components
  const serializedTrips = trips.map(trip => ({
    ...trip,
    createdAt: trip.createdAt.toISOString(),
    updatedAt: trip.updatedAt.toISOString(),
  }));

  return (
    <Suspense fallback={<div>Loading trips...</div>}>
      <TripsClient trips={serializedTrips} />
    </Suspense>
  );
}
