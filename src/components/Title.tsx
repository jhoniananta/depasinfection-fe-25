import Typography from "@/components/Typography";

type TitleType = {
  title: string;
  desc: string;
};

function Title({ title, desc }: TitleType) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Typography
        variant="h6"
        font="Rubik"
        weight="bold"
        className="flex w-fit text-3xl text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {title}
      </Typography>
      <Typography
        variant="p"
        font="Rubik"
        weight="regular"
        className="flex w-fit text-[12px] text-neutral-900 sm:text-lg md:text-xl lg:text-2xl"
      >
        {desc}
      </Typography>
    </div>
  );
}

export default Title;
