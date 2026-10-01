import { useParams } from "@solidjs/router";
import { PresentationView } from "../../features/presentation/presentation.view";
export default function SliderRoute() { const params = useParams<{ token: string }>(); return <PresentationView token={params.token} />; }
