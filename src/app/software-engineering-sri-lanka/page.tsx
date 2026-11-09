import { ServicePage } from "@/components/services/ServicePage";
import { softwareEngineering } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  softwareEngineering.path,
  softwareEngineering.title,
  softwareEngineering.description,
);

export default function SoftwareEngineeringPage() {
  return <ServicePage service={softwareEngineering} />;
}
