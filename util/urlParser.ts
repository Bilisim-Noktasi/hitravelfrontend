export default function urlParser(url: string | undefined | null) {
  if (!url) return '';
  return url.split('/').pop() || '';
}