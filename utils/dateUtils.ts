// Tarihi formatlayan fonksiyon
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

// Ne kadar zaman önce oluşturulduğunu hesaplayan ve yuvarlayan fonksiyon
export function timeAgo(publishedDate?: string): string {
    if (!publishedDate) return "Bilinmeyen zaman"; // Eğer tarih yoksa default mesaj döndür
  
    const published = new Date(publishedDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);
  
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years >= 1) return years === 1 ? "1 yıl önce" : `${years} yıl önce`;
    if (months >= 1) return months === 1 ? "1 ay önce" : `${months} ay önce`;
    if (days >= 1) return days === 1 ? "1 gün önce" : `${days} gün önce`;
    if (hours >= 1) return hours === 1 ? "1 saat önce" : `${hours} saat önce`;
    if (minutes >= 1) return minutes === 1 ? "1 dakika önce" : `${minutes} dakika önce`;
  
    return "Az önce"; // Eğer saniye farkı 60'tan küçükse
  }