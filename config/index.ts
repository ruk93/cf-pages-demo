import demo1 from "../config/demo1.ruk.asia";
import demo2 from "../config/demo2.ruk.asia";
import unknown from "../config/unknown";

const getConfig = (host: string) => {
  const config = (host) => {
    switch (host.toLowerCase()) {
      case "demo1.ruk.asia":
      case "www.demo1.ruk.asia":
        return demo1;
      case "demo2.ruk.asia":
      case "www.demo2.ruk.asia":
        return demo2;
      default:
        return unknown;
    }
  };

  return `window.env = ${JSON.stringify(config(host), null, 2)}`;
};

export default getConfig;
