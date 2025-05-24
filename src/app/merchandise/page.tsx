"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import withAuth from "@/components/WithAuth";
import Button from "@/components/buttons/Button";
import Layout from "@/layouts/Layout";
import Link from "next/link";

// Data merchandise untuk mapping
const bundleMerch = [
  {
    id: 1,
    title: "Package A",
    price: "IDR 20.000",
    image: "/images/merch/merch-package-a.png",
    link: "https://id.shp.ee/8hf2aoc",
  },
  {
    id: 2,
    title: "Package B",
    price: "IDR 125.000",
    image: "/images/merch/merch-package-b.png",
    link: "https://id.shp.ee/9kwqt4g",
  },
  {
    id: 3,
    title: "Package C",
    price: "IDR 70.000",
    image: "/images/merch/merch-package-c.png",
    link: "https://id.shp.ee/1NTX5HD",
  },
  {
    id: 4,
    title: "Package D",
    price: "IDR 100.000",
    image: "/images/merch/merch-package-d.png",
    link: "https://id.shp.ee/qebbqpu",
  },
  {
    id: 5,
    title: "Take All Package",
    price: "IDR 150.000",
    image: "/images/merch/merch-package-all.png",
    link: "https://id.shp.ee/kWv7Fht",
  },
];

const merchandiseItems = [
  {
    id: 1,
    title: "Cotton Combed 30s T-Shirt",
    price: "IDR 80.000",
    image: "/images/merch/merch-t-shirt.png",
    link: "https://id.shp.ee/qaMjGwF",
  },
  {
    id: 2,
    title: "Keychain",
    price: "IDR 12.000",
    image: "/images/merch/merch-keychain.png",
    link: "https://id.shp.ee/4jKZBNR",
  },
  {
    id: 3,
    title: "Canvas Totebag",
    price: "IDR 50.000",
    image: "/images/merch/merch-totebag.png",
    link: "https://id.shp.ee/kUMNkN6",
  },
  {
    id: 4,
    title: "A6 Sticker",
    price: "IDR 10.000",
    image: "/images/merch/merch-sticker.png",
    link: "https://id.shp.ee/6CxmcdT",
  },
];

export default withAuth(MerchandisePage, "OPTIONAL");
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
          <Typography
            variant="h5"
            font="Rubik"
            className="font-bold text-neutral-900"
          >
            Open Pre-Order : 19 - 24 May 2025
          </Typography>
        </div>

        <div className="flex flex-col gap-5 px-6">
          <Typography
            variant="h5"
            font="Rubik"
            className="font-medium text-neutral-900"
          >
            Our Best Deal Package
          </Typography>

          <div className="flex flex-wrap items-center justify-start gap-6 md:gap-8">
            {bundleMerch.map((item) => (
              <Link
                href={item.link}
                target="_blank"
                key={item.id}
                className="merch-card flex flex-col gap-4 rounded-2xl border border-neutral-200 p-4"
              >
                <NextImage
                  alt={item.title}
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
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 px-6">
          <Typography
            variant="h5"
            font="Rubik"
            className="font-medium text-neutral-900"
          >
            Our Merch
          </Typography>

          <div className="flex flex-wrap items-center justify-start gap-6 md:gap-8">
            {merchandiseItems.map((item) => (
              <Link
                href={item.link}
                target="_blank"
                key={item.id}
                className="merch-card flex flex-col gap-4 rounded-2xl border border-neutral-200 p-4"
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
