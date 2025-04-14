import Title from "@/components/Title";
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StepDone() {
  return (
    <>
      <Title
        title="Registration Successful"
        desc="Thank you for registering!"
      />
      <Typography
        variant="p"
        font="Rubik"
        className="text-justify text-[14px] text-neutral-900"
      >
        We have received your registration and further information will be sent
        via email / WA group. You can also refer to UDSRC Dashboard to view your
        registration status.
      </Typography>
      <Button
        asChild
        className="text-olive-900 w-full bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-6 text-2xl font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500 md:px-12 lg:px-14"
      >
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </>
  );
}
