import WidthLimit from "@/components/WidthLimit";
import { allPhotos } from "contentlayer/generated";
import PhotoComponent from "./PhotoTile";

export const metadata = {
  title: "Photos - Eliseo Martelli",
  description: "Some pictures that I like",
};

const Photos = () => {
  return (
    <>
      <WidthLimit>
        <h1 className="text-4xl font-bold mb-4">Photos</h1>
      </WidthLimit>
      <div className="flex flex-col gap-8">
        {allPhotos.map((photoSection, i) => (
          <section key={i}>
            <h2 className="text-2xl font-bold text-center">
              {photoSection.title}
            </h2>
            <div className="columns-2 md:columns-3 lg:columns-4 p-4">
              {photoSection.photos?.map((photo, i) => (
                <PhotoComponent {...photo} key={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Photos;
