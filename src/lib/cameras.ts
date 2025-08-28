import { defineCollection } from "@content-collections/core";
import { allCameras } from "content-collections";

export const cameras = defineCollection({
  name: "cameras",
  directory: "data/cameras",
  include: "*.md*",
  schema: (zod) => ({
    brand: zod.string(),
    model: zod.string(),
    releaseYear: zod.number().optional(),
  }),
});

// I want to export all the camera makes as a type.
// First map over the cameas and get the brand.
export const brands = allCameras.map((camera) => camera.brand);
// now get the unique brands.
export type CameraBrand = (typeof brands)[number];
