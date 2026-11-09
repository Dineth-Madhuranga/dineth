import { ServicePage } from "@/components/services/ServicePage";
import { internationalWebDevelopment } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  internationalWebDevelopment.path,
  internationalWebDevelopment.title,
  internationalWebDevelopment.description,
);

export default function WebDevelopmentPage() {
  return <ServicePage service={internationalWebDevelopment} />;
}
