
export const profileIcon = (
    firstName?: string | null,
    lastName?: string | null
  ): string => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "?";
  };
  