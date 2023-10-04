/* eslint-disable consistent-return */
export function getTimeSinceNow(originalTime: string | null, short?: boolean) {
  if (originalTime === null) {
    return;
  }

  const timestamp = new Date(originalTime).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;

  // Calculate the time units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // short form
  if (originalTime) {
    if (short) {
      if (days > 0) {
        return `${days}d ago`;
      }
      if (hours > 0) {
        return `${hours}h ago`;
      }
      if (minutes > 0) {
        return `${minutes}m ago`;
      }
      return `${seconds}s ago`;
    }
    // Return the time difference in an appropriate format
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }
  return null;
}
