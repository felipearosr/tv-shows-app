'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface SeasonCardProps {
  id: number;
  showId: number;
  name: string;
  posterPath: string | null;
  seasonNumber: number;
  episodeCount: number;
  airDate: string | null;
  voteAverage: number;
  year: number | string;
}

export default function SeasonCard({
  id,
  showId,
  name,
  posterPath,
  seasonNumber,
  episodeCount,
  airDate,
  voteAverage,
  year,
}: SeasonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedRating = voteAverage.toFixed(1);
  
  return (
    <Link href={`/show/${showId}/season/${seasonNumber}`}>
      <div 
        className="relative flex-none w-40 md:w-44 group rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Season Poster */}
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={
              posterPath
                ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w342${posterPath}`
                : '/placeholder-poster.png'
            }
            alt={name}
            fill
            className={`object-cover rounded-lg transition-all duration-300 ${
              isHovered ? 'brightness-[0.35] scale-105' : 'brightness-75'
            }`}
            sizes="(max-width: 768px) 160px, 176px"
          />
          
          {/* Season Info Overlay - Always visible */}
          <div className="absolute inset-0 p-3 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="bg-[#06051E]/80 px-2 py-1 rounded text-sm font-bold">
                S{seasonNumber}
              </div>
              <div className="bg-[#06051E]/80 px-2 py-1 rounded text-sm">
                {year}
              </div>
            </div>
            
            {/* Rating - Only visible on hover */}
            <div 
              className={`flex items-center gap-1 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-[#06051E]/80 p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-bold">{formattedRating}</span>
            </div>

            {/* Action buttons - Only visible on hover */}
            <div 
              className={`flex justify-center gap-2 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Season Title */}
        <div className="mt-2">
          <p className="font-medium text-sm text-gray-300 group-hover:text-blue-400 transition-colors truncate">
            {name}
          </p>
          <p className="text-xs text-gray-400">
            {episodeCount} Episodes
          </p>
        </div>
      </div>
    </Link>
  );
}