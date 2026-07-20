import { prisma } from "@/lib/prisma";
import PackagesClient from "./PackagesClient";

export const metadata = {
  title: "Premium Packages — Zero Gravity Tours",
  description:
    "Explore our curated premium travel packages with transparent pricing in ₹. From coastal escapes to mountain expeditions.",
};

export default async function PackagesPage() {
  const trips = await prisma.trip.findMany({
    where: { status: "Published" },
    orderBy: { rating: "desc" },
    take: 3,
  });

  // Convert Prisma objects to plain serializable data
  const serializedTrips = trips.map((trip) => ({
    id: trip.id,
    name: trip.name,
    slug: trip.slug,
    tagline: trip.tagline,
    description: trip.description,
    category: trip.category,
    price: trip.price,
    duration: trip.duration,
    maxSeats: trip.maxSeats,
    filledSeats: trip.filledSeats,
    imageUrl: trip.imageUrl,
    badge: trip.badge,
    rating: trip.rating,
    highlights: trip.highlights,
    included: trip.included,
  }));

  return <PackagesClient trips={serializedTrips} />;
}
