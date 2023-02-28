import Image from "next/image";
import React, { useState } from "react";
import Accordion from "../components/Accordion";
import Button, { Color } from "../components/Button";
import Container from "../components/Container";

import portfolio from "../photo_portfolio.json";

const Photos = () => {
  const [selected, setSelected] = useState(Object.keys(portfolio)[0]);
  return (
    <Container>
      <Accordion
        menu={
          <div className="flex flex-col gap-2">
            {Object.keys(portfolio).map((c, i) => (
              <Button
                small
                noCenter
                noBold={selected !== c}
                color={Color.Transparent}
                key={i}
                onClick={() => setSelected(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        }
        title={selected}
      >
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
					max-w-7xl
					"
          >
            <PhotoGrid category={selected} />
          </div>
        </div>
      </Accordion>
    </Container>
  );
};

const PhotoGrid = ({ category }: { category: string }) => (
  <>
    {portfolio[category as keyof typeof portfolio].map((e, i) => (
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
  </>
);

export default Photos;
