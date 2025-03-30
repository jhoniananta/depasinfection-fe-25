export interface TimelineItem {
  date: string;
  title: string;
  positionLarge: string;
  positionSmall: string;
}

export interface TimelineEventProps {
  timelineContent: TimelineItem[];
  lineDesktopSrc: string;
  lineMobileSrc: string;
  widthlineMobile: number;
  heightlineMobile: number;
}

export interface AboutEventProps {
  aboutTitle: string;
  buttonText: string;
  title: string;
  normalContent: string;
  boldContent: string;
  poster: string;
}

export interface cardSectionProps {
  title: {
    main: string;
    sub: string;
  };
  images: string[];
  requirements: string[];
  showButton?: boolean;
}

export interface HeroEventProps {
  buttonText: string;
  title: string;
  subtitle: string;
  bgImage: string;
  urlRegist: string;
}

export interface RegistEventProps {
  endDate: string;
  srcVideo: string;
  guidebookUrl: string;
  registUrl: string;
}

// Countdown Types
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
export interface CountdownProps {
  endDate: string;
}

export interface timeDisplayProps {
  time: number;
  label: string;
  classNameTime?: string;
  classNameCaption?: string;
}
