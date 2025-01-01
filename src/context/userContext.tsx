"use client";

import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the types for user and context
interface UserContextType {
  user: { id: string; email: string } | null | undefined;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialUser: UserContextType["user"];
}

export const UserProvider = ({ children, initialUser }: UserProviderProps) => {
  const [user, setUser] = useState<UserContextType["user"]>(initialUser);
  const navigate = useRouter();

  const signin = async (data: { email: string; password: string }) => {
    const res = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...data })
    });

    const result = await res.json();
    if (res.ok) {
      setUser(result);
      navigate.push("/");
    } else {
      throw new Error(result.error);
    }
  };

  // Signout function to clear user state and redirect
  const signout = async () => {
    setUser(null);
    await fetch("/api/auth/signout", {
      method: "POST"
    });
  };

  return (
    <UserContext.Provider value={{ user, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
