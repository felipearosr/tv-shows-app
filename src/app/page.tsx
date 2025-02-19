// src/app/page.tsx
import { fetchTVShows } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { results: shows } = await fetchTVShows();

  return (
    <main className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Popular TV Shows</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shows.map((show) => (
            <Link
              key={show.id}
              href={`/show/${show.id}`}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-700"
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
                <h2 className="text-lg font-semibold mb-2 text-gray-100">{show.name}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">{show.overview}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-300">{show.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}