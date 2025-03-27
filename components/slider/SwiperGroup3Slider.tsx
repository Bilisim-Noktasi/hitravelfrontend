'use client'
import { swiperGroup3 } from "@/util/swiperOption"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Swiper, SwiperSlide } from "swiper/react"
import { getBlogsDispatch } from "@/redux/blogSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { formatDate } from "@/utils/dateUtils"

export default function SwiperGroup3Slider() {
	const t = useTranslations("homeBlog")
	const dispatch = useDispatch<AppDispatch>();
	const { blogs } = useSelector((state: RootState) => state.blog);

	useEffect(() => {
		dispatch(getBlogsDispatch(0, 10));
	}, [dispatch]);

	return (
		<>
			<Swiper {...swiperGroup3} loop={false}>
				{blogs.map((item, index) => (
					<SwiperSlide key={index}>
						<div className="card-news background-card hover-up">
							<div className="card-image">
								<label className="label">{t("blogCategory")}</label>
								<Link className="wish" href={`/blog/${item.slug}`}>
									<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
										<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
									</svg>
								</Link>
								<img src={item.imageUrl} alt="/assets/imgs/page/homepage1/news.png" />
							</div>
							<div className="card-info">

								<div className="card-title">
									<Link className="text-xl-bold neutral-1000" href={`/blog/${item.slug}`}>{item.title.length > 29 ? item.title.slice(0, 29) + "..." : item.title}</Link>
								</div>

								<div className="card-program">
									<div className="endtime">

										<div className="card-button"> <Link className="btn btn-gray" href={`/blog/${item.slug}`}>{t("keepReading")}</Link></div>
										<div className="card-meta"> <span className="text-sm mt-2  neutral-1000">📅 {formatDate(item.publishedDate)}</span></div>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}
