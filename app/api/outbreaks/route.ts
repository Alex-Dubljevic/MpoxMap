import { NextResponse } from 'next/server';

export async function GET() {
  const outbreaks = [
    { date: '2024-08-10', country: 'Country1', cases: 30 },
    { date: '2024-08-11', country: 'Country2', cases: 15 }
  ];
  return NextResponse.json(outbreaks);
}
