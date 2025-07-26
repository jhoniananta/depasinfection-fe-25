"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import withAuth from "@/components/WithAuth";
import Button from "@/components/buttons/Button";
import Layout from "@/layouts/Layout";
import { motion } from "motion/react";
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
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Layout withFooter withNavbar>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-neutral-50 bg-gradient-to-t from-purple-900 to-purple-700 py-52 lg:pb-32 lg:pt-60"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container flex flex-col items-center justify-center gap-6 px-6 text-center"
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              font="Bagnard"
              className="text-4xl text-neutral-50"
            >
              Wear the Vibe, Own the Style!
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography variant="h6" font="Rubik" className="text-neutral-50">
              Get exclusive merch that makes your style stand out! Limited
              edition, ultra-comfy, and a must-have.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-fit text-neutral-50 hover:bg-purple-600"
              >
                Grab yours Now !
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <NextImage
            alt="hero-merch"
            serverStaticImg
            height={360}
            width={1460}
            className="flex w-screen items-center justify-center"
            imgClassName="lg:container h-auto "
            src="/images/hero-merch.png"
          />
        </motion.div>
      </motion.section>

      {/* Merchandise Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto flex w-screen flex-col gap-12 overflow-hidden bg-neutral-50 py-36 lg:container"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center gap-6 px-6"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-2"
          >
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
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography
              variant="p"
              font="Rubik"
              weight="regular"
              className="text-center text-neutral-900"
            >
              Exclusive gear made just for true fans—authentic, stylish, and
              limited edition!
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              font="Rubik"
              className="font-bold text-neutral-900"
            >
              Open Pre-Order : 19 - 24 May 2025
            </Typography>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-5 px-6"
        >
          <Typography
            variant="h5"
            font="Rubik"
            className="font-medium text-neutral-900"
          >
            Our Best Deal Package
          </Typography>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap items-center justify-start gap-6 md:gap-8"
          >
            {bundleMerch.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <Link
                  href={item.link}
                  target="_blank"
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col gap-5 px-6"
        >
          <Typography
            variant="h5"
            font="Rubik"
            className="font-medium text-neutral-900"
          >
            Our Merch
          </Typography>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap items-center justify-start gap-6 md:gap-8"
          >
            {merchandiseItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <Link
                  href={item.link}
                  target="_blank"
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </Layout>
  );
}
