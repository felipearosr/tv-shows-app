// src/app/components/actor-card/page.tsx
'use client';

import ActorCard from '@/components/ActorCard';

export default function ActorCardPreview() {
  // Sample actor data for preview
  const actors = [
    {
      id: 1,
      name: 'Kit Harington',
      character: 'Jon Snow',
      profilePath: '/4MqUjb1SYrzHmFSyGiXnlZWLvBs.jpg'
    },
    {
      id: 2,
      name: 'Emilia Clarke',
      character: 'Daenerys Targaryen',
      profilePath: '/86jeYFV40KctQMDQIWhJ5oviNGj.jpg'
    },
    {
      id: 3,
      name: 'Peter Dinklage',
      character: 'Tyrion Lannister',
      profilePath: '/8Z5nLV9Np7W9wWeZQAiimAQ6sLT.jpg'
    },
    {
      id: 4,
      name: 'Sophie Turner',
      character: 'Sansa Stark',
      profilePath: '/3T8rFgLbfuQoPFvQZxP9SzLyPWF.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#06051E] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">ActorCard Component Preview</h1>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Individual Card</h2>
          <div className="w-48">
            <ActorCard 
              name={actors[0].name}
              character={actors[0].character}
              profilePath={actors[0].profilePath}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Card Grid</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {actors.map(actor => (
              <ActorCard
                key={actor.id}
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