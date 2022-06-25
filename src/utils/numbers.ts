import millify from "millify";

export const prettyNumber = (num?: number | string): string => {
  if (typeof num === "undefined") return "";

  return millify(Number(num));
};
