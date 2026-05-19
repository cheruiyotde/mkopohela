import { NextResponse } from "next/server";

export async function GET() {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({
        error: "Missing env variables",
      });
    }

    const auth = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const response = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const text = await response.text();

    console.log("RAW RESPONSE:", text);

    return NextResponse.json({
      raw: text,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Server error",
    });
  }
}