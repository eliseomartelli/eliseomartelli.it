import { useEffect, useRef, useState } from "react";

interface HighlightBoxProps {
  content?: string[];
  color?: "black" | "pink" | "slate" | "sky";
}

export default function HighlightBox({
  content,
  color,
}: HighlightBoxProps): JSX.Element {
  const classNames = [
    "text-white w-screen block relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] text-4xl md:text-6xl font-extrabold",
    color == "black" && "bg-black",
    color == "pink" && "bg-pink-700",
    color == "slate" && "bg-slate-800",
    color == "sky" && "bg-sky-800",
  ].join(" ");
  const [clientHeight, setClientHeight] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  const ref = useRef(null);

  const scrollPosition = useScrollPosition();

  function handleResize() {
    setOffsetTop((ref?.current! as HTMLElement).offsetTop);
    setClientHeight(window.innerHeight);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const distance = scrollPosition + clientHeight - offsetTop - 100;

  const progress = distance / clientHeight;

  const index = progress * content!.length;

  return (
    <div className={classNames} ref={ref}>
      <div className="max-w-3xl w-full px-6 py-14 mx-auto leading-tight">
        {content?.map((part, i) => (
          <span
            key={i}
            className={`${
              i < index ? "text-white" : "text-white/40"
            } transition-colors`}
          >
            {part}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};
