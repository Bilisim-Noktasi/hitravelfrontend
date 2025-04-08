import { Link } from "@/i18n/routing"

export default function BlogCard1({ item }:any) {
    return (
        <>

            <Link href={`/blog/${item.slug}`}>
                <img src={`/assets/images/blog/${item.img}`} alt="img" className="img-fluid" />
            </Link>
            <Link href={`/blog/${item.slug}`} rel="bookmark">{item.title}</Link>
            <br />

        </>
    )
}
