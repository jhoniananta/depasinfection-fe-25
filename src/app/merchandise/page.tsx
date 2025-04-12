"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import withAuth from "@/components/WithAuth";
import Button from "@/components/buttons/Button";
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

function MerchandisePage() {
  return (
    <Layout withFooter withNavbar>
      {/* Hero Section */}
      <section className="flex min-h-screen w-screen flex-col items-center justify-center bg-neutral-50 bg-gradient-to-t from-purple-900 to-purple-700 py-52 lg:pb-32 lg:pt-60">
        <div className="container flex flex-col items-center justify-center gap-6 px-6 text-center">
          <Typography
            variant="h3"
            font="Bagnard"
            className="text-4xl text-neutral-50"
          >
            Wear the Vibe, Own the Style!
          </Typography>
          <Typography variant="h6" font="Rubik" className="text-neutral-50">
            Get exclusive merch that makes your style stand out! Limited
            edition, ultra-comfy, and a must-have.
          </Typography>
          <Button
            variant="outline"
            className="w-fit text-neutral-50 hover:bg-purple-600"
          >
            Grab yours Now !
          </Button>
        </div>
        <NextImage
          alt="hero-merch"
          serverStaticImg
          height={360}
          width={1460}
          className="flex w-screen items-center justify-center"
          imgClassName="lg:container h-auto "
          src="/images/hero-merch.png"
        />
      </section>

      {/* Merchandise Section */}
      <section className="mx-auto flex w-screen flex-col gap-12 bg-neutral-50 py-36">
        <div className="flex flex-col items-center gap-6 px-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <Typography
              variant="h3"
              font="Rubik"
              className="text-5xl font-semibold text-neutral-900"
            >
              Official
            </Typography>
            <Typography
              variant="h3"
              font="Bagnard"
              className="text-5xl text-purple-500"
            >
              Merchandise
            </Typography>
          </div>
          <Typography
            variant="p"
            font="Rubik"
            weight="regular"
            className="text-center text-neutral-900"
          >
            Exclusive gear made just for true fans—authentic, stylish, and
            limited edition!
          </Typography>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 px-6 md:gap-8">
          {merchandiseItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-4"
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
                  className="text-sm text-neutral-900"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h6"
                  weight="medium"
                  font="Rubik"
                  className="text-base text-purple-500"
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

export default withAuth(MerchandisePage, "optional");
