
class ElementHandler {
    constructor(private request: Request){

    }
    element(e: HTMLDivElement) {
       e.innerHTML = `
       window.env = {
        domain: "${this.request.url}"
       }
       `
    }
 }

async function editHtml(request: Request, response: Response) {
    return new HTMLRewriter()
       .on("body", new ElementHandler(request))
       .transform(response)
  }

export async function onRequest(context: EventContext<{},"",{}>) {
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
  response.headers.append("x-url",request.url);
  return await editHtml(request,response);
}
