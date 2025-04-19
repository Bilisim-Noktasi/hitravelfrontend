export const cleanContent = (content: string): string => {
    if (!content) return '';
  
    // "Drag" kelimesini içeren paragrafları kaldır
    content = content.replace(/<p[^>]*>.*?Drag.*?<\/p>/gi, '');
  
    // Boş paragrafları kaldır
    content = content.replace(/<p>\s*<\/p>/gi, '');
  
    // HTML entity'lerini düzelt
    content = content.replace(/&nbsp;/g, ' ');
  
    // Başındaki ve sonundaki boşlukları temizle
    return content.trim();
  };
  