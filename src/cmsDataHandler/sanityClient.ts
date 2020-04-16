import sanityClient from "@sanity/client";
import config from "../config";

export default sanityClient({
  projectId: "0byunyul",
  dataset: "teachers_content",
  token: config.cmsConfig.SANITY_TOKEN, // leave blank to be anonymous
  useCdn: false // `false` if you want to ensure fresh data
});