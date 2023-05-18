export interface Wallpaper {
  reference?: string;
  title: string;
  location: string;
  preview: string;
  urls?: { name: string; url: string }[];
}

export async function allWallpapers(): Promise<Wallpaper[]> {
  const response = await fetch(
    `https://raw.githubusercontent.com/eliseomartelli/wallpapers-data/main/index.json`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<Wallpaper[]>;
}

export async function wallpaper(name: string): Promise<Wallpaper> {
  const address = `https://raw.githubusercontent.com/eliseomartelli/wallpapers-data/main/data/${name}/info.json`;
  const response = await fetch(address);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<Wallpaper>;
}
