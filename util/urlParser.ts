export default function urlParser (url: string) {
    return url.split('/').pop()
}