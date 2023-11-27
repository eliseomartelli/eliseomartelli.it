import { Card } from "@/components/Card";
import { PageLayout } from "@/components/PageLayout";

const loading = () => (
  <PageLayout routes={[{ name: "Wallpapers", href: "/wallpapers" }]}>
    <div className="columns-2 md:columns-3 lg:columns-4 px-4 min-h-full gap-4">
      {new Array(7).fill(true).map((_, i) => (
        <Card
          className="!p-0 overflow-hidden break-inside-avoid block my-2 animate-pulse"
          key={i}
          hoverable={false}
        >
          <div className="aspect-square border-gray-200" />
          <div className="p-4">
            <h2 className="text-lg text-transparent bg-stone-300">
              Lorem ipsum dolor
            </h2>
            <p className="flex text-transparent bg-stone-200">Sit amet</p>
          </div>
        </Card>
      ))}
    </div>
  </PageLayout>
);
export default loading;
