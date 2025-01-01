import { Metadata } from "next";
import dynamic from "next/dynamic";
const Destination = dynamic(() =>
  import("@/src/components/templates/Destination").then(
    (item) => item.Destination
  )
);

export const metadata: Metadata = {
  title: "Destinations | Cambourism",
  description: "Bringing the wonders of Cambodia to the world"
};

export default function Destinations() {
  return <Destination />;
}
