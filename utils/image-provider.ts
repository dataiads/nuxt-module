import { joinURL } from "ufo";

interface GetImageParameters {
  modifiers: {
    width: number;
    height: number;
    format: "webp" | "jpeg";
  };
  providerURL: string;
}

interface NuxtImageConfiguration {
  options: {};
}

export function getImage(src: string, { modifiers, providerURL }: GetImageParameters, { options }: NuxtImageConfiguration) {
  const { width, height } = modifiers;
  const url =		`/static/image/unsafe/fit-in/${width}x${height}/${encodeURIComponent(src)}"`

  return {
    url,
  };
}