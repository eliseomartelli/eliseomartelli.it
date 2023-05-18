import { Card } from "@/components/Card";
import { KeyIcon } from "@/components/Icons";
import Link from "next/link";
import { sshKeys } from "./keys";
import { PageLayout } from "@/components/PageLayout";
import WidthLimit from "@/components/WidthLimit";
const page = () => {
  return (
    <PageLayout routes={[{ name: "SSH Keys", href: "/ssh" }]}>
      <WidthLimit>
        <ul className="gap-4 flex flex-col">
          {Object.keys(sshKeys).map((keyName, i) => {
            return (
              <li key={i}>
                <Link href={`/ssh/${keyName}`}>
                  <Card className="flex flex-col gap-2">
                    <p className="flex gap-2">
                      <KeyIcon />
                      {keyName}
                    </p>
                    <div className="font-mono bg-white/50 p-4 rounded-md break-all shadow-inner">
                      {sshKeys[keyName]}
                    </div>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      </WidthLimit>
    </PageLayout>
  );
};
export default page;
