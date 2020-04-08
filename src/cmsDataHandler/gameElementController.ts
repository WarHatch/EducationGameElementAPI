import sanityClient from "./sanityClient";

export const fetchALLCMSData = async() => {
  return sanityClient.fetch("*[]");
}

export const fetchCMSDataByContentSlug = async(contentSlug: string) => {
  return sanityClient.fetch(`*[contentSlug.current == "${contentSlug}"]`);
}
