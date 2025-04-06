import urls from "./config.json";

const config = () => {
  const currentURL = window.location.href;

  if (currentURL.includes("localhost")) {
    return urls.DEV;
  } else {
    return urls.PROD;
  }
};

export const apiURl = config();
