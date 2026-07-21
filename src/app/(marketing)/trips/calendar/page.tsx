import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import CalendarClient from "./CalendarClient";

export default async function CalendarPage() {
  const departures = await prisma.departure.findMany({
    include: {
      trip: true,
    },
    orderBy: {
      date: 'asc'
    }
  });

  // Serialize dates
  const serializedDepartures = departures.map(dep => ({
    ...dep,
    date: dep.date.toISOString(),
    trip: {
      ...dep.trip,
      createdAt: dep.trip.createdAt.toISOString(),
      updatedAt: dep.trip.updatedAt.toISOString(),
    }
  }));

  return (
    <Suspense fallback={<div>Loading calendar...</div>}>
      <CalendarClient allDepartures={serializedDepartures} />
    </Suspense>
  );
}
