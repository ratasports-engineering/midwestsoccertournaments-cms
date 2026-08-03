"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { TournamentQuery } from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { Section } from "@/components/layout/section";

export interface TournamentClientPageProps {
  data: {
    tournament: TournamentQuery["tournament"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function TournamentClientPage(props: TournamentClientPageProps) {
  const { data } = useTina({ ...props });
  const tournament = data.tournament;

  // Format the start date
  const startDate = tournament.startDate
    ? new Date(tournament.startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <ErrorBoundary>
      <Section>
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
              {tournament.title}
            </h1>
            <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4 text-lg text-gray-600 dark:text-gray-400">
              {startDate && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{startDate}</span>
                </div>
              )}
              {tournament.location && (
                <>
                  <span className="hidden sm:inline">&bull;</span>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{tournament.location}</span>
                  </div>
                </>
              )}
            </div>
          </header>

          <main className="prose prose-lg mx-auto dark:prose-invert">
            <TinaMarkdown content={tournament.body} />
          </main>
        </div>
      </Section>
    </ErrorBoundary>
  );
}
