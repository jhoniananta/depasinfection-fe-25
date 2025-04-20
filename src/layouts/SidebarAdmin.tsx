"use client";

import React from "react";
import { IoExitOutline } from "react-icons/io5";

import LogoutDialog from "@/components/LogOutDialog";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { SidebarAdmin } from "@/contents/sidebar";

import { getToken } from "@/lib/cookies";
import { SidebarProps } from "@/types/sidebar";
import clsx from "clsx";
import jwtDecode from "jsonwebtoken";
import Link from "next/link";

function AdminSidebar({ children }: SidebarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [role, setRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        // Decode token menggunkan jsonwebtoken
        const decoded = jwtDecode.decode(token) as { role?: string };
        setRole(decoded?.role || null);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const isOKGDAdmin = role === "OKGD_ADMIN";
  const isUDSRCAdmin = role === "UDSRC_ADMIN";

  return (
    <>
      <div
        className={`fixed z-30 lg:h-full lg:overflow-y-auto ${
          isMenuOpen ? "h-full" : "h-fit p-4"
        } w-full bg-neutral-50 lg:bg-transparent lg:p-0 lg:shadow-2xl`}
      >
        <div className={`flex justify-between !bg-transparent lg:hidden`}>
          <Link
            href="/"
            className={`flex ${isMenuOpen ? "order-2" : "justify-start"}`}
          >
            <NextImage
              src="/landing-page/logo-depas.png"
              alt="Logo Depas Infection"
              width={34.42}
              height={30}
              className={`${isMenuOpen ? "hidden" : ""} block`}
            />
          </Link>

          <div
            className={`${isMenuOpen ? "flex w-full justify-end p-4" : "flex"} `}
          >
            <Button
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Desktop Version */}
        <div className="hidden min-h-screen lg:flex lg:bg-neutral-50 lg:shadow-xl">
          <div
            className={`hidden h-fit w-[325px] flex-col overflow-y-auto px-6 py-4 pb-12 duration-500 ease-in-out lg:sticky lg:top-0 lg:flex`}
          >
            <div className={`flex w-full items-center justify-center pt-5`}>
              <Link href="/">
                <NextImage
                  src="/landing-page/logo-depas.png"
                  alt="Logo Depas Infection"
                  width={89.21}
                  height={77.75}
                  className="block"
                />
              </Link>
            </div>

            <div className={`flex flex-col space-y-6 pt-8`}>
              {SidebarAdmin.map(
                (
                  item: {
                    section: string;
                    props: {
                      href: string;
                      icon: React.ReactNode;
                      title: string;
                    }[];
                  },
                  index: React.Key | null | undefined,
                ) => {
                  // Filter props berdasarkan role
                  const filteredProps = item.props.filter((link) => {
                    if (isOKGDAdmin) return link.title === "OKGD";
                    if (isUDSRCAdmin) return link.title === "UDSRC";
                    return true; // Tampilkan semua jika role bukan OKGD atau UDSRC
                  });

                  // Jika tidak ada props yang sesuai, jangan render section
                  if (filteredProps.length === 0) return null;

                  return (
                    <div className="flex flex-col" key={index}>
                      <Typography
                        variant="p"
                        className={`flex w-full items-center pb-2 text-[16px] font-semibold text-gray-500 md:text-[16px]`}
                      >
                        {item.section}
                      </Typography>
                      <div className="flex flex-col space-y-2">
                        {filteredProps.map(
                          (
                            link: {
                              href: string;
                              icon: React.ReactNode;
                              title: string;
                            },
                            linkIndex: React.Key | null | undefined,
                          ) => {
                            const isActive =
                              window.location.pathname.startsWith(link.href);
                            return (
                              <Button
                                className={clsx(
                                  "w-full rounded bg-transparent px-2 py-1 shadow-none hover:bg-amber-300",
                                  isActive ? "bg-amber-300" : "bg-transparent",
                                )}
                                key={linkIndex}
                              >
                                <Link
                                  href={link.href}
                                  className="flex w-full flex-row items-center gap-2"
                                >
                                  {link.icon}
                                  <Typography
                                    variant="p"
                                    className="flex w-full items-center justify-between rounded py-1 text-[16px] font-semibold text-neutral-900 md:text-[16px]"
                                  >
                                    {link.title}
                                  </Typography>
                                </Link>
                              </Button>
                            );
                          },
                        )}
                      </div>
                      <hr className="border-grey-400 border-t-2" />
                    </div>
                  );
                },
              )}
            </div>

            <div className={`flex flex-col items-center justify-center`}>
              <LogoutDialog
                // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
                onConfirm={() => {}}
                trigger={(open) => (
                  <Button
                    className="mb-0 mt-4 flex w-full"
                    size="lg"
                    variant="primary"
                    onClick={open}
                  >
                    <IoExitOutline
                      className="text-[16px] font-bold md:text-[20px]"
                      color="#a88a44"
                      strokeWidth={2.5}
                    />
                    <Typography
                      variant="p"
                      className="text-[16px] md:text-[16px]"
                    >
                      Log Out
                    </Typography>
                  </Button>
                )}
              />
            </div>
          </div>

          {/* top title */}
          <section className="lg:min-w-screen hidden h-full w-full bg-neutral-50 lg:flex lg:min-h-screen lg:flex-col lg:items-center">
            <div className="z-0 h-full w-full bg-neutral-50 px-0 lg:max-w-5xl lg:px-7 xl:px-6">
              {children}
            </div>
          </section>
        </div>

        {/* Mobile Menu  */}
        <div
          className={`flex flex-col overflow-y-auto px-6 py-4 duration-500 ease-in-out lg:hidden lg:overflow-y-hidden ${
            isMenuOpen ? "h-full w-full pb-12" : "hidden max-h-0"
          }`}
        >
          <div
            className={`flex items-center justify-center pt-[20px] ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <Link href="/">
              <NextImage
                src="/landing-page/logo-depas.png"
                alt="Logo Depas Infection"
                width={89.21}
                height={77.75}
                className="block"
              />
            </Link>
          </div>

          <div
            className={`flex-col space-y-6 pt-12 ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            {SidebarAdmin.map(
              (
                item: {
                  section: string;
                  props: {
                    href: string;
                    icon: React.ReactNode;
                    title: string;
                  }[];
                },
                index: React.Key | null | undefined,
              ) => {
                // Filter props berdasarkan role
                const filteredProps = item.props.filter((link) => {
                  if (isOKGDAdmin) return link.title === "OKGD";
                  if (isUDSRCAdmin) return link.title === "UDSRC";
                  return true; // Tampilkan semua jika role bukan OKGD atau UDSRC
                });

                // Jika tidak ada props yang sesuai, jangan render section
                if (filteredProps.length === 0) return null;

                return (
                  <div className="flex flex-col" key={index}>
                    <Typography
                      variant="p"
                      className={`flex w-full items-center pb-2 text-[16px] font-semibold text-gray-500 md:text-[16px]`}
                    >
                      {item.section}
                    </Typography>
                    <div className="flex flex-col space-y-2">
                      {filteredProps.map(
                        (
                          link: {
                            href: string;
                            icon: React.ReactNode;
                            title: string;
                          },
                          linkIndex: React.Key | null | undefined,
                        ) => {
                          const isActive = window.location.pathname.startsWith(
                            link.href,
                          );
                          return (
                            <Button
                              className={clsx(
                                "w-full rounded bg-transparent px-2 py-1 shadow-none hover:bg-amber-300",
                                isActive ? "bg-amber-300" : "bg-transparent",
                              )}
                              key={linkIndex}
                            >
                              <Link
                                href={link.href}
                                className="flex w-full flex-row items-center gap-2"
                              >
                                {link.icon}
                                <Typography
                                  variant="p"
                                  className="flex w-full items-center justify-between rounded py-1 text-[16px] font-semibold text-neutral-900 md:text-[16px]"
                                >
                                  {link.title}
                                </Typography>
                              </Link>
                            </Button>
                          );
                        },
                      )}
                    </div>
                    <hr className="border-grey-400 border-t-2" />
                  </div>
                );
              },
            )}
          </div>
          <div
            className={`flex-col items-center justify-center ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            <LogoutDialog
              // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
              onConfirm={() => {}}
              trigger={(open) => (
                <Button
                  className="mb-16 mt-4 flex w-full"
                  size="lg"
                  variant="primary"
                  onClick={open}
                >
                  <IoExitOutline
                    className="text-[16px] font-bold md:text-[20px]"
                    color="#a88a44"
                    strokeWidth={2.5}
                  />
                  <Typography
                    variant="p"
                    className="text-[16px] md:text-[16px]"
                  >
                    Log Out
                  </Typography>
                </Button>
              )}
            />
          </div>
        </div>
      </div>
      <div className="pb-[64px] lg:pb-0" />

      <section className="z-0 flex h-fit min-h-screen w-full overflow-y-auto bg-neutral-50 lg:hidden">
        {children}
      </section>
    </>
  );
}

export default AdminSidebar;
