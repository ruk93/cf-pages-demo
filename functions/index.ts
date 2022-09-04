const setEnv = async (request : Request, response: Response) => {
  const text = await (
    await response.text()
  ).replace("sample domain", request.url);

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
  response.headers.append("x-url", request.url);
  return await setEnv(request, response);
}
