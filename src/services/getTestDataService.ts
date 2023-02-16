export const getTestDataService = async () => {
  const response = await fetch(
    encodeURI(
      process.env.REACT_APP_TEST_API_URL
        ? process.env.REACT_APP_TEST_API_URL
        : ""
    )
  );
  return response.json();
};
