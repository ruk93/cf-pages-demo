import demo1 from "../config/demo1.ruk.asia";
import demo2 from "../config/demo2.ruk.asia";

const getConfig = (request: Request) => {
  const config = () => {
    switch (request.headers.get("host")?.toLowerCase()) {
      case "demo1.ruk.asia":
      case "www.demo1.ruk.asia":
        return demo1;
      case "demo2.ruk.asia":
      case "www.demo2.ruk.asia":
        return demo2;
      default:
        return demo1;
    }
  };

  return `window.env = ${JSON.stringify(config(), null, 2)}`;
};

export default getConfig;
