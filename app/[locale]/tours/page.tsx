"use client";
import ByActivities from "@/components/Filter/ByActivities";
import ByAttraction from "@/components/Filter/ByAttraction";
import ByDuration from "@/components/Filter/ByDuration";
import ByLanguage from "@/components/Filter/ByLanguage";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByRating from "@/components/Filter/ByRating";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import SortToursFilter from "@/components/elements/SortToursFilter";
import TourCard1 from "@/components/elements/tourcard/TourCard1";
import Layout from "@/components/layout/Layout";
import { AppDispatch, RootState } from "@/redux/store";
import { getToursDispatch } from "@/redux/tourSlice";
import useTourFilter from "@/util/useTourFilter";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "@/components/elements/Preloader";
import { useParams, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/useCurrency";

export default function TourGrid() {
  const dispatch = useDispatch<AppDispatch>()
  const tourState = useSelector((state: RootState) => state?.tour)
  const tours = tourState?.tours || []
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("tourGrid");
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const currency = useAppSelector((state) => state.currency.currency);

  const popularTours = tours.filter((tourItem) => tourItem.isPopular === true);

  useEffect(() => {
    dispatch(getToursDispatch(0, 100)).finally(() => setIsLoading(false));
  }, [dispatch]);

  const {
    filter,
    setFilter,
    sortCriteria,
    itemsPerPage,
    currentPage,
    uniqueActivities,
    uniqueLanguages,
    uniqueAttractions,
    // uniqueRatings,
    sortedTours,
    totalPages,
    paginatedTours,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleDurationRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex,
  } = useTourFilter(tours);

  // URL'den subCategory parametresini alıp filtreyi güncelleme
  useEffect(() => {
    const subCategoryId = searchParams.get('subCategory');
    if (subCategoryId && tours.length > 0) {
      // İlgili tour'u subCategoryId'ye göre bul
      const matchingTour = tours.find(tour => tour.subCategoryId?.toString() === subCategoryId);

      if (matchingTour && matchingTour.subCategoryName) {
        // Aktivite filtre dizisine ekle (eğer zaten yoksa)
        setFilter(prevFilter => {
          if (!prevFilter.activities.includes(matchingTour.subCategoryName)) {
            return {
              ...prevFilter,
              activities: [...prevFilter.activities, matchingTour.subCategoryName]
            };
          }
          return prevFilter;
        });
      }
    }
  }, [searchParams, tours, setFilter]);

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
                <h6 className="heading-6-medium">

                </h6>
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
                    <SortToursFilter
                      sortCriteria={sortCriteria}
                      handleSortChange={handleSortChange}
                      itemsPerPage={itemsPerPage}
                      handleItemsPerPageChange={handleItemsPerPageChange}
                      handleClearFilters={handleClearFilters}
                      startItemIndex={startItemIndex}
                      endItemIndex={endItemIndex}
                      sortedTours={sortedTours}
                    />
                  </div>

                  <div className="box-grid-tours wow fadeIn">
                    <div className="row">
                      {paginatedTours
                        ?.filter((tour) => tour.languageCode === (locale === 'tr' ? 2 : 1))
                        .map((tour) => (
                          <div className="col-xl-4 col-lg-6 col-md-6" key={tour.id}>
                            <TourCard1 tour={tour} />
                          </div>
                        ))}
                    </div>
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
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("filterPrice")}
                        </h6>
                        <ByPrice
                          filter={filter}
                          handlePriceRangeChange={handlePriceRangeChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("byActivities")}
                        </h6>
                        <ByActivities
                          uniqueActivities={uniqueActivities}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("byAttractions")}
                        </h6>
                        <ByAttraction
                          uniqueAttractions={uniqueAttractions}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("byDurations")}
                        </h6>
                        <ByDuration
                          filter={filter}
                          handleDurationRangeChange={handleDurationRangeChange}
                        />
                      </div>
                      {/* <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("reviewScore")}
                        </h6>
                        <ByRating
                          uniqueRatings={uniqueRatings}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("byLanguage")}
                        </h6>
                        <ByLanguage
                          uniqueLanguages={uniqueLanguages}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div> */}
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <h6 className="text-lg-bold neutral-1000">
                      {t("popularTours")}
                    </h6>
                    <div className="box-popular-posts">
                      <ul>
                        {popularTours.slice(0, 4).map((item) => (
                          <li key={item.id}>
                            <div className="card-post">
                              <div className="card-image">
                                <Link href={`/tours/${item.slug}`}>
                                  <img
                                    style={{ width: "85px", height: "85px", objectFit: "cover" }}
                                    src={item.tourImages?.[0]?.imageUrl || "https://placehold.co/500x500"}
                                    alt="Travila"
                                  />
                                </Link>
                              </div>
                              <div className="card-info">
                                <Link className="text-xs-bold" href={`/tours/${item.slug}`}>
                                  {item.name}
                                </Link>
                                {/* Seçilen kuru kontrol et ve fiyatı uygun şekilde göster */}
                                {currency === 'USD' && (
                                  <span className="price text-sm-bold neutral-1000">
                                    ${item.tourPriceUSD}
                                  </span>
                                )}
                                {currency === 'TL' && (
                                  <span className="price text-sm-bold neutral-1000">
                                    ₺ {item.tourPriceTRY}
                                  </span>
                                )}
                                {currency === 'EUR' && (
                                  <span className="price text-sm-bold neutral-1000">
                                    € {item.tourPriceEUR}
                                  </span>
                                )}
                                
                                {currency === 'USD' && (
                                  <span className="price-through text-xs-bold neutral-500">
                                    ${item.tourPriceUSD * 1.2}
                                  </span>
                                )}
                                {currency === 'TL' && (
                                  <span className="price-through text-xs-bold neutral-500">
                                    ₺ {item.tourPriceTRY * 1.2}
                                  </span>
                                )}
                                {currency === 'EUR' && (
                                  <span className="price-through text-xs-bold neutral-500">
                                    € {item.tourPriceEUR * 1.2}
                                  </span>
                                )}

                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-box box-media background-body">
            <div className="container-media wow fadeInUp">
              <img src="/assets/imgs/page/homepage5/media.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media2.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media3.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media4.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media5.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media6.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media7.png" alt="Travila" />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
