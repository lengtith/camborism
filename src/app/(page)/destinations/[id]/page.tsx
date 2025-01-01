import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link
} from "@nextui-org/react";
import { GlobeHemisphereEast } from "@phosphor-icons/react/dist/ssr";

async function fetchDestinations(id: any) {
  const res = await fetch(`http://localhost:8000/destinations/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Content not found`);
  }

  const destination = await res.json();

  return destination;
}

async function fetchRelateDestinations(query: any) {
  const res = await fetch(`http://localhost:8000/destinations/?q=${query}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Content not found`);
  }

  const destination = await res.json();

  return destination;
}

export default async function Tour({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const destination = await fetchDestinations(id);
  const relateDestination = await fetchRelateDestinations(
    destination?.continent
  );

  return (
    <>
      <section className="w-full">
        <Card className="relative w-full h-[500px] rounded-none">
          <CardHeader className="w-full max-w-5xl absolute transform -translate-x-1/2 z-10 top-10 left-1/2 px-6 rounded-none">
            <h4 className="text-white font-semibold text-5xl leading-tight">
              {destination?.name}
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover rounded-none bg-fixed"
            src={destination?.image}
          />
        </Card>
      </section>

      <section className="m-auto w-full max-w-5xl px-6 py-20 flex flex-col gap-8">
        <div className="flex items-end gap-2">
          <h4 className="text-3xl font-medium">{destination?.name}</h4>
          <p className="text-sm text-indigo-600  uppercase text-white/80">
            {destination?.country}
          </p>
        </div>
        <hr />
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <p className="basis-64 capitalize">population</p>
            <p className="flex-1">: {destination?.population}</p>
          </div>
          <div className="flex gap-3">
            <p className="basis-64 capitalize">currency</p>
            <p className="flex-1">: {destination?.currency}</p>
          </div>
          <div className="flex gap-3">
            <p className="basis-64 capitalize">language</p>
            <p className="flex-1">: {destination?.language}</p>
          </div>
          <div className="flex gap-3">
            <p className="basis-64 capitalize">time to visit</p>
            <p className="flex-1">: {destination?.best_time_to_visit}</p>
          </div>
          <div className="flex gap-3">
            <p className="basis-64 capitalize">local dishes</p>
            <p className="flex-1">
              : {destination?.local_dishes?.map((item: any) => item)}
            </p>
          </div>
          <div className="flex gap-3">
            <p className="basis-64 capitalize">activities</p>
            <p className="flex-1">
              : {destination?.activities?.map((item: any) => item)}
            </p>
          </div>
          <div className="flex gap-3">
            <p className="basis-64 capitalize">top places</p>
            <p className="flex-1">
              : {destination?.top_attractions?.map((item: any) => item)}
            </p>
          </div>
          <div className="flex gap-3">
            <p className="basis-64 capitalize">description</p>
            <p className="flex-1">: {destination?.description}</p>
          </div>
        </div>
      </section>

      <section className="m-auto w-full max-w-5xl px-6 pb-20 flex flex-col gap-8">
        <div className="py-5">
          <h4 className="text-3xl font-medium">Relate places</h4>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {relateDestination.slice(0, 3).map((item: any, index: number) => (
            <Card key={index} className="w-full">
              <CardBody className="relative w-full h-[200px] p-0">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover rounded-b-none"
                  src={item?.image}
                />
              </CardBody>
              <CardFooter className="bg-white border-t-1 border-zinc-100/50 z-10 justify-between items-end">
                <div>
                  <p className="text-black text-medium mb-2">{item?.name}</p>
                  <div className="text-gray-950 flex items-center gap-2">
                    <GlobeHemisphereEast size={20} className="text-blue-500" />
                    <p className="text-sm">{item?.country}</p>
                  </div>
                </div>
                <Link href={`/destinations/${item.id}`}>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Explore Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
