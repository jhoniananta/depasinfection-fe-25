import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import IconLink from "@/components/links/IconLink";
import { FaFacebookF, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { SiInstagram, SiShopee } from "react-icons/si";

// Deklarasi social links agar tidak didefinisikan ulang setiap render
const socialLinks = [
  { icon: SiInstagram, href: "https://www.instagram.com/depasinfection" },
  { icon: FaXTwitter, href: "https://twitter.com/depasinfection" },
  { icon: FaFacebookF, href: "https://www.facebook.com/depasinfection" },
  { icon: SiShopee, href: "/" }, // Placeholder, belum ada data Shopee
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@depasinfection",
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900">
      <div className="container mx-auto pb-20 pt-16">
        {/* Bagian Atas: Logo, Judul, dan Informasi Kontak */}
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Kolom Kiri: Logo dan Judul */}
          <div className="flex basis-1/2 flex-row gap-4 md:flex-col">
            <NextImage
              serverStaticImg
              width={100}
              height={100}
              src="/images/logo-footer.png"
              alt="logo-footer"
            />
            <Typography
              variant="h6"
              weight="medium"
              className="w-fit text-start text-neutral-50"
            >
              Depa&apos;s <br /> Infection <br /> 2025
            </Typography>
          </div>

          {/* Kolom Kanan: Informasi Kontak dan Office */}
          <div className="flex basis-1/2 flex-col gap-8 md:flex-row">
            {/* Informasi Contact Person */}
            <div className="basis-1/2">
              <Typography
                variant="p"
                weight="medium"
                className="w-fit text-neutral-50"
              >
                Contact Person
              </Typography>
              <div className="flex flex-col gap-4">
                <div>
                  <Typography
                    variant="p"
                    weight="medium"
                    className="w-fit !text-[14px] text-neutral-50"
                  >
                    National Olympiad Competition (OKGD)
                  </Typography>
                  <Typography
                    variant="p"
                    weight="thin"
                    className="w-fit !text-[14px] text-neutral-50"
                  >
                    CP 1 : +62 821-2373-6690 (Alifia) <br /> CP 2 : +62
                    858-0271-2878 (Ninda)
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="p"
                    weight="medium"
                    className="w-fit !text-[14px] text-neutral-50"
                  >
                    University Dental Science Research Competition (UDSRC)
                  </Typography>
                  <Typography
                    variant="p"
                    weight="thin"
                    className="w-fit !text-[14px] text-neutral-50"
                  >
                    +62 8953-4128-9950 (Fatiya)
                  </Typography>
                </div>
              </div>
            </div>
            {/* Informasi Depa's Infection Office */}
            <div className="basis-1/2">
              <Typography
                variant="p"
                weight="medium"
                className="w-fit text-neutral-50"
              >
                Depa&apos;s Infection Office
              </Typography>
              <Typography
                variant="p"
                weight="thin"
                className="w-fit !text-[14px] text-neutral-50"
              >
                Kesekretariatan Denta Paramitha Fakultas Kedokteran Gigi
                Universitas Gadjah Mada, Jalan Denta 1, Sekip Utara, Yogyakarta,
                55281
              </Typography>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4 mt-8 border-t border-neutral-50"></div>

        {/* Bagian Bawah: Copyright dan Social Links */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Typography
            variant="p"
            className="text-center !text-[12px] text-neutral-50 md:!text-[14px]"
          >
            Copyright 2025. Depa&apos;s Infection FKG UGM
          </Typography>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <IconLink
                key={index}
                variant="ghost"
                icon={Icon}
                className="text-neutral-50 hover:bg-neutral-600"
                iconClassName="text-2xl"
                href={href}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
