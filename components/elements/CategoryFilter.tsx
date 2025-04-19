'use client'
import Dropdown from 'react-bootstrap/Dropdown'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getTourCategoriesDispatch } from '@/redux/tourCategorySlice'

export default function CategoryFilter({ setSelectedCategory }: { setSelectedCategory: (category: string) => void }) {

	const t = useTranslations("FilterByProporties")
	const locale = useLocale();

	const dispatch = useDispatch<AppDispatch>();
	const categoryState = useSelector((state: RootState) => state?.tourCategory);
	const categories = categoryState?.categories || [];

	const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder)

	useEffect(() => {
		if (!categories.length) {
			dispatch(getTourCategoriesDispatch(0, 10));
		}
	}, [dispatch, categories]);

	const handleCategorySelect = (categoryName: string) => {
		setSelectedCategory(categoryName) // Seçilen kategoriyi parent'a gönderiyoruz
	}

	return (
		<>
			<div className="d-flex align-items-center justify-content-center justify-content-lg-end popular-categories">
				<Dropdown className="dropdown dropdown-filter">
					<Dropdown.Toggle className="btn btn-dropdown dropdown-toggle" id="dropdownCategory" type="button" aria-expanded="false">
						<span>{t("categories")}</span>
					</Dropdown.Toggle>
					<Dropdown.Menu as="ul" className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownCategory" style={{ margin: 0 }}>
						{
							sortedCategories.filter((sortedCategories) => sortedCategories.categoryType == 1).map((cat) => (
								<li key={cat.id}>
									<button className="dropdown-item" onClick={() => handleCategorySelect(cat.name)}>
										{locale === 'en' ? cat.nameEn : cat.name}
									</button>
								</li>
							))}
					</Dropdown.Menu>
				</Dropdown>
				{/* <Dropdown className="dropdown dropdown-filter">
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
				</Dropdown> */}
			</div>
		</>
	)
}
