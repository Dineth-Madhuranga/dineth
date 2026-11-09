import { ServicePage } from "@/components/services/ServicePage";
import { webDevelopment } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  webDevelopment.path,
  webDevelopment.title,
  webDevelopment.description,
);

export default function WebDevelopmentPage() {
  return <ServicePage service={webDevelopment} />;
}
