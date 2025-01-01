"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { displayToast } from "@/src/lib/toast";

const SignupPage = () => {
  const navigation = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData
        })
      });

      if (!res.ok) {
        displayToast("Create a new account failed", "error");
      }
      navigation.push("/");
      displayToast("Create a new account successfully", "success");
    } catch (error: any) {
      displayToast(`Create a new account failed on ${error.message}`, "error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex justify-center items-center">
      <div className="bg-white/15 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>

        <form
          className="w-full max-w-xs flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <Input
            isRequired
            errorMessage="Please enter full name"
            label="Name"
            labelPlacement="outside"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            type="text"
            onChange={handleChange}
          />

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
            validate={(value) => {
              if (value && value.length < 5) {
                return "Username must be at least 5 characters long";
              }
            }}
          />

          {/* Submit Button */}
          <Button type="submit" color="primary">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-gray-200 mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
