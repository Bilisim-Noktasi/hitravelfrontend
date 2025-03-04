import { useTranslations } from "next-intl"

export default function ByRating({ uniqueRatings, filter, handleCheckboxChange }: any) {
	const t=useTranslations("tourGrid")
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueRatings.map((rating: any) => (
						<li key={rating}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={filter.ratings.includes(rating)}
									onChange={handleCheckboxChange("ratings", rating)}
								/>
								{rating} {t("stars")}
								<span className="text-sm-medium">
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
								</span>
								<span className="checkmark" />
							</label>
						</li>
					))}					
				</ul>
			</div>
		</>
	)
}
