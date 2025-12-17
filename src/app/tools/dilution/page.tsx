import { DilutionCalculator } from "@/components/tools/dilution-calculator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Suspense } from "react";

export const metadata = {
  title: "Dilution Calculator",
  description:
    "Calculate chemical and water volumes for photographic solutions.",
};

export default function DilutionCalc() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/tools/dilution">
              Dilution Calculator
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="mt-12">
        <h1 className="mb-4 text-center font-serif text-4xl font-bold">
          Dilution Calculator
        </h1>
      </section>
      <hr />
      <Suspense fallback={<div>Loading calculator...</div>}>
        <DilutionCalculator />
      </Suspense>
    </div>
  );
}
