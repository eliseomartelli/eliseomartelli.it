import { FilmCalculator } from "@/components/tools/film-calculator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata = {
  title: "Film Development Calculator",
  description:
    "Calculate development times with push/pull and temperature adjustments.",
};

export default function FilmCalc() {
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
            <BreadcrumbLink href="/tools/filmcalc">
              Film Development Calculator
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="mt-12">
        <h1 className="mb-4 text-center font-serif text-4xl font-bold">
          Film Development Calculator
        </h1>
      </section>
      <hr />
      <FilmCalculator />
    </div>
  );
}
