import Button from "@/components/buttons/Button";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Layout from "@/layouts/Layout";

// Data merchandise untuk mapping
const merchandiseItems = [
  {
    id: 1,
    title: "T-Shirt Exclusive",
    price: "IDR 99.000",
    image: "/images/dummy-card.png",
  },
  {
    id: 2,
    title: "T-Shirt Exclusive",
    price: "IDR 99.000",
    image: "/images/dummy-card.png",
  },
  {
    id: 3,
    title: "T-Shirt Exclusive",
    price: "IDR 99.000",
    image: "/images/dummy-card.png",
  },
  {
    id: 4,
    title: "T-Shirt Exclusive",
    price: "IDR 99.000",
    image: "/images/dummy-card.png",
  },
  {
    id: 5,
    title: "T-Shirt Exclusive",
    price: "IDR 99.000",
    image: "/images/dummy-card.png",
  },
];

export default function MerchandisePage() {
  return (
    <Layout withFooter withNavbar>
      {/* Hero Section */}
      <section className="min-h-screen w-screen bg-gradient-to-t py-52 lg:pb-32 lg:pt-60 flex flex-col items-center justify-center from-purple-900 to-purple-600">
        <div className="flex flex-col items-center justify-center px-6 text-center gap-6">
          <Typography
            variant="h3"
            font="Bagnard"
            className="text-neutral-50 text-4xl"
          >
            Wear the Vibe, Own the Style!
          </Typography>
          <Typography variant="h6" font="Rubik" className="text-neutral-50">
            Get exclusive merch that makes your style stand out! Limited
            edition, ultra-comfy, and a must-have.
          </Typography>
          <Button
            variant="outline"
            className="text-neutral-50 hover:bg-purple-600 w-fit"
          >
            Grab yours Now !
          </Button>
        </div>
        <NextImage
          alt="hero-merch"
          serverStaticImg
          height={360}
          width={1460}
          className="w-screen"
          src="/images/hero-merch.png"
        />
      </section>

      {/* Merchandise Section */}
      <section className="w-screen py-36 flex flex-col gap-12">
        <div className="flex flex-col items-center px-6 gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <Typography
              variant="h3"
              font="Rubik"
              className="text-neutral-900 text-5xl font-semibold"
            >
              Official
            </Typography>
            <Typography
              variant="h3"
              font="Bagnard"
              className="text-purple-500 text-5xl"
            >
              Merchandise
            </Typography>
          </div>
          <Typography
            variant="p"
            font="Rubik"
            weight="regular"
            className="text-neutral-900 text-center"
          >
            Exclusive gear made just for true fans—authentic, stylish, and
            limited edition!
          </Typography>
        </div>

        <div className="px-6 flex flex-wrap gap-6 md:gap-8 justify-center items-center">
          {merchandiseItems.map((item) => (
            <div
              key={item.id}
              className="border flex flex-col gap-4 p-4 border-neutral-200 rounded-2xl"
            >
              <NextImage
                alt="dummy-card"
                serverStaticImg
                height={460}
                width={320}
                className="w-fit"
                src={item.image}
              />
              <div className="flex flex-col">
                <Typography
                  variant="h6"
                  weight="medium"
                  font="Rubik"
                  className="text-neutral-900 text-sm"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h6"
                  weight="medium"
                  font="Rubik"
                  className="text-purple-500 text-base"
                >
                  {item.price}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
