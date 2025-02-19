import Image from 'next/image';
import Link from 'next/link';
import { TVShow } from '@/types/tv';
import ActorCard from '@/components/ActorCard';
import SeasonCard from '@/components/SeasonCard';

interface ShowDetailsProps {
  show: TVShow;
}

export default function ShowDetails({ show }: ShowDetailsProps) {
  return (
    <main className="text-gray-100">
      {/* Hero Section - Full width section */}
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
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#06051E] to-transparent">
          <div className="max-w-7xl mx-auto">
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-2">
            <div className="relative aspect-[2/3] mb-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${show.poster_path}`}
                alt={show.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
              <h3 className="font-semibold mb-2 text-gray-200">Show Info</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-gray-400">Status</dt>
                  <dd>{show.status}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Network</dt>
                  <dd>{show.networks?.[0]?.name}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Genre</dt>
                  <dd>{show.genres.map(g => g.name).join(', ')}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-5">
            {/* Overview */}
            <div className="bg-gray-800 p-6 rounded-lg shadow mb-6 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-100">Overview</h2>
              <p className="text-gray-300">{show.overview}</p>
            </div>

            {/* Cast */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-100">Cast and Crew</h2>
                
                {/* Show More link - only visible if there are more than 7 cast members */}
                {show.credits.cast.length > 7 && (
                  <a 
                    href={`/show/${show.id}/cast`} 
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center"
                  >
                    View All Cast
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
              
              {/* Mobile: Horizontally scrollable, Desktop: Grid with 7 columns */}
              <div className="relative">
                {/* Scrollable on mobile, hidden on larger screens */}
                <div className="md:hidden relative">
                  {/* Gradient fade effect */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-800 to-transparent z-10 pointer-events-none" />
                  
                  {/* Scrollable container */}
                  <div className="flex overflow-x-auto gap-3 pb-3 -mx-1 px-1">
                    {show.credits.cast.slice(0, 7).map((actor) => (
                      <div key={actor.id} className="flex-none w-32">
                        <ActorCard
                          key={actor.id}
                          name={actor.name}
                          character={actor.character}
                          profilePath={actor.profile_path}
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Desktop grid - hidden on mobile */}
                <div className="hidden md:grid md:grid-cols-7 gap-2">
                  {show.credits.cast.slice(0, 7).map((actor) => (
                    <ActorCard
                      key={actor.id}
                      name={actor.name}
                      character={actor.character}
                      profilePath={actor.profile_path}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Seasons - Horizontal Display */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-100">Seasons</h2>
                
                {/* Show More link - conditionally shown if more than visible seasons */}
                {show.seasons.length > 4 && (
                  <a 
                    href={`/show/${show.id}/seasons`} 
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center"
                  >
                    View All Seasons
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
              
              {/* Seasons Scrollable Container */}
              <div className="relative">
                {/* Gradient fade effect */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-800 to-transparent z-10 pointer-events-none" />
                
                {/* Scrollable container */}
                <div className="flex overflow-x-auto gap-4 pb-3 -mx-1 px-1">
                  {show.seasons.map((season) => (
                    <SeasonCard
                      key={season.id}
                      id={season.id}
                      showId={show.id}
                      name={season.name}
                      posterPath={season.poster_path}
                      seasonNumber={season.season_number}
                      episodeCount={season.episode_count}
                      airDate={season.air_date}
                      voteAverage={show.vote_average} // Assuming using show rating; adjust if seasons have their own
                      year={season.air_date ? new Date(season.air_date).getFullYear() : '—'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Shows */}
        {show.similar.results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">Similar Shows</h2>
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
                  <p className="font-medium text-sm text-gray-300 group-hover:text-blue-400">{similar.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}