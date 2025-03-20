"use client";

import NextImage from "@/components/NextImage";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import UnstyledLink from "@/components/links/UnstyledLink";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
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
    "fixed top-0 left-0 w-full z-50 h-20 py-4 transition-colors duration-300",
    scrolled
      ? "bg-neutral-50 text-purple-700 shadow-md"
      : "bg-transparent text-purple-700 lg:text-neutral-50",
  );

  const mobileClasses = clsx(scrolled ? "text-purple-700" : "text-neutral-50");

  const buttonClasses = clsx(
    "shadow-sm",
    scrolled
      ? "bg-neutral-50 text-purple-700"
      : "lg:bg-purple-700 text-purple-700 lg:hover:bg-purple-600 lg:text-neutral-50",
  );

  // Menu links (bisa dikembangkan jika ada href berbeda)
  const menuLinks = ["Home", "About", "Contact"];

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <NextImage
          serverStaticImg
          width={56}
          height={50}
          className="w-48"
          src="/images/logo-navbar.png"
          alt="logo-navbar"
        />

        <div className="hidden lg:flex items-center space-x-4">
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

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <Select>
            <SelectTrigger className="border-0 w-fit flex shadow-none focus:outline-none focus:border-0 focus:ring-0">
              <SelectValue placeholder="Pilih Bahasa" />
            </SelectTrigger>
            <SelectContent className="border-0">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="id">ID</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className={buttonClasses}
            rightIcon={HiOutlineLogout}
          >
            Login
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden">
          <IconButton
            variant="ghost"
            onClick={() => setMobileNavOpen(true)}
            className={`focus:outline-none text-2xl ${mobileClasses}`}
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
              src="/images/logo-navbar.png"
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
                <SelectItem className="" value="en">
                  EN
                </SelectItem>
                <SelectItem value="id">ID</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className={buttonClasses}
              rightIcon={HiOutlineLogout}
            >
              Login
            </Button>
          </div>
        </div>
      </Transition>
    </header>
  );
}
