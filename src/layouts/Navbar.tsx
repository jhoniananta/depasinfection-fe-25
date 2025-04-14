"use client";

import NextImage from "@/components/NextImage";

import IconButton from "@/components/buttons/IconButton";
import UnstyledLink from "@/components/links/UnstyledLink";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthStore from "@/store/useAuthStore";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineLogout, HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const pathname = usePathname();

  const user = useAuthStore.useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = clsx(
    "fixed top-0 left-0 w-full z-50 h-auto",
    scrolled
      ? "bg-neutral-50 text-purple-700"
      : "bg-neutral-50 lg:bg-transparent text-purple-700 lg:text-neutral-50",
  );

  const buttonClasses = clsx(
    "shadow-sm ",
    scrolled
      ? "bg-neutral-50 text-purple-700"
      : "lg:bg-purple-700 text-purple-700 lg:hover:bg-purple-600 lg:text-neutral-50",
  );

  // Menu links
  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "OKGD", href: "/okgd-event" },
    { label: "UDSRC", href: "/udsrc-event" },
    { label: "Merchandise", href: "/coming-soon" },
  ];

  // Kelas untuk bagian tengah dan kanan saat belum discrolled
  const middleSectionClasses = clsx(
    "hidden gap-4 lg:flex items-center justify-center h-full",
    scrolled ? "bg-neutral-50" : "bg-purple-700",
  );

  const rightSectionClasses = clsx(
    "hidden lg:flex items-center justify-end space-x-4 h-full w-full",
    scrolled ? "bg-neutral-50" : "bg-purple-700",
  );

  return (
    <header className={headerClasses}>
      <nav className="container grid h-full w-screen grid-cols-2 items-center py-4 lg:grid-cols-3 lg:py-0">
        {/* BAGIAN KIRI: Tetap transparan */}
        {scrolled ? (
          <NextImage
            serverStaticImg
            width={446}
            height={112}
            className="hidden h-[92px] lg:flex"
            imgClassName="h-[112px] w-auto"
            src="/images/left-logo-desktop-navbar-scrolled.png"
            alt="logo-navbar"
          />
        ) : (
          <NextImage
            serverStaticImg
            width={446}
            height={80}
            className="hidden h-full w-full object-cover lg:flex"
            src="/images/left-logo-desktop-navbar.png"
            alt="logo-navbar"
          />
        )}

        <NextImage
          serverStaticImg
          width={56}
          height={50}
          className="block h-auto w-full lg:hidden"
          src="/images/left-logo-mobile-navbar.png"
          alt="logo-navbar"
        />

        {/* BAGIAN TENGAH: background kondisional */}
        <div className={middleSectionClasses}>
          {menuLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <UnstyledLink
                key={label}
                href={href}
                className={clsx(
                  "font-bold uppercase transition-all duration-200",
                  isActive
                    ? "text-cream-400 underline"
                    : "text-inherit hover:underline",
                )}
              >
                {label}
              </UnstyledLink>
            );
          })}
        </div>

        {/* BAGIAN KANAN: background kondisional */}
        <div className={rightSectionClasses}>
          {/* <Select>
            <SelectTrigger className="flex w-fit border-0 shadow-none focus:border-0 focus:outline-none focus:ring-0">
              <SelectValue placeholder="Pilih Bahasa" />
            </SelectTrigger>
            <SelectContent className="border-0">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="id">ID</SelectItem>
            </SelectContent>
          </Select> */}
          {user ? (
            <>
              <span className="text-[12px] font-semibold">
                Hello, {user.full_name.split(" ")[0]}
              </span>
              <Button variant="outline" className={buttonClasses}>
                <Link
                  href={
                    user.role === "USER"
                      ? "/dashboard"
                      : ["SUPERADMIN", "OKGD_ADMIN", "UDSRC_ADMIN"].includes(
                            user.role,
                          )
                        ? "/admin"
                        : "/"
                  }
                  className="flex flex-row items-center justify-center gap-2"
                >
                  Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <Button variant="outline" className={buttonClasses}>
              <Link
                href="/login"
                className="flex flex-row items-center justify-center gap-2"
              >
                <HiOutlineLogout />
                Login
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center justify-end lg:hidden">
          <IconButton
            variant="ghost"
            onClick={() => setMobileNavOpen(true)}
            className={`text-purple-700 focus:outline-none`}
            iconClassName="text-2xl"
            icon={HiOutlineMenuAlt3}
          />
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <Transition
        show={mobileNavOpen}
        enter="transition duration-300 ease-out"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition duration-300 ease-in"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
      >
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-50 p-4 lg:hidden">
          <div className="mb-4 flex items-center justify-between">
            <NextImage
              serverStaticImg
              width={56}
              height={50}
              className="w-48"
              src="/images/left-logo-mobile-navbar.png"
              alt="logo-navbar"
            />
            <IconButton
              variant="ghost"
              onClick={() => setMobileNavOpen(false)}
              className="text-purple-700 focus:outline-none"
              iconClassName="text-2xl"
              icon={HiX}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            {menuLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <UnstyledLink
                  key={label}
                  href={href}
                  className={clsx(
                    "font-bold uppercase transition-all duration-200",
                    isActive
                      ? "text-cream-400 underline"
                      : "text-inherit hover:underline",
                  )}
                >
                  {label}
                </UnstyledLink>
              );
            })}

            <Select>
              <SelectTrigger className="border-0 shadow-none focus:outline-none">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="border-0">
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="id">ID</SelectItem>
              </SelectContent>
            </Select>
            {user ? (
              <>
                <span className="font-semibold">{user.full_name}</span>
                <Button variant="outline" className={buttonClasses}>
                  <Link
                    href={
                      user.role === "USER"
                        ? "/dashboard"
                        : ["SUPERADMIN", "OKGD_ADMIN", "UDSRC_ADMIN"].includes(
                              user.role,
                            )
                          ? "/admin"
                          : "/"
                    }
                    className="flex flex-row items-center justify-center gap-2"
                  >
                    Dashboard
                  </Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" className={buttonClasses}>
                <Link
                  href="/login"
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <HiOutlineLogout />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Transition>
    </header>
  );
}
