import { getTagLabel, PostTagMap, PostTagType } from "./tags";

export const colorClassFromPostTag = (tagString: string): string => {
  try {
    const tag = getTagLabel(
      tagString.toLowerCase() as keyof PostTagMap,
    ) as PostTagType;
    switch (tag) {
      case "Apple":
        return "bg-cyan-50 border-cyan-300 text-cyan-800 hover:bg-cyan-100!";
      case "Network":
        return "bg-pink-50 border-pink-300 text-pink-800 hover:bg-pink-100!";
      case "IoT":
        return "bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100!";
      case "Ansible":
        return "bg-red-50 border-red-300 text-red-800 hover:bg-red-100!";
      case "Short":
        return "bg-orange-50 border-orange-300 text-orange-800 hover:bg-orange-100!";
      case "Automation":
        return "bg-green-50 border-green-300 text-green-800 hover:bg-green-100!";
      case "Photography":
        return "bg-indigo-50 border-indigo-300 text-indigo-800 hover:bg-indigo-100!";
      case "Programming":
        return "bg-stone-50 border-stone-300 text-stone-800 hover:bg-stone-100!";
      case "Misc":
        return "bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100!";
      case "Ai":
        return "bg-teal-50 border-teal-300 text-teal-800 hover:bg-teal-100!";
      case "Studies":
        return "bg-violet-50 border-violet-300 text-violet-800 hover:bg-violet-100!";
      case "Music":
        return "bg-purple-50 border-purple-300 text-purple-800 hover:bg-purple-100!";
      default:
        const _exhaustiveCheck: never = tag;
        console.error(`Unhandled post tag: ${_exhaustiveCheck}`);
        return "bg-gray-50 border-gray-300 text-gray-800";
    }
  } catch {
    return "";
  }
};
