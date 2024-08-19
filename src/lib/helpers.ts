export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}
export function getCurrentTimeInEdmonton(): Date {
  // Create a date object with the current UTC time
  const now = new Date();

  // Convert the UTC time to Edmonton's time
  const offsetEdmonton = -6; // Edmonton is UTC-6
  now.setHours(now.getUTCHours() + offsetEdmonton);

  return now;
}

export function formatTimeForEdmonton(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // This will format the time in 12-hour format with AM/PM
    timeZone: "America/Denver",
  };

  let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
  formattedTime += " MST";

  return formattedTime;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
