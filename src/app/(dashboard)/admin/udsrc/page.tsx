"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";

import Typography from "@/components/Typography";
import withAuth from "@/components/WithAuth";
import Sidebar from "@/layouts/SidebarAdmin";

import LoadingGlobalPage from "@/app/loading";
import NextImage from "@/components/NextImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { participantsUDSRC } from "@/types/dashboard-admin";
import Link from "next/link";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useAdminUDSRCDataQuery } from "../_hooks/@get/useAdmin";

export default withAuth(AdminUDSRCDashboardPage, "ADMIN");
function AdminUDSRCDashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [totalPages, setTotalPage] = React.useState<number>(0);
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(
    parseInt(searchParams.get("limit") || "10", 10),
  );
  const [apiSearchKeyword, setApiSearchKeyword] = React.useState<string>("");

  const {
    data: tableData,
    isLoading,
    // isError,
  } = useAdminUDSRCDataQuery(currentPage, itemsPerPage, apiSearchKeyword);
  React.useEffect(() => {
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    if (!pageParam || !limitParam) {
      router.replace(`/admin/udsrc?page=1&limit=10&search=`);
    }
  }, [searchParams, router]);

  React.useEffect(() => {
    const totalPage = tableData?.totalPages ?? 0;
    setTotalPage(totalPage);
  }, [tableData]);

  const filteredData = React.useMemo(() => {
    if (!tableData?.data) return [];

    return tableData.data.filter((item: participantsUDSRC) => {
      const { team_name, university } = item;
      const keyword = searchKeyword.toLowerCase();
      return (
        team_name.toLowerCase().includes(keyword) ||
        university.toLowerCase().includes(keyword)
      );
    });
  }, [tableData, searchKeyword]);

  const handleSearchkey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    setApiSearchKeyword(searchKeyword);
    router.replace(
      `/admin/udsrc?page=${currentPage}&limit=${itemsPerPage}&search=${searchKeyword}`,
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.replace(`/admin/udsrc?page=${page}&limit=${itemsPerPage}&search=`);
  };

  const handleItemsPerPageChange = (key: string) => {
    const limit = parseInt(key, 10);
    setItemsPerPage(limit);
    setCurrentPage(1); // reset to first page when changing items per page
    router.replace(`/admin/udsrc?page=1&limit=${limit}&search=`);
  };

  const totalItems = tableData?.totalPages ?? 0;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const registrantCount =
    (tableData?.statusCounts.pending ?? 0) +
    (tableData?.statusCounts.rejected ?? 0) +
    (tableData?.statusCounts.revision ?? 0) +
    (tableData?.statusCounts.approved ?? 0);

  const endItem =
    Math.max(currentPage * itemsPerPage, totalItems) > (registrantCount ?? 0)
      ? registrantCount ?? 0
      : Math.max(currentPage * itemsPerPage, totalItems);
  return (
    <>
      {isLoading ? (
        <LoadingGlobalPage />
      ) : (
        <Sidebar title="UDSRC Admin Dashboard">
          <section className="min-h-screen w-full overflow-hidden">
            {/* Title Section */}
            <div className="relative z-0 bg-neutral-50 md:max-h-[283px]">
              <div className="relative h-full w-full">
                <div className="flex h-full w-full justify-end sm:justify-between">
                  <div className="block w-full pt-4 md:pt-8">
                    <div className="flex h-full w-full flex-col items-start justify-center">
                      <div className="pl-6">
                        {/* Hero Typography Start */}
                        <Typography
                          variant="p"
                          weight="bold"
                          className="mb-1 text-[20px] text-gray-600"
                        >
                          Hi, Admin
                        </Typography>{" "}
                        <Typography
                          variant="h4"
                          weight="bold"
                          className="text-2xl leading-none"
                        >
                          Welcome to UDSRC Dashboard!
                        </Typography>
                      </div>
                      {/* Hero Typography End */}
                    </div>
                  </div>
                  <div className="hidden h-full w-[70%] items-center justify-center sm:flex">
                    <NextImage
                      alt="hero"
                      width={992}
                      height={283}
                      src="/dashboard/hero-desktop.png"
                      className="h-full w-full object-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Content Section */}
            <div className="container my-6 w-full">
              {/* Card Section */}
              <div className="mb-5 grid grid-cols-1 gap-4 md:mb-10 md:grid-cols-2 xl:grid-cols-4">
                {/* Not Approved Yet */}
                <Card className="border-2 border-neutral-600 bg-neutral-200 dark:border-[#909193] dark:bg-neutral-600">
                  <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                    <Typography className="text-[16px] text-neutral-800 dark:text-[#BFC1C4] md:text-[20px]">
                      Rejected
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-bold text-neutral-800 dark:text-[#BFC1C4]"
                    >
                      {tableData?.statusCounts.rejected || 0}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Need Revision */}
                <Card className="border-2 border-yellow-900 bg-yellow-100">
                  <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <LuFileEdit className="text-xl" />
                      <Typography className="text-[16px] md:text-[20px]">
                        Need Revision
                      </Typography>
                    </div>
                    <Typography
                      variant="h4"
                      className="font-bold text-yellow-900"
                    >
                      {tableData?.statusCounts.revision || 0}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Pending */}
                <Card className="border-2 border-purple-800 bg-purple-100">
                  <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                    <Typography className="text-[16px] text-purple-800 md:text-[20px]">
                      Pending
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-bold text-purple-900"
                    >
                      {tableData?.statusCounts.pending || 0}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Accepted */}
                <Card className="border-2 border-green-900 bg-green-100">
                  <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="flex items-center gap-2 text-green-700">
                      <FaRegCheckCircle className="text-xl" />
                      <Typography className="text-[16px] md:text-[20px]">
                        Accepted
                      </Typography>
                    </div>
                    <Typography
                      variant="h4"
                      className="font-bold text-green-900"
                    >
                      {tableData?.statusCounts.approved || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>

              {/* Table Filter + Search */}
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
                <div className="flex items-center space-x-2">
                  <Typography variant="p" className="text-sm text-gray-700">
                    Show
                  </Typography>
                  <select
                    className="rounded-md border border-gray-300 p-2 text-sm"
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(e.target.value)}
                  >
                    {[5, 10, 15, 20].map((val) => (
                      <option key={val}>{val}</option>
                    ))}
                  </select>
                </div>
                <div className="flex w-full items-center gap-2 md:w-[300px]">
                  <Input
                    placeholder="Search here"
                    value={searchKeyword}
                    onChange={handleSearchkey}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchButtonClick();
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSearchButtonClick}
                  >
                    <FaSearch />
                  </Button>
                </div>
              </div>

              {/* Table Display */}
              <div className="mt-6 overflow-x-auto rounded-md border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Team Name</TableHead>
                      <TableHead>University</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Detail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map(
                      (item: participantsUDSRC, index: number) => (
                        <TableRow
                          key={item.participant_id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-200"
                          }
                        >
                          <TableCell>
                            {index +
                              1 +
                              (parseInt(searchParams.get("page") || "1") - 1) *
                                parseInt(searchParams.get("limit") || "10")}
                          </TableCell>
                          <TableCell>{item.team_name}</TableCell>
                          <TableCell>{item.university}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                item.status.toLowerCase() === "approved"
                                  ? "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700"
                                  : item.status.toLowerCase() === "pending"
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-100 hover:text-purple-700"
                                    : item.status.toLowerCase() === "revision"
                                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-700"
                                      : item.status.toLowerCase() === "rejected"
                                        ? "bg-neutral-200 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-700"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                              }`}
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/admin/udsrc/${item.participant_id}`}
                              className="flex items-center gap-2 hover:underline"
                            >
                              <Button>
                                <Typography
                                  color="inherit"
                                  className="text-xs font-semibold text-white md:text-sm"
                                >
                                  Detail
                                </Typography>
                                <MdOutlineNavigateNext />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {tableData?.totalPages && (
                <div className="z mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                  {/* Showing Text */}
                  <Typography
                    variant="p"
                    className="w-full text-sm text-muted-foreground"
                  >
                    Showing {startItem} to {endItem} of {registrantCount}{" "}
                    entries
                  </Typography>

                  {/* Pagination */}
                  <Pagination>
                    <PaginationContent className="flex items-center gap-1 rounded-md border px-2 py-1">
                      {/* Previous */}
                      <PaginationItem>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-none border px-3 py-1 text-xs"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                      </PaginationItem>

                      {/* Page Numbers */}
                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1,
                      ).map((page) => (
                        <PaginationItem key={page}>
                          <Button
                            size="sm"
                            variant={
                              page === currentPage ? "default" : "outline"
                            }
                            className={`rounded-none border px-3 py-1 text-xs ${
                              page === currentPage
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : ""
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        </PaginationItem>
                      ))}

                      {/* Next */}
                      <PaginationItem>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-none border px-3 py-1 text-xs"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === tableData.totalPages}
                        >
                          Next
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </section>
        </Sidebar>
      )}
    </>
  );
}
