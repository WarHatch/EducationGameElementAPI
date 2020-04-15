import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "0byunyul",
  dataset: "teachers_content",
  token: process.env.SANITY_TOKEN, // leave blank to be anonymous
  useCdn: false // `false` if you want to ensure fresh data
});