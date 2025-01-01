"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
const Button = dynamic(() =>
  import("@nextui-org/button").then((item) => item.Button)
);
const Image = dynamic(() =>
  import("@nextui-org/image").then((item) => item.Image)
);

export default function GlobalError() {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-65px)] justify-center text-center px-6 py-12">
      <div className="mb-6">
        <Image
          removeWrapper
          alt="Page not found"
          className="w-96 h-auto mx-auto"
          src="/robotic-troubleshoot-ai.webp"
        />
      </div>
      <p className="text-xl text-gray-700 mb-8">
        Oops! Something went wrong on our server.
      </p>

      <Link href="/">
        <Button variant="solid">Back to Homepage</Button>
      </Link>
    </div>
  );
}
