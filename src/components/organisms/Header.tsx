"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Divider,
  Link
} from "@nextui-org/react";
import Dropdown from "../molecules/Dropdown";
import { useUser } from "../../context/userContext";
import { Plus } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Destinations", href: "/destinations" },
  { name: "Todos", href: "/todos" }
];

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export function Header() {
  const pathname = usePathname();
  const { user, signout } = useUser();
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <Link className="hidden sm:block font-bold text-inherit" href="/">
            CAMBOURISM
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          {navItems.map((item, index) => {
            return (
              <NavbarItem key={index}>
                <Link
                  color={pathname === item.href ? "primary" : "foreground"}
                  href={item.href}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {user === null ? (
          <div className="flex">
            <Link href="/signin">
              <Button variant="light">Sign In</Button>
            </Link>
            <Divider orientation="vertical" />
            <Link href="/signup">
              <Button variant="solid">Sign Up</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/destinations/create">
              <Button variant="solid">
                <Plus size={16} />
                New destination
              </Button>
            </Link>
            <Dropdown user={user} handleSignOut={signout} />
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}
