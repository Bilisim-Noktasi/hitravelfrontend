export const capitalizeText= (text: string) => {
    if (!text) return '';
  return text
    .toLowerCase() // Önce tüm harfleri küçük yap
    .split(' ') // Kelimeleri ayır
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Her kelimenin baş harfini büyüt
    .join(' '); // Kelimeleri tekrar birleştir
}