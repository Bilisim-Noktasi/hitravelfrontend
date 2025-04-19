'use client'
import { useTranslations } from 'next-intl'

export default function SortToursFilter({
	
	sortCriteria,
	handleSortChange,
	itemsPerPage,
	handleItemsPerPageChange,
	handleClearFilters,
	startItemIndex,
	endItemIndex,
	sortedTours }: any) {
		const t=useTranslations("SortToursFilter")
	return (
		
		<>
			<div>

			</div>
			<div className="row align-items-center">
				<div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">
					<div className="box-view-type">
						<span className="text-sm-bold neutral-500 number-found">{startItemIndex} - {endItemIndex} / {sortedTours.length} {t("filterResult")}</span>
					</div>
				</div>
				<div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
					<div className="box-item-sort">
						<button onClick={handleClearFilters}>{t("clearFilter")}</button>
						<div className="item-sort border-1"><span className="text-xs-medium neutral-500 mr-5">{t("show")}</span>
							<select value={itemsPerPage} onChange={handleItemsPerPageChange}>
								<option value={12}>12</option>
								<option value={24}>24</option>
								<option value={48}>48</option>
							</select>
						</div>
						<div className="item-sort border-1">
							<span className="text-xs-medium neutral-500 mr-5">{t("shortBy")}</span>
							{/* <Dropdown className="dropdown dropdown-sort border-1-right">
								<Dropdown.Toggle className="btn dropdown-toggle" id="dropdownSort" type="button" data-bs-toggle="dropdown" aria-expanded="false"> <span>Most Viewed</span></Dropdown.Toggle>
								<Dropdown.Menu as="ul" className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownSort" style={{ margin: 0 }}>
									<li><Link className="dropdown-item active" href="#">Most Viewed</Link></li>
									<li><Link className="dropdown-item" href="#">Recently search</Link></li>
									<li><Link className="dropdown-item" href="#">Most popular</Link></li>
									<li><Link className="dropdown-item" href="#">Top rated</Link></li>
								</Dropdown.Menu>
							</Dropdown> */}
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
