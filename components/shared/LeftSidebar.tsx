"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLink {
  label: string;
  route: string;
  imgURL: string;
}

interface LeftSidebarProps {
  filteredSidebarLinks: SidebarLink[];
}

function LeftSidebar({ filteredSidebarLinks }: LeftSidebarProps) {
  // Accept filteredSidebarLinks as a prop
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <section className="leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-8">
        <div className="flex flex-col items-center mb-10">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-[54px] w-[54px]",
              },
            }}
          />
          <p>{user?.username}</p>
        </div>
        {filteredSidebarLinks.map((link) => {
          // Use filteredSidebarLinks here
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`leftsidebar_link p-3${
                isActive &&
                "bg-[#fff] shadow-[0px_4px_15px_0px_#D8D2FC] rounded-2xl"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={23}
                height={23}
              />
              {isActive && (
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LeftSidebar;
