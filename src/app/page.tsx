import { fetchTVShows } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  console.log('Access token available:', !!process.env.TMDB_ACCESS_TOKEN);

  const { results: shows } = await fetchTVShows();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Popular TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shows.map((show) => (
          <Link
            key={show.id}
            href={`/show/${show.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {show.poster_path && (
              <div className="relative aspect-[2/3]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${show.poster_path}`}
                  alt={show.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{show.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{show.overview}</p>
              <div className="mt-2 flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm">{show.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}