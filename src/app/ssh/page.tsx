import { sshKeys } from "./[key]/route";
import { Card } from "@/components/Card";
import WidthLimit from "@/components/WidthLimit";
import * as typography from "@/components/Typography";
import { KeyIcon } from "@/components/Icons";
import Link from "next/link";
const page = () => {
  return (
    <WidthLimit className="flex flex-col gap-4">
      <typography.h1>SSH Keys</typography.h1>
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
  );
};
export default page;
