import { fetchTVShowDetails } from '@/utils/api';
import ShowDetails from '@/components/ShowDetails';

export default async function ShowPage({ params }: { params: { id: string } }) {
  const show = await fetchTVShowDetails(parseInt(params.id));
  return <ShowDetails show={show} />;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const show = await fetchTVShowDetails(parseInt(params.id));
  return {
    title: `${show.name} - TV Shows`,
    description: show.overview,
  };
}