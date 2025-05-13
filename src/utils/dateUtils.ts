export const formatRelativeTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // Future dates should show as "Just now"
    if (diffInSeconds < 0) return "Just now";
    
    const SECONDS_IN = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    const days = Math.floor(diffInSeconds / SECONDS_IN.day);
    const years = Math.floor(diffInSeconds / SECONDS_IN.year);
    const months = Math.floor(diffInSeconds / SECONDS_IN.month);

    // Years
    if (years >= 2) return `more than ${years} years ago`;
    if (years === 1) return "1 year ago";
    
    // Months
    if (months >= 1) return `${months} month${months > 1 ? 's' : ''} ago`;
    
    // Weeks and Days
    if (days >= 30) return "30 days ago";
    if (days >= 29) return "29 days ago";
    if (days >= 28) return "4 weeks ago";
    if (days >= 21) return "3 weeks ago";
    if (days >= 14) return "2 weeks ago";
    if (days >= 7) return "1 week ago";
    if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    // Hours
    const hours = Math.floor(diffInSeconds / SECONDS_IN.hour);
    if (hours >= 1) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    // Minutes
    const minutes = Math.floor(diffInSeconds / SECONDS_IN.minute);
    if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    return "Just now";
}; 