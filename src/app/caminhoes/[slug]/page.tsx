import { notFound } from "next/navigation";
import { TruckDetailPage } from "@/components/TruckDetailPage";
import { catalogTrucks, getTruckDetailBySlug } from "@/data/catalog";

export function generateStaticParams() {
  return catalogTrucks.map((truck) => ({
    slug: truck.slug,
  }));
}

export default async function CaminhaoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const truck = getTruckDetailBySlug(slug);

  if (!truck) {
    notFound();
  }

  return <TruckDetailPage truck={truck} />;
}
