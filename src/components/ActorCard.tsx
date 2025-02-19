// src/components/ActorCard.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';

interface ActorCardProps {
  name: string;
  character: string;
  profilePath: string | null;
}

export default function ActorCard({ name, character, profilePath }: ActorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Border effect on hover - slower transition */}
      <div
        className={`absolute inset-0 border-2 rounded-lg transition-colors duration-500 z-10 ${
          isHovered ? 'border-[#4E4C84]' : 'border-transparent'
        }`}
      />
      
      {/* Actor image */}
      <Image
        src={profilePath
          ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${profilePath}`
          : 'https://via.placeholder.com/500x750?text=No+Image'
        }
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 300px"
        className="object-cover"
      />
      
      {/* Dark overlay that appears on hover - slower transition */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          isHovered ? 'opacity-80' : 'opacity-0'
        }`}
      />
      
      {/* Actor name - at the top */}
      <div
        className={`absolute top-0 left-0 right-0 p-3 text-white text-xl font-bold z-20 opacity-0 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
      >
        {name}
      </div>
      
      {/* Character name - at the bottom */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 text-white z-20 opacity-0 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
      >
        <span className="text-sm opacity-75">as</span>
        <p className="text-xl font-bold">{character}</p>
      </div>
    </div>
  );
}