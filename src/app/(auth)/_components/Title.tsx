import Typography from "@/components/Typography";

type TitleType = {
  title: string;
  desc: string;
};

function Title({ title, desc }: TitleType) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography
        variant="h6"
        font="Rubik"
        weight="bold"
        className=" text-neutral-900 text-3xl sm:text-4xl md:text-5xl w-fit flex lg:text-6xl"
      >
        {title}
      </Typography>
      <Typography
        variant="p"
        font="Rubik"
        weight="regular"
        className=" text-neutral-900 text-[12px] w-fit flex sm:text-lg md:text-xl lg:text-2xl"
      >
        {desc}
      </Typography>
    </div>
  );
}

export default Title;
