type IconName =
  | "arrow-right"
  | "bookmark"
  | "check"
  | "clock"
  | "dumbbell"
  | "flame"
  | "plus"
  | "star"
  | "x";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  bookmark: (
    <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4z" />
  ),
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  dumbbell: (
    <>
      <path d="m6.5 6.5 11 11m-13-6 2-2m10 10 2-2M6 4l-2 2m16 12-2 2M8 4 4 8m16 8-4 4" />
    </>
  ),
  flame: (
    <path d="M12 22c4.42 0 7-3.35 7-7 0-3.52-2.6-5.64-4-8-.27 2.18-1.13 3.27-2 4-.22-3.46-2.1-6.35-4-8-.02 3.23-.85 5.14-2 7a9.27 9.27 0 0 0-2 5c0 3.65 2.58 7 7 7Z" />
  ),
  plus: <path d="M12 5v14m-7-7h14" />,
  star: (
    <path d="m12 3 2.7 5.47 6.03.88-4.36 4.25 1.03 6L12 16.77l-5.4 2.83 1.03-6-4.36-4.25 6.03-.88z" />
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
