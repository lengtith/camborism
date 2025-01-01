import {
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Button
} from "@nextui-org/react";
import { GlobeHemisphereEast } from "@phosphor-icons/react/dist/ssr";

type DestinationProps = { destinations: Destination[] };

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
}

export const Home = ({ destinations }: DestinationProps) => {
  return (
    <main className="w-full">
      <section className="w-full h-[calc(100vh-64px)]">
        <Card className="relative w-full h-full rounded-none">
          <CardHeader className="absolute h-full flex flex-col items-start justify-center">
            <div className="m-auto w-full max-w-5xl px-6">
              <h5 className="text-3xl text-white/80 uppercase font-bold mb-2">
                Welcome to Cambodia
              </h5>
              <h4 className="text-white font-bold text-6xl">
                Kingdom of Wonder
              </h4>
            </div>
          </CardHeader>

          <Image
            removeWrapper
            alt="Card background"
            className="z-0 object-cover"
            src="/klaong-tvea-khmao.jpg"
          />
        </Card>
      </section>

      <section className="w-full py-20 bg-gray-100 bg-[url('/tour_bg_1.jpg')] bg-top bg-no-repeat bg-[length:100vw_450px]">
        <div className="max-w-5xl m-auto px-6">
          <div className="text-center mb-14 text-indigo-950">
            <h6 className="text-2xl uppercase font-normal mb-3">
              Wonderful Place For You
            </h6>
            <h4 className="text-5xl font-semibold mb-6">
              Popular Destinations We Offer For All
            </h4>
            <p className="max-w-xl m-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations
              .slice(0, 3)
              .map((item: Destination, index: number) => (
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
                      <p className="text-black text-medium mb-2">
                        {item?.name}
                      </p>
                      <div className="text-gray-950 flex items-center gap-2">
                        <GlobeHemisphereEast
                          size={20}
                          className="text-blue-500"
                        />
                        <p className="text-sm">{item?.country}</p>
                      </div>
                    </div>
                    <Link href={`destinations/${item.id}`}>
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
        </div>
      </section>
    </main>
  );
};
