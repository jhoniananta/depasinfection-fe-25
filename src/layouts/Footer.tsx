import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import IconLink from "@/components/links/IconLink";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { SiInstagram, SiShopee } from "react-icons/si";

// Deklarasi social links agar tidak didefinisikan ulang setiap render
const socialLinks = [
  { icon: SiInstagram, href: "/" },
  { icon: FaXTwitter, href: "/" },
  { icon: FaFacebookF, href: "/" },
  { icon: SiShopee, href: "/" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900">
      <div className="container mx-auto pb-20 pt-16">
        {/* Bagian Atas: Logo, Judul, dan Informasi Kontak */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Kolom Kiri: Logo dan Judul */}
          <div className="flex flex-row md:flex-col gap-4 basis-1/2">
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
          <div className="flex flex-col md:flex-row basis-1/2 gap-8">
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
                    Olimpiade KG Dasar
                  </Typography>
                  <Typography
                    variant="p"
                    weight="thin"
                    className="w-fit !text-[14px] text-neutral-50"
                  >
                    CP 1: +628179392365 (Izza) <br /> CP 2: +6281374015559
                    (Hannani)
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="p"
                    weight="medium"
                    className="w-fit !text-[14px] text-neutral-50"
                  >
                    UDSPEC
                  </Typography>
                  <Typography
                    variant="p"
                    weight="thin"
                    className="w-fit !text-[14px] text-neutral-50"
                  >
                    Essay: +6288229791277 (Alma) <br /> Poster: +6285723933448
                    (Junita)
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
        <div className="border-t border-neutral-50 mt-8 mb-4"></div>

        {/* Bagian Bawah: Copyright dan Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography
            variant="p"
            className="!text-[12px] md:!text-[14px] text-center text-neutral-50"
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
