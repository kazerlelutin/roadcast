import { useParams } from "@solidjs/router";
import { PresentationView } from "../../../features/presentation/presentation.view";
export default function ReadRoute() { const params = useParams<{ slug: string }>(); return <PresentationView token={`lecture-${params.slug}`} />; }
