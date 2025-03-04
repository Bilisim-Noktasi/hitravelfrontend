'use client'
import Layout from "@/components/layout/Layout"
import News1 from "@/components/sections/News1"
import { swiperGroupAnimate } from "@/util/swiperOption"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Swiper, SwiperSlide } from "swiper/react"
export default function Error404() {
const t=useTranslations("Error")

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<section className="section-box box-become-video background-body">
						<div className="container">
							<div className="text-center"> <img className="mr-10" src="/assets/imgs/page/pages/404.png" alt="Travile" />
								<h1 className="neutral-1000"> <span>{t("we")} </span>{t("dontFind")}</h1>
								<p className="text-xl-medium neutral-500">{t("subTitle")}
								</p>
								<div className="d-flex align-items-center justify-content-center mt-45"><Link className="btn btn-black-lg-square" href="/">
									<svg className="first" width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										<path d="M8 15L0.999999 8L8 1M1 8L15 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
									</svg>{t("goBack")}</Link><Link className="btn btn-link" href="/help-center">{t("helpCenter")}</Link></div>
							</div>	
						</div>
					</section>
				<News1></News1>
				</div>
			</Layout>
		</>
	)
}