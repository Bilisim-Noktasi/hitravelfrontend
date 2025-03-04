import { Link } from '@/i18n/routing'
import BannerMainSlider from '../slider/BannerMainSlider'

import SearchFilterBottom from '@/components/elements/SearchFilterBottom'
import { useTranslations } from "next-intl"

export default function BannerHome1() {
	const t=useTranslations("SearchBar")
	return (
		<>

			<section className="section-box box-banner-home2 background-body">
				<div className="container-top">
					<div className="container" />
				</div>
				<div className="container-banner">
					<BannerMainSlider />
				</div>
				<div className="container">
					<div className="box-search-advance background-card">
						<div className="box-top-search">
							<div className="left-top-search"><Link className="category-link btn-click active" href="/tours">🗺️ {t("tours")}</Link><Link className="category-link btn-click" href="/villa-list">🏡 {t("Villas")}</Link></div>
							<div className="right-top-search "><Link className="text-sm-medium need-some-help" href="/help-center">{t("description")}</Link></div>
						</div>
						<SearchFilterBottom />
					</div>
				</div>
			</section>
		</>
	)
}