import { NextResponse } from 'next/server';

export async function GET() {
  const testUrl = 'https://api.themoviedb.org/3/authentication';
  
  try {
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        'accept': 'application/json'
      }
    });

    const data = await response.json();
    
    return NextResponse.json({
      status: response.status,
      data,
      tokenPrefix: process.env.TMDB_ACCESS_TOKEN?.substring(0, 20) + '...'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to test TMDB API' }, { status: 500 });
  }
}