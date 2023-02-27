import fs from "fs";

export function loadPhotoFiles() {
  return fs
    .readdirSync("public/image_portfolio")
    .sort(() => 0.5 - Math.random());
}
