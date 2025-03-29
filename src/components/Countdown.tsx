import { useEffect, useState } from "react";

import Typography from "@/components/Typography";
import { CountdownProps, TimeLeft, timeDisplayProps } from "@/types/event-page";
import { useTranslations } from "next-intl";

const calculateTimeLeft = (endDate: string): TimeLeft => {
  const difference = +new Date(endDate) - +new Date();
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

function TimeDisplay({
  time,
  label,
  classNameTime,
  classNameCaption,
}: timeDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <Typography variant="h1" className={`font-semibold ${classNameTime}`}>
        {time}
      </Typography>
      <Typography variant="p" weight="bold" className={`${classNameCaption}`}>
        {label}
      </Typography>
    </div>
  );
}

export default function Countdown({ endDate }: CountdownProps) {
  const t = useTranslations("Countdown");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(endDate),
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(
      () => setTimeLeft(calculateTimeLeft(endDate)),
      1000,
    );
    return () => clearInterval(timer);
  }, [endDate]);

  if (!isMounted) return null;

  const isOver = timeLeft.days < 0;

  return (
    <div className="flex justify-center gap-2 lg:gap-4">
      <TimeDisplay
        time={isOver ? 0 : timeLeft.days}
        label={t("days")}
        classNameTime="text-4xl font-bold text-purple-500"
        classNameCaption="text-purple-500"
      />
      <Typography
        variant="h1"
        className="mt-2 text-2xl font-bold text-neutral-900 lg:mt-8 lg:text-4xl"
      >
        :
      </Typography>
      <TimeDisplay
        time={isOver ? 0 : timeLeft.hours}
        label={t("hours")}
        classNameTime="text-4xl font-bold text-blue-900 "
        classNameCaption="text-gray-700"
      />
      <Typography
        variant="h1"
        className="mt-2 text-2xl font-bold text-neutral-900 lg:mt-8 lg:text-4xl"
      >
        :
      </Typography>
      <TimeDisplay
        time={isOver ? 0 : timeLeft.minutes}
        label={t("minutes")}
        classNameTime="text-4xl font-bold text-blue-900"
        classNameCaption="text-gray-700"
      />
      <Typography
        variant="h1"
        className="mt-2 text-2xl font-bold text-neutral-900 lg:mt-8 lg:text-4xl"
      >
        :
      </Typography>
      <TimeDisplay
        time={isOver ? 0 : timeLeft.seconds}
        label={t("seconds")}
        classNameTime="text-4xl font-bold text-blue-900"
        classNameCaption="text-gray-700"
      />
    </div>
  );
}
