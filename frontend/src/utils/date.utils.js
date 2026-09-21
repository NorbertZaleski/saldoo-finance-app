const locale = navigator.language;

export const formatDate = (isoDay, locale, options = {}) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
    ...options,
}).format(new Date(isoDay));

export const formatDateTime = (iso, locale, options = {}) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    ...options,
}).format(new Date(iso));

  
export const formatDayLabel = (isoDay, locale) => {
  const today = new Date().toLocaleDateString("sv-SE");
  const diffDays = Math.round(
    (new Date(isoDay) - new Date(today)) / 86_400_000
  );

  if (diffDays >= -1 && diffDays <= 1) {
    return new Intl.RelativeTimeFormat(locale, { numeric: "auto" })
      .format(diffDays, "day");
  }
  return formatDate(isoDay, locale, { weekday: "long" });
};