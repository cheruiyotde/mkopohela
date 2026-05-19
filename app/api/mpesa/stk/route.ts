import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone, amount } = await req.json();

  // FORMAT PHONE
  const formattedPhone = phone
    .replace(/\s+/g, "")
    .replace("+", "")
    .replace(/^0/, "254");

  // GET ACCESS TOKEN
  const tokenRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mpesa/token`
  );

  const tokenData = await tokenRes.json();

  const accessToken = JSON.parse(tokenData.raw).access_token;

  // TIMESTAMP
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);

  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;

  // PASSWORD
  const password = Buffer.from(
    `${shortcode}${passkey}${timestamp}`
  ).toString("base64");

  // STK PUSH REQUEST
  const response = await fetch(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mpesa/callback`,
        AccountReference: "MkopoHela",
        TransactionDesc: "Loan Verification Fee",
      }),
    }
  );

  const data = await response.json();

  console.log("STK RESPONSE:", data);

  return NextResponse.json(data);
}