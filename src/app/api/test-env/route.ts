import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasToken: !!process.env.TMDB_ACCESS_TOKEN,
    tokenFirstChars: process.env.TMDB_ACCESS_TOKEN?.slice(0, 10) + '...',
  });
}