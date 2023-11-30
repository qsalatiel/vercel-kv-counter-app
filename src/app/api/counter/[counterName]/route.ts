import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type Params = { params: { counterName: string } };

export async function POST(req: NextRequest, { params }: Params) {
  const counter = await kv.get<number>(`counter:${params.counterName}`);

  const updatedCounter = !counter || isNaN(counter) ? 1 : counter + 1;

  await kv.set(`counter:${params.counterName}`, updatedCounter);

  return NextResponse.json({ counter: updatedCounter });
}

export async function GET(req: NextRequest, { params }: Params) {
  const counter = await kv.get<number>(`counter:${params.counterName}`);
  return NextResponse.json({ counter: counter });
}
