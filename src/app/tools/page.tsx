import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export const metadata = {
  title: "Tools",
  description: "Useful tools.",
};

export default function Tools() {
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
        </BreadcrumbList>
      </Breadcrumb>
      <section className="mt-12">
        <h1 className="mb-8 font-serif text-4xl font-bold">Tools</h1>
        <article className="prose mx-auto">
          <ul className="list-none -ms-8">
            <li>
              <Link href="/tools/filmcalc">Film Development Calculator</Link>
              <br />
              <span className="text-muted-foreground">
                Calculate development times with push/pull and temperature
                adjustments.
              </span>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
