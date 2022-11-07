const Color: { [name: string]: string } = {
  apple: "bg-cyan-50 border-cyan-300",
  network: "bg-pink-50 border-pink-300",
  iot: "bg-blue-50 border-blue-300",
  ansible: "bg-red-50 border-red-300",
  automation: "bg-green-50 border-green-300",
  default: "bg-gray-50 border-gray-300",
};

export const Taglet = ({ tag }: { tag: string }) => (
  <span
    className={`px-2.5 py-0.5 border ${
      Color[tag.toLowerCase()] || Color.default
    } rounded-full font-medium text-xs`}
  >
    {tag}
  </span>
);
