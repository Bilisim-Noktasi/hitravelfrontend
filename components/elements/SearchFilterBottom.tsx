'use client'
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown'
import MyDatePicker from './MyDatePicker'
import { useTranslations } from 'next-intl'
export default function SearchFilterBottom({ miniField }: any) {
	const t= useTranslations("SearchBar")
	return (
		<>
			<div className="box-bottom-search background-card">
				{!miniField &&
					<div className="item-search">
						<label className="text-sm-bold neutral-900">📍 {t("location")}</label>
						<Dropdown className="dropdown">
							<Dropdown.Toggle className="btn btn-secondary dropdown-toggle btn-dropdown-search" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Antalya,Kaş</Dropdown.Toggle>
							<Dropdown.Menu as="ul" className="dropdown-menu">
								<li><Link className="dropdown-item" href="#">Muğla,Bodrum</Link></li>
								<li><Link className="dropdown-item" href="#">London, England</Link></li>
								<li><Link className="dropdown-item" href="#">İzmir,Alaçatı</Link></li>
								<li><Link className="dropdown-item" href="#">London, England</Link></li>

							</Dropdown.Menu>
						</Dropdown>
					</div>
				}
				<div className="item-search">
					<label className="text-sm-bold neutral-900">📅  {t("checkIn")}</label>
					<div className="box-calendar-date">
						<MyDatePicker />
					</div>
				</div>
				<div className="item-search item-search-3">
					<label className="text-sm-bold neutral-900">📅 {t("checkOut")}</label>
					<div className="box-calendar-date">
						<MyDatePicker />
					</div>
				</div>
				{!miniField &&
					<div className="item-search bd-none">
						<label className="text-sm-bold neutral-900">👫🏻 {t("guest")}</label>
						<Dropdown className="dropdown">
							<Dropdown.Toggle className="btn btn-secondary dropdown-toggle btn-dropdown-search" type="button" data-bs-toggle="dropdown" aria-expanded="false">2 {t("adults")}, 1 {t("kids")}</Dropdown.Toggle>
							<Dropdown.Menu as="ul" className="dropdown-menu">
								<li><Link className="dropdown-item" href="#">2 {t("adults")}, 2 {t("kids")}</Link></li>
								<li><Link className="dropdown-item" href="#">2 {t("adults")}, 3 {t("kids")}</Link></li>
								<li><Link className="dropdown-item" href="#">2 {t("adults")}, 4 {t("kids")}</Link></li>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				}
				<div className="item-search bd-none d-flex justify-content-end">
					<button className="btn btn-black-lg">
						<svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
						</svg>{t("search")}
					</button>
				</div>
			</div>
		</>
	)
} 
