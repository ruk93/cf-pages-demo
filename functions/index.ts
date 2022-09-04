import getConfig from "../config";

const setEnv = async (request: Request, response: Response) => {
  let text = await response.text();
  const host = request.headers.get("host") ?? "";
  text = text.replace("//APPEND_JS_APP_ENV", getConfig(host));

  const options: ResponseInit = {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  };
  return new Response(text, options);
};

export async function onRequest(context: EventContext<{}, "", {}>) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  const response = await next();
  response.headers.append("x-host", request.headers.get("host") ?? "unknown");
  return await setEnv(request, response);
}
