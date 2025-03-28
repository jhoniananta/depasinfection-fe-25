import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { useTranslations } from "next-intl";

export interface ScrollProps {
  handleScroll: () => void;
}

export default function AboutBanner({
  handleScroll,
}: ScrollProps): React.ReactElement {
  const t = useTranslations("HomePage");

  return (
    <div className="max-w-6xl rounded-xl bg-white shadow-xl z-20">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between px-6 py-8 md:px-12 md:py-16 gap-8">
        {/* Logo on the left */}
        <div className="w-full h-full">
          <NextImage
            src="/landing-page/logo-depas.png"
            alt="Depa's Infection Logo"
            width={200}
            height={150}
            className="w-full h-full flex items-center justify-center"
          />
        </div>

        {/* Content on the right */}
        <div className="space-y-3 text-center md:text-left">
          <Typography
            variant="h2"
            font="Rubik"
            className="text-2xl md:text-3xl font-bold"
          >
            <span className="text-black">{t("about.title")} </span>
            <span className="text-purple-600 font-bagnard">
              {t("about.titleDifferentFont")}
            </span>
          </Typography>

          <Typography
            font="Rubik"
            variant="p"
            className="text-sm md:text-base text-gray-800 text-justify"
          >
            {t("about.description")}
          </Typography>

          <div className="pt-2">
            <Button
              variant="gradient-yellow"
              size="base"
              className="text-md md:text-lg"
              onClick={handleScroll}
            >
              Explore Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
