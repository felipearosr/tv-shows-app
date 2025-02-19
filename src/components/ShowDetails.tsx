import Image from 'next/image';
import Link from 'next/link';
import { TVShow } from '@/types/tv';
import ActorCard from '@/components/ActorCard';

interface ShowDetailsProps {
  show: TVShow;
}

export default function ShowDetails({ show }: ShowDetailsProps) {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        {show.backdrop_path && (
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${show.backdrop_path}`}
            alt={show.name}
            fill
            className="object-cover brightness-50"
            priority
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900 to-transparent">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">{show.name}</h1>
            <div className="flex items-center text-white gap-4">
              <span>{new Date(show.first_air_date).getFullYear()}</span>
              <span>•</span>
              <span>{show.number_of_seasons} Seasons</span>
              <span>•</span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{show.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] mb-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${show.poster_path}`}
                alt={show.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Show Info</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-gray-600">Status</dt>
                  <dd>{show.status}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Network</dt>
                  <dd>{show.networks?.[0]?.name}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Genre</dt>
                  <dd>{show.genres.map(g => g.name).join(', ')}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Overview */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-700">{show.overview}</p>
            </div>
            {/* Cast */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-semibold mb-4">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {show.credits.cast.slice(0, 8).map((actor) => (
                  <ActorCard
                    key={actor.id}
                    name={actor.name}
                    character={actor.character}
                    profilePath={actor.profile_path}
                  />
                ))}
              </div>
            </div>

            {/* Seasons */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
              <div className="space-y-4">
                {show.seasons.map((season) => (
                  <div key={season.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    {season.poster_path && (
                      <div className="relative w-24 aspect-[2/3]">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w185${season.poster_path}`}
                          alt={season.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{season.name}</h3>
                      <p className="text-sm text-gray-600">
                        {season.episode_count} Episodes • {season.air_date && new Date(season.air_date).getFullYear()}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">{season.overview || 'No overview available.'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Shows */}
        {show.similar.results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Similar Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {show.similar.results.slice(0, 6).map((similar) => (
                <Link key={similar.id} href={`/show/${similar.id}`} className="group">
                  <div className="relative aspect-[2/3] mb-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w342${similar.poster_path}`}
                      alt={similar.name}
                      fill
                      className="object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                    />
                  </div>
                  <p className="font-medium text-sm group-hover:text-blue-600">{similar.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}