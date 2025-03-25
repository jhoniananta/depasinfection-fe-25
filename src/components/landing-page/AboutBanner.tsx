import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";

export interface ScrollProps {
  handleScroll: () => void;
}

export default function AboutBanner({
  handleScroll,
}: ScrollProps): React.ReactElement {
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
            <span className="text-black">About </span>
            <span className="text-purple-600 font-bagnard">
              Depa's Infection
            </span>
          </Typography>

          <Typography
            font="Rubik"
            variant="p"
            className="text-sm md:text-base text-gray-800 text-justify"
          >
            Depa's Infection or Denta Paramitha's Science Festival and
            Competition is one of the biggest events held by Denta Paramitha, a
            study club from the Faculty of Dentistry, Universitas Gadjah Mada.
            <strong>
              {" "}
              Depa's Infection consists of three sub-events, namely: (1)
              National Dentistry Olympiad and Essay Competition for
              international pre-clinical medical students, (2) Clinical medical
              students, and/or health science students, National Dentistry
              Olympiad for senior high school students, International Poster and
              Essay Competition.
            </strong>
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
