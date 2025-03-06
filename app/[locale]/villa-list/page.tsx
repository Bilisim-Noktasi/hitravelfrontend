'use client'
import ByAmenities from '@/components/Filter/ByAmenities'
import ByHotelType from '@/components/Filter/ByHotelType'
import ByLocation from '@/components/Filter/ByLocation'
import ByPagination from '@/components/Filter/ByPagination'
import ByPrice from '@/components/Filter/ByPrice'
import ByRating from '@/components/Filter/ByRating'
import ByRoom from '@/components/Filter/ByRoom'
import SearchFilterBottom from '@/components/elements/SearchFilterBottom'
import SortHotelsFilter from '@/components/elements/SortHotelsFilter'
import HotelCard1 from '@/components/elements/hotelcard/HotelCard1'
import Layout from "@/components/layout/Layout"
import { AppDispatch, RootState } from '@/redux/store'
import { getVillasDispatch } from '@/redux/villaSlice'
import rawHotelsData from "@/util/hotels.json"
import useHotelFilter from '@/util/useHotelFilter'
import { useTranslations } from 'next-intl'
import Link from "next/link"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Preloader from "@/components/elements/Preloader"

const hotelsData = rawHotelsData.map(hotel => ({
	...hotel,
	rating: parseFloat(hotel.rating as string)
}))

export default function VillaGrid() {
	const dispatch = useDispatch<AppDispatch>()
	const { villas } = useSelector((state:RootState) => state.villa)
	const [isLoading, setIsLoading] = useState(true)
	
	const {
		filter,
		sortCriteria,
		itemsPerPage,
		currentPage,
		uniqueRoomStyles,
		uniqueAmenities,
		uniqueLocations,
		uniqueRatings,
		uniqueHotelsType,
		sortedHotels,
		totalPages,
		paginatedHotels,
		handleCheckboxChange,
		handleSortChange,
		handlePriceRangeChange,
		handleItemsPerPageChange,
		handlePageChange,
		handlePreviousPage,
		handleNextPage,
		handleClearFilters,
		startItemIndex,
		endItemIndex,
	} = useHotelFilter(hotelsData)
	
	const t = useTranslations("Villa")
	
	useEffect(() => {
		dispatch(getVillasDispatch())
		setTimeout(() => {
			setIsLoading(false)
		}, 500)
	}, [dispatch])
	
	if (isLoading) {
		return <Preloader />
	}
	
	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<main className="main">
					<section className="box-section block-banner-tourlist">
						<div className="container">
							<div className="text-center">
								<h3>{t("title")}</h3>
								<h6 className="heading-6-medium"></h6>
							</div>
							<div className="box-search-advance box-search-advance-3 background-card wow fadeInUp">
								<SearchFilterBottom />
							</div>
						</div>
					</section>
					<section className="box-section block-content-tourlist background-body">
						<div className="container">
							<div className="box-content-main">
								<div className="content-right">
									<div className="box-filters mb-25 pb-5 border-bottom border-1">
										<SortHotelsFilter
											sortCriteria={sortCriteria}
											handleSortChange={handleSortChange}
											itemsPerPage={itemsPerPage}
											handleItemsPerPageChange={handleItemsPerPageChange}
											handleClearFilters={handleClearFilters}
											startItemIndex={startItemIndex}
											endItemIndex={endItemIndex}
											sortedHotels={sortedHotels}
										/>
									</div>
									<div className="box-grid-tours wow fadeIn">
										{isLoading ? (
											<div className="text-center">
												<p>Villalar yükleniyor...</p>
											</div>
										) : (
											<div className="row">
												{villas && villas.length > 0 ? (
													villas.map((villa) => (
														<div className="col-xl-4 col-lg-6 col-md-6" key={villa.homeId}>
															<HotelCard1 villa={villa} />
														</div>
													))
												) : (
													<div className="text-center w-100">
														<p>Hiç villa bulunamadı.</p>
													</div>
												)}
											</div>
										)}
									</div>
									<ByPagination
										handlePreviousPage={handlePreviousPage}
										totalPages={totalPages}
										currentPage={currentPage}
										handleNextPage={handleNextPage}
										handlePageChange={handlePageChange}
									/>
								</div>
								<div className="content-left order-lg-first">
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">{t("filterPrice")}</h6>
												<ByPrice filter={filter} handlePriceRangeChange={handlePriceRangeChange} />
											</div>
										</div>
									</div>
								
							
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">{t("amenities")}</h6>
												<ByAmenities
													uniqueAmenities={uniqueAmenities}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">{t("reviewScore")}</h6>
												<ByRating
													uniqueRatings={uniqueRatings}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">{t("bookingLocation")}</h6>
												<ByLocation
													uniqueLocations={uniqueLocations}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<div className="pb-90 background-body" />
					<section className="section-box box-media background-body">
						<div className="container-media wow fadeInUp"> <img src="/assets/imgs/page/homepage5/media.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media2.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media3.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media4.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media5.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media6.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media7.png" alt="Travila" /></div>
					</section>
				</main>
			</Layout>
		</>
	)
}
