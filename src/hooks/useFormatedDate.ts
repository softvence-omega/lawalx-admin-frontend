type FormatDateOptions = {
  locale?: string;
  withTime?: boolean;
};

export function formatDate(
  date: string | Date,
  options: FormatDateOptions = {},
): string {
  const { locale = "en-US", withTime = false } = options;

  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }).format(d);
}
