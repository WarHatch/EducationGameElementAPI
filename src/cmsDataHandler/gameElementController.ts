import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "0byunyul",
  dataset: "teachers_content",
  // TODO: for security reasons should be passed as env variable
  token: "skZAoVh3f8vZL8L1mdi5Qqih6gtkSavMJu4JTJ7ge43gzXZdAAOkA1jqtXLz03E7YS4IujAKe2y0YKqKpP7EP4JFirMh8BmD39RMM1vX5Z2UtDrSlei200JtFnh4teV06HhMgdedXpjQReBqS49Pbyk7QZy5RlzfHuQU7n6uOilDRp9U5K6O", // or leave blank to be anonymous user
  useCdn: false // `false` if you want to ensure fresh data
})

const fetchALLCMSData = async() => {
  return client.fetch("*[]");
}

const fetchCMSDataByContentSlug = async(contentSlug: string) => {
  return client.fetch(`*[contentSlug.current == "${contentSlug}"]`);
}

export default {
  fetchALLCMSData,
  fetchCMSDataByContentSlug
}