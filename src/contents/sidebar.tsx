import { BiHomeCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaMedal } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
export const SidebarAdmin = [
  {
    section: "Home",
    props: [
      {
        title: "OKGD",
        href: "/dashboard/okgd",
        icon: <IoBookSharp className="text-[#a88a44]" size="24" />,
      },
      {
        title: "UDSRC",
        href: "/dashboard/udsrc",
        icon: <FaMedal className="text-[#a88a44]" size="24" />,
      },
    ],
  },
];

export const SidebarUser = [
  {
    section: "Home",
    props: [
      {
        title: "Home",
        href: "/dashboard",
        icon: <BiHomeCircle className="text-[#a88a44]" size="24" />,
      },
      {
        title: "My Profile",
        href: "/dashboard/my-profile",
        icon: <CgProfile className="text-[#a88a44]" size="24" />,
      },
    ],
  },
  {
    section: "My Competition",
    props: [
      {
        title: "OKGD",
        href: "/dashboard/okgd",
        icon: <IoBookSharp className="text-[#a88a44]" size="24" />,
      },
      {
        title: "UDSRC",
        href: "/dashboard/udsrc",
        icon: <FaMedal className="text-[#a88a44]" size="24" />,
      },
    ],
  },
];
