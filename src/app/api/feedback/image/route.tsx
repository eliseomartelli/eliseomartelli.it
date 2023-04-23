import { ImageResponse } from "next/dist/compiled/@vercel/og";

export async function GET(request: Request) {
  return new ImageResponse(
    (
      <div tw="flex p-4">
        <div tw="flex flex-col w-full rounded-xl overflow-hidden shadow-lg">
          <p tw="bg-black m-0 w-full p-4 text-white font-bold text-center">
            Feedback
          </p>
          <p tw="m-0 p-4 bg-white">
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia. Sit irure elit esse ea nulla sunt ex occaecat
            reprehenderit commodo officia dolor Lorem duis laboris cupidatat
            officia voluptate. Culpa proident adipisicing id nulla nisi laboris
            ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
            ex non excepteur duis sunt velit enim. Voluptate laboris sint
            cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
          </p>
        </div>
      </div>
    ),
    {
      width: 350,
    }
  );
}
