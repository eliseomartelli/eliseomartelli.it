import Image from "next/image";
import React from "react";
import Container from "../components/Container";
import { loadPhotoFiles } from "../lib/photos";

export default ({ content }: { content: string[] }) => {
  return (
    <Container>
      <div
        className="w-[100vw]
                relative
                ml-[-50vw]
                left-1/2
				"
      >
        <div
          className="
					columns-1
					sm:columns-2
					md:columns-3
					lg:columns-4
					break-inside-avoid
					mx-auto
					gap-2
					px-4
					content-evenly
					leading-[0]
					bg-red-50
					max-w-7xl
					"
        >
          {content.map((e, i) => (
            <Image
              src={`/image_portfolio/${e}`}
              width={512}
              height={512}
              loading="lazy"
              alt={""}
              key={i}
              className="pb-2 mx-auto"
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export async function getStaticProps(): Promise<{
  props: { content: string[] };
}> {
  return {
    props: {
      content: loadPhotoFiles(),
    },
  };
}
