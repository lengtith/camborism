import dynamic from "next/dynamic";
const HomeComponent = dynamic(() =>
  import("@/src/components/templates/Home").then((item) => item.Home)
);
export default async function Home() {
  async function fetchDestinations() {
    try {
      const response = await fetch("http://localhost:3000/api/destinations");

      if (!response.ok) {
        throw new Error("Failed to fetch destinations");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      return [];
    }
  }

  const randomDestinations = (data: any) => {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Get random index
      [data[i], data[j]] = [data[j], data[i]]; // Swap elements
    }
    return data;
  };
  const data = await fetchDestinations();
  const destinations = randomDestinations(data);
  return <HomeComponent destinations={destinations} />;
}
