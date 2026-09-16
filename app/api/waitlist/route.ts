import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { parseWaitlistEntry } from "@/lib/waitlist";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = parseWaitlistEntry(body);
  if ("error" in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL?.trim();
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();

  try {
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed),
        signal: AbortSignal.timeout(8_000),
      });

      if (!response.ok) {
        console.error("[waitlist] webhook failed", response.status);
        return NextResponse.json(
          { ok: false, error: "Could not save your signup. Try again." },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true, stored: "webhook" });
    }

    if (blobToken) {
      const pathname = `waitlist/${parsed.createdAt}-${crypto.randomUUID()}.json`;
      await put(pathname, JSON.stringify(parsed), {
        access: "private",
        addRandomSuffix: false,
        contentType: "application/json",
        token: blobToken,
      });

      return NextResponse.json({ ok: true, stored: "blob" });
    }

    console.log(
      "[waitlist] demo mode (no WAITLIST_WEBHOOK_URL or BLOB_READ_WRITE_TOKEN)",
      parsed,
    );
    return NextResponse.json({ ok: true, stored: "demo" });
  } catch (error) {
    console.error("[waitlist] storage failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your signup. Try again." },
      { status: 500 },
    );
  }
}
