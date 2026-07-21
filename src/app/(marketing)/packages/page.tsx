import { prisma } from "@/lib/prisma";
import PackagesClient from "./PackagesClient";

export const metadata = {
  title: "Premium Packages — Zero Gravity Tours",
  description:
    "Explore our curated premium travel packages with transparent pricing in ₹. From coastal escapes to mountain expeditions.",
};

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    where: { status: "Published" },
    orderBy: { createdAt: "desc" },
  });

  // Convert Prisma objects to plain serializable data
  const serializedPackages = packages.map((pkg) => {
    // Derive category from tierBadge
    let category = "Coastal";
    const badge = pkg.tierBadge.toUpperCase();
    if (badge.includes("ALTITUDE") || badge.includes("MOUNTAIN")) {
      category = "Mountain";
    } else if (badge.includes("CULTURE") || badge.includes("TEMPLE") || badge.includes("URBAN")) {
      category = "Urban";
    } else if (badge.includes("COASTAL") || badge.includes("OCEAN") || badge.includes("BEACH")) {
      category = "Coastal";
    } else if (badge.includes("VALLEY") || badge.includes("NATURE") || badge.includes("GREEN")) {
      category = "Valley";
    }

    return {
      id: pkg.id,
      name: pkg.name,
      slug: pkg.slug,
      tagline: pkg.tagline,
      description: pkg.description,
      tierBadge: pkg.tierBadge,
      category,
      bundlePrice: pkg.bundlePrice,
      duration: pkg.duration,
      maxSeats: pkg.maxSeats,
      filledSeats: pkg.filledSeats,
      imageUrl: pkg.imageUrl,
      itinerary: pkg.itinerary,
      inclusions: pkg.inclusions,
      includedTripIds: pkg.includedTripIds,
    };
  });

  return <PackagesClient packages={serializedPackages} />;
}
