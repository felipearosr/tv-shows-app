// src/app/components/actor-card/page.tsx
'use client';

import ActorCard from '@/components/ActorCard';

export default function ActorCardPreview() {
  // Sample actor data for preview
  const actor = {
    id: 1,
    name: 'Kit Harington',
    character: 'Jon Snow',
    profilePath: '/4MqUjb1SYrzHmFSyGiXnlZWLvBs.jpg'
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">ActorCard Component Preview</h1>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Size Variants</h2>
          
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-gray-300 mb-2">Small (180px width)</h3>
              <div className="w-[180px]">
                <ActorCard 
                  name={actor.name}
                  character={actor.character}
                  profilePath={actor.profilePath}
                  size="sm"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-300 mb-2">Medium (240px width)</h3>
              <div className="w-[240px]">
                <ActorCard 
                  name={actor.name}
                  character={actor.character}
                  profilePath={actor.profilePath}
                  size="md"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-300 mb-2">Large (300px width)</h3>
              <div className="w-[300px]">
                <ActorCard 
                  name={actor.name}
                  character={actor.character}
                  profilePath={actor.profilePath}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Responsive Grid Example</h2>
          <p className="text-gray-300 mb-6">These cards automatically adjust text size based on screen size:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array(6).fill(actor).map((actor, index) => (
              <ActorCard
                key={index}
                name={actor.name}
                character={actor.character}
                profilePath={actor.profilePath}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}