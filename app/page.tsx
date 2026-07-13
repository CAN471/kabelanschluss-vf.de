import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { professionalServiceSchema, serviceSchema, websiteSchema } from "@/lib/seo";

export default function Page() {
  return (
    <>
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={serviceSchema()} />
      <HomePage />
    </>
  );
}
