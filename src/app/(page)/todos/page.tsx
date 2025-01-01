import { Metadata } from "next";
import dynamic from "next/dynamic";
const Todo = dynamic(() =>
  import("@/src/components/templates/Todo").then((item) => item.Todo)
);

export const metadata: Metadata = {
  title: "Todos | Cambourism",
  description: "Bringing the wonders of Cambodia to the world"
};
export default function Todos() {
  return <Todo />;
}
