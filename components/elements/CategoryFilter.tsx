'use client'
import Dropdown from 'react-bootstrap/Dropdown'
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function CategoryFilter() {
	const t=useTranslations("FilterByProporties")
	return (
		<>
			<div className="d-flex align-items-center justify-content-center justify-content-lg-end popular-categories">
				<Dropdown className="dropdown dropdown-filter">
					<Dropdown.Toggle className="btn btn-dropdown dropdown-toggle" id="dropdownCategory" type="button" data-bs-toggle="dropdown" aria-expanded="false"> <span>{t("categories")}</span></Dropdown.Toggle>
					<Dropdown.Menu as="ul" className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownCategory" style={{ margin: 0 }}>
						<li><Link className="dropdown-item active" href="#">Attractives</Link></li>
						<li><Link className="dropdown-item" href="#">Active</Link></li>
						<li><Link className="dropdown-item" href="#">Nature</Link></li>
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown className="dropdown dropdown-filter">
					<Dropdown.Toggle className="btn btn-dropdown dropdown-toggle" id="dropdownCategory" type="button" data-bs-toggle="dropdown" aria-expanded="false"> <span>{t("duration")}</span></Dropdown.Toggle>
					<Dropdown.Menu as="ul" className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownCategory" style={{ margin: 0 }}>
						<li><Link className="dropdown-item active" href="#">4 Hours</Link></li>
						<li><Link className="dropdown-item" href="#">8 Hours</Link></li>
						<li><Link className="dropdown-item" href="#">2 Days</Link></li>
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown className="dropdown dropdown-filter">
					<Dropdown.Toggle className="btn btn-dropdown dropdown-toggle" id="dropdownCategory" type="button" data-bs-toggle="dropdown" aria-expanded="false"> <span>{t("review")}</span></Dropdown.Toggle>
					<Dropdown.Menu as="ul" className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownCategory" style={{ margin: 0 }}>
						<li><Link className="dropdown-item active" href="#">Newest</Link></li>
						<li><Link className="dropdown-item" href="#">Oldest</Link></li>
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown className="dropdown dropdown-filter">
					<Dropdown.Toggle className="btn btn-dropdown dropdown-toggle" id="dropdownCategory" type="button" data-bs-toggle="dropdown" aria-expanded="false"> <span>{t("price")}</span></Dropdown.Toggle>
					<Dropdown.Menu as="ul" className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownCategory" style={{ margin: 0 }}>
						<li><Link className="dropdown-item active" href="#">$10 - $100</Link></li>
						<li><Link className="dropdown-item" href="#">$100 - $1.000</Link></li>
						<li><Link className="dropdown-item" href="#">$1.000 - $10.000</Link></li>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</>
	)
}
