"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";

const Header = ({session}: {session: Session}) => {
  const pathName = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href={"/"}>
        <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
      </Link>
      <ul className="flex flex-row gap-5 items-center">
        <li>
          <Link
            href={"/library"}
            className={cn(
              `text-base cursor-pointer capitalize`,
              pathName === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="text-white">
                {session?.user?.name || ""}
              </AvatarFallback>
              
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
