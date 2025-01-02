"use client";
import React from "react";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown as DropdownMain,
  DropdownMenu,
  Avatar
} from "@nextui-org/react";

type DropdownProps = {
  user: any;
  handleSignOut: () => void;
};

const Dropdown = ({ user, handleSignOut }: DropdownProps) => {
  return (
    <DropdownMain placement="bottom-end">
      <DropdownTrigger data-testid="profile" className="profile">
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="btn-signout"
          onPress={handleSignOut}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </DropdownMain>
  );
};

export default Dropdown;
