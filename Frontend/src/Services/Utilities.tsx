export const formateDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const option = { year: "numeric" as const, month: "short" as const };
  return date.toLocaleString("en-US", option);
};

export const timeAgo = (timestamp: string | number | Date) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60)
    return diffInSeconds === 1
      ? "a second ago"
      : `${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return diffInMinutes === 1
      ? "a minute ago"
      : `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return diffInHours === 1 ? "an hour ago" : `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30)
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12)
    return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
};

export const getBase64 = (file: File) => {
  return new Promise<string | null>((resolve, reject) => {
    if (!file) {
      reject("Invalid file!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const formatInterviewTime = (isoString: string) => {
  const date = new Date(isoString); // Creates a Date object from ISO string (in UTC)

  // Convert to local date & time
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  // Format as "Month Day, Year"
  const formattedDate = localDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Format as "HH:MM AM/PM"
  const formattedTime = localDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
  });

  return `${formattedDate} ${formattedTime}`;
};
export const openResumeInNewTab = (base64String: string) => {
  try {
    // Remove Base64 prefix if present (like "data:application/pdf;base64,")
    const base64WithoutPrefix = base64String?.split(",").pop() || "";

    // Convert Base64 to a Uint8Array
    const byteCharacters = atob(base64WithoutPrefix);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the Uint8Array
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a Blob URL
    const blobUrl = URL.createObjectURL(blob);

    // Open the file in a new tab
    window.open(blobUrl, "_blank");

    // Cleanup the URL to prevent memory leaks
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
  } catch (error) {
    console.error("Error opening resume:", error);
  }
};
