import { useAppSelector } from '@/hooks/useCurrency';
import { Tour } from '@/types'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function TourCard1({ tour }: { tour: Tour }) {

	const t = useTranslations("TourCard1")
	const currency = useAppSelector((state) => state.currency.currency);

	return (
		<>
			<div className="card-journey-small background-card">
				<div className="card-image"> <Link className="label" href="#">{t("topRated")}</Link>
					<img src={tour.tourImages?.[0]?.imageUrl || "https://placehold.co/500x500"} alt="Travila" />
				</div>
				<div className="card-info background-card">
					<div className="card-rating">
						<div className="card-left"> </div>
						<div className="card-right"> <span className="rating">{tour.isPopular}4.9 <span className="text-sm-medium neutral-500">(8 {t("reviews")} )</span></span></div>
					</div>
					<div className="card-title">
						<Link className="text-lg-bold neutral-1000" href={`tours/${tour.slug}`}>{tour.name.length > 23 ? tour.name.slice(0, 23) + "..." : tour.name}</Link></div>
					<div className="card-program">
						<div className="card-duration-tour">
							<p className=" text-sm-medium neutral-900">📍{tour.subCategoryName}</p>
							<p className="text-sm-medium neutral-900"> 🙋🏻‍♀️{tour.size} {t("guest")}</p>
						</div>
						<div className="endtime">
							<div className="card-price">
								{/* Seçilen kuru kontrol et ve fiyatı uygun şekilde göster */}
                                {currency === 'USD' && (
                                  <h6 className="heading-6 neutral-1000">${tour.tourPriceUSD}</h6>
                                )}
                                {currency === 'TL' && (
                                  <h6 className="heading-6 neutral-1000">₺{tour.tourPriceTRY}</h6>
                                )}
                                {currency === 'EUR' && (
                                  <h6 className="heading-6 neutral-1000">€{tour.tourPriceEUR}</h6>
                                )}
								{tour.pricingType == 1 &&
									<p className="text-md-medium neutral-500">/ {t('person')}</p>
								}

							</div>
							<div className="card-button"> <Link className="btn btn-gray hover:bg-orange-400" href={`tours/${tour.slug}`}>{t("bookNow")}</Link></div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
