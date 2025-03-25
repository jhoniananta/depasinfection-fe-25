"use client";

import NextImage from "@/components/NextImage";

import IconButton from "@/components/buttons/IconButton";
import UnstyledLink from "@/components/links/UnstyledLink";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineLogout, HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
  const menuLinks = ["Home", "About", "Contact"];

  // Kelas untuk bagian tengah dan kanan saat belum discrolled
  const middleSectionClasses = clsx(
    "hidden lg:flex items-center justify-center space-x-4 h-full",
    scrolled ? "bg-neutral-50" : "bg-purple-700",
  );

  const rightSectionClasses = clsx(
    "hidden lg:flex items-center justify-end space-x-4 h-full w-full",
    scrolled ? "bg-neutral-50" : "bg-purple-700",
  );

  return (
    <header className={headerClasses}>
      <nav className="container py-4 lg:py-0 grid grid-cols-2 lg:grid-cols-3 items-center h-full w-screen">
        {/* BAGIAN KIRI: Tetap transparan */}
        {scrolled ? (
          <NextImage
            serverStaticImg
            width={446}
            height={112}
            className=" h-[92px] hidden lg:flex"
            imgClassName="h-[112px] w-auto"
            src="/images/left-logo-desktop-navbar-scrolled.png"
            alt="logo-navbar"
          />
        ) : (
          <NextImage
            serverStaticImg
            width={446}
            height={80}
            className="w-full h-full object-cover hidden lg:flex"
            src="/images/left-logo-desktop-navbar.png"
            alt="logo-navbar"
          />
        )}

        <NextImage
          serverStaticImg
          width={56}
          height={50}
          className="w-full h-auto block lg:hidden"
          src="/images/left-logo-mobile-navbar.png"
          alt="logo-navbar"
        />

        {/* BAGIAN TENGAH: background kondisional */}
        <div className={middleSectionClasses}>
          {menuLinks.map((label) => (
            <UnstyledLink
              key={label}
              href="/"
              className="uppercase font-bold hover:underline"
            >
              {label}
            </UnstyledLink>
          ))}
        </div>

        {/* BAGIAN KANAN: background kondisional */}
        <div className={rightSectionClasses}>
          <Select>
            <SelectTrigger className="border-0 w-fit flex shadow-none focus:outline-none focus:border-0 focus:ring-0">
              <SelectValue placeholder="Pilih Bahasa" />
            </SelectTrigger>
            <SelectContent className="border-0">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="id">ID</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className={buttonClasses}>
            <Link
              href="/login"
              className="flex-row flex gap-2 items-center justify-center"
            >
              <HiOutlineLogout />
              Login
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex justify-end items-center">
          <IconButton
            variant="ghost"
            onClick={() => setMobileNavOpen(true)}
            className={`focus:outline-none text-purple-700`}
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
        <div className="lg:hidden fixed inset-0 bg-neutral-50 p-4 z-50 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
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
              className="focus:outline-none text-purple-700"
              iconClassName="text-2xl"
              icon={HiX}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            {menuLinks.map((label) => (
              <UnstyledLink
                key={label}
                href="/"
                className="uppercase font-bold hover:underline"
              >
                {label}
              </UnstyledLink>
            ))}
            <Select>
              <SelectTrigger className="border-0 shadow-none focus:outline-none">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="border-0">
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="id">ID</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className={buttonClasses}>
              <Link
                href="/login"
                className="flex-row flex gap-2 items-center justify-center"
              >
                <HiOutlineLogout />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </Transition>
    </header>
  );
}
