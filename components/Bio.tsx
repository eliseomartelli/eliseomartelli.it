import Image from "next/image";
import propic from "../public/propic.jpg";

const Bio = ({ name, description }) => {
  return (
    <div className="flex md:flex-row md:space-x-6 md:space-y-0 space-y-6 items-center flex-col shadow-lg px-4 py-4 rounded-md">
      <div>
        <div className="flex flex-row space-x-4 items-center">
          <div>
            <Image
              className="rounded-full"
              src={propic}
              alt="Profile picture of Eliseo Martelli"
              width="48px"
              height="48px"
            />
          </div>
          <div>
            <h3 className="text-red-500 text-xl font-bold">Hello there,</h3>
            <h1 className="text-4xl font-bold mb-4">I'm {name}!</h1>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Bio;
