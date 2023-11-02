export const getRequest = async (link: string) => {
  const response = await fetch(link);

  if (!response.ok) {
    throw new Error("Fetching image fail");
  }
  const responseJson = await response.json();
  return responseJson;
};
