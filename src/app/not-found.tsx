// pages/404.js
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
const Button = dynamic(() =>
  import("@nextui-org/button").then((item) => item.Button)
);
const Image = dynamic(() =>
  import("@nextui-org/image").then((item) => item.Image)
);

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] text-center px-6 py-12">
      <div className="mb-6">
        <Image
          removeWrapper
          alt="Page not found"
          className="w-96 h-auto mx-auto"
          src="/empty-state-pack.webp"
        />
      </div>
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <Button variant="solid">Back to Homepage</Button>
      </Link>
    </div>
  );
}
