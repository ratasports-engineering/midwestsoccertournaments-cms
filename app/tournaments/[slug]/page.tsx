import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TournamentClientPage from './client-page';

export const revalidate = 300;

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let data;
  try {
    data = await client.queries.tournament({
      relativePath: `${slug}.mdx`,
    });
  } catch (error) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <TournamentClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let tournaments = await client.queries.tournamentConnection();
  const allTournaments = tournaments;

  if (!allTournaments.data.tournamentConnection.edges) {
    return [];
  }

  while (tournaments.data.tournamentConnection.pageInfo.hasNextPage) {
    tournaments = await client.queries.tournamentConnection({
      after: tournaments.data.tournamentConnection.pageInfo.endCursor,
    });

    if (!tournaments.data.tournamentConnection.edges) {
      break;
    }

    allTournaments.data.tournamentConnection.edges.push(...tournaments.data.tournamentConnection.edges);
  }

  const params = allTournaments.data?.tournamentConnection.edges
    .map((edge) => {
      // The relativePath is like "summer-cup.mdx", we want just the slug
      const filename = edge?.node?._sys.filename;
      return filename ? { slug: filename } : null;
    })
    .filter((param) => param !== null) as { slug: string }[];

  return params;
}
