import { ConsultWizard } from "@/components/ConsultWizard";
import { Hero } from "@/components/home/Hero";
import {
  Advisor,
  ExplorerSection,
  FaqPreview,
  GuidesPreview,
  PersonalCompare,
  Process,
  RegionSection,
  ServiceBento,
  Ticker
} from "@/components/home/Sections";

export function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <PersonalCompare />
      <ServiceBento />
      <ExplorerSection />
      <Process />
      <Advisor />
      <RegionSection />
      <GuidesPreview />
      <FaqPreview />
      <ConsultWizard />
    </>
  );
}
