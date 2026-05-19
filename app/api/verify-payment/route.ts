import { NextResponse } from "next/server";

// TEMP STORAGE (later replace with database)
const usedCodes = new Set<string>();

export async function POST(req: Request) {
  const body = await req.json();

  const code = body.code?.trim().toUpperCase();

  // VALIDATE FORMAT
  const codeRegex = /^[A-Z0-9]{10}$/;

  if (!codeRegex.test(code)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid transaction code format",
      },
      { status: 400 }
    );
  }

  // CHECK DUPLICATE
  if (usedCodes.has(code)) {
    return NextResponse.json(
      {
        success: false,
        message: "Transaction code already used",
      },
      { status: 409 }
    );
  }

  // SAVE CODE
  usedCodes.add(code);

  return NextResponse.json({
    success: true,
    message: "Payment verified successfully",
  });
}