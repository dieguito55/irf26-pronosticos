export const formatDateTime = (value: string): string =>
  new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Lima"
  }).format(new Date(value));

export const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    timeZone: "America/Lima"
  }).format(new Date(`${value}T12:00:00-05:00`));

export const initials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const firstDisplayName = (name: string): string => {
  const [first, last] = name.split(" ");
  return last ? `${first} ${last[0]}.` : first;
};
