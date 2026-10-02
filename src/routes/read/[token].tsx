import { useParams } from "@solidjs/router";
import { ChronicleReadingCtrl } from "../../features/chronicle/chronicle-reading.ctrl";

export default function ReadRoute() {
  const params = useParams<{ token: string }>();
  return <ChronicleReadingCtrl token={params.token} />;
}
