'use client'
import { useTranslations } from 'next-intl'
export default function SortHotelsFilter({
	sortCriteria,
	handleSortChange,
	itemsPerPage,
	handleItemsPerPageChange,
	handleClearFilters,
	startItemIndex,
	endItemIndex,
	sortedHotels }: any) {
		const t= useTranslations("SortHotelFilter")
	return (
		<>
			<div className="row align-items-center">
				<div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">
					<div className="box-view-type">
						<span className="text-sm-bold neutral-800 number-found">{startItemIndex} - {endItemIndex}  {sortedHotels.length} {t("filterResult")}</span>
					</div>
				</div>
				<div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
					<div className="box-item-sort">
						<button onClick={handleClearFilters}>{t("clearFilter")}</button>
						<div className="item-sort border-1"><span className="text-xs-medium neutral-500 mr-5">{t("show")}</span>
							<select value={itemsPerPage} onChange={handleItemsPerPageChange}>
								<option value={10}>10</option>
								<option value={15}>15</option>
								<option value={20}>20</option>
							</select>
						</div>
						<div className="item-sort border-1">
							 <span className="text-xs-medium neutral-500 mr-5">{t("shortBy")}</span>
							<select value={sortCriteria} onChange={handleSortChange}>
								<option value="name">{t("byName")}</option>
								<option value="price">{t("byPrice")}</option>
								<option value="rating">{t("byStar")}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
