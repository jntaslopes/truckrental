import { TruckCatalogPage } from "@/components/TruckCatalogPage";

type CaminhoesPageProps = {
  searchParams: Promise<{
    application?: string | string[];
  }>;
};

export default async function CaminhoesPage({ searchParams }: CaminhoesPageProps) {
  const params = await searchParams;
  const application = Array.isArray(params.application) ? params.application[0] : params.application;

  return <TruckCatalogPage initialApplication={application} />;
}
