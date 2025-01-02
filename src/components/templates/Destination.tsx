"use client";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
  Spinner
} from "@nextui-org/react";
import {
  List,
  GlobeHemisphereEast,
  SquaresFour
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { displayToast } from "@/src/lib/toast";

export function Destination() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [noData, setNoData] = useState<boolean>(false);
  const [viewLayout, setViewLayout] = useState<"list" | "grid" | string>(
    "list"
  );
  const observer = useRef<any>();
  const params = new URLSearchParams(searchParams);

  type FetchPostProps = {
    page?: number;
    query?: string | null;
  };

  const fetchPosts = async ({ page, query }: FetchPostProps) => {
    const search = query ? `&q=${query}` : "";
    try {
      const response = await fetch(
        `http://localhost:3000/api/destinations?_page=${page}${search}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  };

  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);
    const query = params.get("q") !== null ? params.get("q") : searchInput;
    const newPosts = await fetchPosts({ page, query });

    if (newPosts?.error) {
      setIsLoading(false);
      setNoData(true);
      displayToast(`Destinations failed to fetch`, "error");
      throw new Error(newPosts.error);
    }

    if (newPosts?.data?.length === 0) {
      setHasMore(false);
      setIsLoading(false);
    } else {
      setPosts((prevPosts: any) => [...prevPosts, ...newPosts?.data]);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (hasMore) {
      loadMorePosts();
    }
  }, [loadMorePosts, hasMore]);

  const lastPostElementRef = useCallback(
    (node: any) => {
      if (isLoading || !hasMore) return; // Stop observing if loading or no more posts
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        setTimeout(() => {
          if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1); // Trigger loading of new posts by changing page number
          }
        }, 2000);
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Handle key press to trigger submission when Enter key is pressed
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      params.set("q", searchInput);

      replace(`${pathname}?${params.toString()}`);

      const response = await fetch(
        `http://localhost:3000/api/destinations?q=${searchInput}`
      );
      const result = await response.json();
      setPosts(result.data);
      setPage(2);
    }
  };

  const handleViewLayout = (viewType: string) => {
    localStorage.setItem("view-layout", viewType);
    setViewLayout(viewType);
  };

  useEffect(() => {
    const savedLayout = localStorage.getItem("view-layout");
    if (savedLayout) {
      setViewLayout(savedLayout);
    }
  }, []);

  return (
    <>
      <section className="w-full">
        <Card className="w-full h-[500px] rounded-none">
          <CardHeader className="absolute z-10 top-10 flex-col !items-center rounded-none">
            <p className="text-xl text-white/60 uppercase font-bold mb-3">
              Cambodia Kingdom of Wonder
            </p>
            <h4 className="text-white font-semibold text-5xl text-center leading-tight">
              Bringing the wonders of Cambodia <br /> to the world
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover object-top rounded-none"
            src="/temple.jpg"
          />
        </Card>
      </section>
      <section className="m-auto w-full max-w-5xl px-6 py-10">
        <div className="flex justify-between py-4 bg-[#0A0A0A] mb-4">
          <h5 className="text-2xl font-semibold">Explore best places</h5>
          <div className="flex gap-3 items-center">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
              }}
              placeholder="Type to search..."
              size="md"
              startContent={<MagnifyingGlass size={18} />}
              type="search"
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <ButtonGroup variant="flat" color="default" size="md">
              <Button
                isIconOnly
                aria-label="List"
                onPress={() => handleViewLayout("list")}
                className={`${viewLayout === "list" ? "bg-blue-500/25 text-blue-500" : ""}`}
              >
                <List size={20} />
              </Button>
              <Button
                isIconOnly
                aria-label="Grid"
                onPress={() => handleViewLayout("grid")}
                className={`${viewLayout === "grid" ? "bg-blue-500/25 text-blue-500" : ""}`}
              >
                <SquaresFour size={20} />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div
          className={`${viewLayout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" : "flex flex-col gap-5"}`}
        >
          {posts.map((item: any, index: number) => {
            return viewLayout === "grid" ? (
              <Card
                key={index}
                className="w-full"
                ref={posts.length === index + 1 ? lastPostElementRef : null}
              >
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
            ) : (
              <div
                key={index}
                className="group w-full h-44 p-4 border-gray-500 bg-gray-500/25 rounded-2xl flex gap-3"
                ref={posts.length === index + 1 ? lastPostElementRef : null}
              >
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-52 h-full object-cover rounded-lg"
                  src={item?.image}
                />
                <div className="h-full flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-white text-medium mb-2">
                      {item?.name}
                    </h3>
                    <div className="text-gray-300 flex items-center gap-1 mb-2">
                      <GlobeHemisphereEast
                        size={16}
                        className="text-blue-500"
                      />
                      <p className="text-sm">{item?.country}</p>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {item?.description}
                    </p>
                  </div>
                  <Link href={`destinations/${item.id}`}>
                    <Button
                      className="text-sm"
                      color="primary"
                      radius="full"
                      size="sm"
                    >
                      Explore Now
                      <ArrowUpRight
                        size={16}
                        className="group-hover:animate-bounce"
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="flex w-full justify-center py-5">
            <Spinner color="white" />
          </div>
        )}

        {noData && !isLoading && (
          <div className="flex w-full justify-center">
            <p>No destinations found 😓</p>
          </div>
        )}
      </section>
    </>
  );
}
