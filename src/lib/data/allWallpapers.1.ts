import { Wallpaper } from "./allWallpapers";

export async function allWallpapers() {
  const response = await fetch(
    `https://raw.githubusercontent.com/eliseomartelli/wallpapers-data/main/index.json`
  );
  if (!response.ok) {
  }
  return response.json() as Promise<Wallpaper[]>;
}
