"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "../../../../context/userContext";
import { displayToast } from "@/src/lib/toast";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { signin } = useUser();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await signin({ email, password });
    } catch (error: any) {
      displayToast(error.message, "error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex justify-center items-center">
      <div className="bg-white/15 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs flex flex-col gap-5"
        >
          {/* Email */}
          <Input
            isRequired
            errorMessage="Please enter email address"
            label="Email Address"
            labelPlacement="outside"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            type="email"
            onChange={handleChange}
          />

          {/* Password */}
          <Input
            isRequired
            errorMessage="Please enter password"
            label="Password"
            labelPlacement="outside"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
          />

          {/* Submit Button */}
          <Button type="submit" color="primary">
            Sign In
          </Button>
        </form>

        <p className="text-center text-gray-200 mt-4">
          Create an new account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
