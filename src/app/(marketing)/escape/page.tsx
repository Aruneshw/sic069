import { prisma } from "@/lib/prisma";
import EscapeEngineSection from "@/components/ui/EscapeEngineSection";
import TravelDnaOnboardingModal from "@/components/ui/TravelDnaOnboardingModal";

export const metadata = {
  title: "Intelligent Escape Engine — Zero Gravity Tours",
  description: "Discover curated budget escapes based on your Travel DNA and emotional Travel State.",
};

export const dynamic = "force-dynamic";

export default async function EscapePage() {
  const packages = await prisma.package.findMany({
    where: { status: "Published" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-transparent min-h-screen pt-28 pb-20">
      <EscapeEngineSection initialPackages={packages} />
      <TravelDnaOnboardingModal />
    </div>
  );
}
