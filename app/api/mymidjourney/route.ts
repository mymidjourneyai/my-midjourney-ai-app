import MyMidjourneyClient from "@lib/mymidjourney/client"
import { NextRequest, NextResponse } from "next/server"

const client = MyMidjourneyClient()

async function handle(req: NextRequest) {
  // TODO: Add authentication to protect the endpoint
  //   const authResult = auth(req);
  //   if (authResult.error) {
  //     return NextResponse.json(authResult, {
  //       status: 401,
  //     });
  //   }

  const action = req.nextUrl.searchParams.get("action")

  const mymidjourneyUrl = `/midjourney/${action}`

  try {
    console.log(`calling mymidjourneyUrl: ${mymidjourneyUrl}`)
    const data = await req.json()
    const response =
      action === "message"
        ? await client.get(`${mymidjourneyUrl}/${data.messageId}`)
        : await client.post(mymidjourneyUrl, data)
    return NextResponse.json(response.data)
  } catch (error) {
    const traceId = crypto.randomUUID()
    // console.error(
    //   `traceId: ${traceId}, data: ${JSON.stringify(req.body, null, 2)}`,
    //   error
    // )
    throw new Error(
      `mymidjourney request failed, traceId: ${traceId}, error: ${error}`
    )
  }
}

export const GET = handle
export const POST = handle
