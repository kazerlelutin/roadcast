import { useParams } from "@solidjs/router";
import { SliderOutputCtrl } from "../../features/presentation/slider-output.ctrl";
export default function SliderRoute() { const params = useParams<{ token: string }>(); return <SliderOutputCtrl token={params.token} />; }
