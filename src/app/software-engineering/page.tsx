import { ServicePage } from "@/components/services/ServicePage";
import { internationalSoftwareEngineering } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  internationalSoftwareEngineering.path,
  internationalSoftwareEngineering.title,
  internationalSoftwareEngineering.description,
);

export default function SoftwareEngineeringPage() {
  return <ServicePage service={internationalSoftwareEngineering} />;
}
