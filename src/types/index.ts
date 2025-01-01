import { MutableRefObject, Ref, RefObject } from "react";

type ReactRef<T> = RefObject<T> | MutableRefObject<T> | Ref<T>;

// Define the type for the destination item
export type DestinationProps = {
  item: {
    id: string;
    name: string;
    image: string;
    country: string;
    description: string;
  };
  ref?: ReactRef<HTMLDivElement | null | any>;
};
