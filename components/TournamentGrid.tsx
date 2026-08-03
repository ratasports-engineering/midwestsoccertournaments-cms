import React from 'react';
import client from '@/tina/__generated__/client';
import { format } from 'date-fns';

export interface TournamentGridProps {
  heading?: string;
}

export default async function TournamentGrid({ heading }: TournamentGridProps) {
  const tournamentsResponse = await client.queries.tournamentConnection();
  const tournaments = tournamentsResponse.data.tournamentConnection.edges?.map(edge => edge?.node) || [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTournaments = tournaments
    .filter(tournament => {
      if (!tournament?.startDate) return false;
      const startDate = new Date(tournament.startDate);
      return startDate >= today;
    })
    .sort((a, b) => {
      const dateA = new Date(a!.startDate).getTime();
      const dateB = new Date(b!.startDate).getTime();
      return dateA - dateB;
    });

  if (upcomingTournaments.length === 0) {
    return null; // Or some fallback message if desired
  }

  return (
    <div className="my-8">
      {heading && <h2 className="text-2xl font-bold mb-6">{heading}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingTournaments.map((tournament) => {
          if (!tournament) return null;
          return (
            <div key={tournament.id} className="border rounded-lg p-6 shadow-sm flex flex-col bg-white">
              <h3 className="text-xl font-semibold mb-2">{tournament.title}</h3>
              {tournament.startDate && (
                <p className="text-gray-600 mb-1">
                  <strong>Date:</strong> {format(new Date(tournament.startDate), 'MMMM d, yyyy')}
                </p>
              )}
              {tournament.location && (
                <p className="text-gray-600">
                  <strong>Location:</strong> {tournament.location}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
