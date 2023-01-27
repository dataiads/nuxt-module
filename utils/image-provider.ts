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
  const { width, height, format } = modifiers;
  const b64Src = btoa(src);
  const url = joinURL(providerURL, `${b64Src}?w=${width}&h=${height}&f=${format}`);

  return {
    url,
  };
}