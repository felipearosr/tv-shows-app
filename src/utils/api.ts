const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1aaa4def027042f44936f75dfb0d336a'; // Your API key

export async function fetchTVShows(page: number = 1) {
  const url = `${TMDB_API_BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`;
  console.log('Attempting to fetch:', url);

  try {
    const response = await fetch(url, { 
      method: 'GET',
      headers: {
        'accept': 'application/json'
      },
      next: { revalidate: 3600 }
    });

    // Log the full response for debugging
    console.log('Response status:', response.status);
    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Error response:', responseData);
      throw new Error(`Failed to fetch TV shows: ${responseData.status_message}`);
    }

    return responseData;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchTVShowDetails(id: number) {
    const url = `${TMDB_API_BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,similar,recommendations`;
  
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json'
      },
      next: { revalidate: 3600 }
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch TV show details: ${error.status_message}`);
    }
  
    return response.json();
  }

