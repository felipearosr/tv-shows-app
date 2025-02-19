'use client';
import { memo } from 'react';
import Image from 'next/image';

interface ActorCardProps {
  name: string;
  character: string;
  profilePath: string | null;
  size?: 'sm' | 'md' | 'lg'; // Optional size prop with default
}

// Precompute the text classes outside the component
const TEXT_CLASSES = {
  sm: {
    name: 'text-sm sm:text-base',
    character: 'text-sm sm:text-base',
    as: 'text-xs'
  },
  md: {
    name: 'text-base sm:text-lg',
    character: 'text-base sm:text-lg',
    as: 'text-xs sm:text-sm'
  },
  lg: {
    name: 'text-xl sm:text-2xl',
    character: 'text-xl sm:text-2xl',
    as: 'text-sm'
  }
};

const ActorCard = ({
  name,
  character,
  profilePath,
  size = 'md' // Default to medium size
}: ActorCardProps) => {
  // Get text classes using lookup instead of function call
  const textClasses = TEXT_CLASSES[size] || TEXT_CLASSES.md;
  
  const imageSrc = profilePath
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${profilePath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div 
      className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer"
    >
      {/* Border effect using group-hover instead of state */}
      <div
        className="absolute inset-0 border-2 rounded-lg transition-colors duration-500 z-10 border-transparent group-hover:border-[#4E4C84]"
      />
      
      {/* Actor image */}
      <Image
        src={imageSrc}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 300px"
        className="object-cover"
        priority={size === 'lg'} // Prioritize loading for large cards
      />
      
      {/* Dark overlay using group-hover instead of state */}
      <div
        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-500"
      />
      
      {/* Actor name - at the top */}
      <div
        className={`absolute top-0 left-0 right-0 p-2 sm:p-3 text-white font-bold z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${textClasses.name}`}
      >
        {name}
      </div>
      
      {/* Character name - at the bottom */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      >
        <span className={`opacity-75 ${textClasses.as}`}>as</span>
        <p className={`font-bold ${textClasses.character}`}>{character}</p>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ActorCard);