import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-brand-logo",
        "text-display-xl",
        "text-display-lg",
        "text-heading-lg",
        "text-heading-md",
        "text-heading-sm",
        "text-body-lg",
        "text-body-md",
        "text-body-sm",
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};
