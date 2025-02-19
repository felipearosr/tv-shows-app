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
      className="relative aspect-[2/3] rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Border effect on hover */}
      <div 
        className={`absolute inset-0 border-2 rounded-lg transition-colors z-10 ${
          isHovered ? 'border-blue-500' : 'border-transparent'
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
      
      {/* Dark overlay that appears on hover */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isHovered ? 'opacity-40' : 'opacity-0'
        }`}
      />
      
      {/* Actor name - appears on top on hover */}
      <div 
        className={`absolute top-0 left-0 right-0 p-3 text-white font-medium transition-transform duration-300 z-20 ${
          isHovered ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {name}
      </div>
      
      {/* Character name - appears on bottom on hover */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-3 text-white transition-transform duration-300 z-20 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <span className="text-sm opacity-75">as</span>
        <p className="font-medium">{character}</p>
      </div>
    </div>
  );
}