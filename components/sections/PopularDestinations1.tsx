"use client"
import { Link } from '@/i18n/routing'
import CategoryFilter from '../elements/CategoryFilter'
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getTourSubCategoriesDispatch } from '@/redux/tourSubCategorySlice'
import { getToursDispatch } from '@/redux/tourSlice'

export default function PopularDestinations1() {

    const t = useTranslations("FilterByProporties")
    const locale = useLocale();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const dispatch = useDispatch<AppDispatch>();
    const tourCount = useSelector((state: RootState) => state?.tour.count)

    const subCategoryState = useSelector((state: RootState) => state?.tourSubCategory);

    const subCategories = subCategoryState?.subCategories || [];

    const filteredSubCategories = selectedCategory
        ? subCategories.filter(subCat => subCat.categoryName === selectedCategory)
        : subCategories

    useEffect(() => {
        if (!subCategories.length) {
            dispatch(getTourSubCategoriesDispatch(0, 10));
        }
    }, [dispatch, subCategories]);

    useEffect(() => {
        const languageCode = locale === 'tr' ? 2 : 1;
        dispatch(getToursDispatch(0, 100, languageCode));
      }, [dispatch, locale]);

    return (
        <>

            <section className="section-box box-popular-destinations background-body mt-0 pt-0">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-6 mb-30 text-center text-lg-start">
                            <h2 className="neutral-1000">{t("title")}</h2>
                            <p className="text-xl-medium neutral-1000">{t("subTitle")}</p>
                        </div>
                        <div className="col-lg-6 mb-30">
                            <CategoryFilter setSelectedCategory={setSelectedCategory} />
                        </div>
                    </div>
                    <div className="box-list-populars">
                        <div className="row">
                            {filteredSubCategories.slice(0, 7).map((subCat) => (
                                <div key={subCat.id} className="col-lg-3 col-sm-6">
                                    <div className="card-popular background-card hover-up">
                                        <div className="card-image">
                                            <Link href="/destinations">
                                                <img src={subCat.imageUrl ? subCat.imageUrl : "/assets/imgs/page/homepage1/popular.png"} alt="/assets/imgs/page/homepage1/popular.png" />
                                            </Link>
                                        </div>
                                        <div className="card-info">
                                            <Link className="card-title" href={`/tours?subCategory=${subCat.id}`}>
                                                {locale === 'en' ? subCat.nameEn : subCat.name}
                                            </Link>
                                            <div className="card-meta">
                                                <div className="meta-links">
                                                    <Link href={`/tours?subCategory=${subCat.id}`}>{tourCount} {t("tours")}, </Link><Link href="#">{subCategories.length} {t("activities")}</Link>
                                                </div>
                                                <div className="card-button">
                                                    <Link href={`/tours?subCategory=${subCat.id}`}>
                                                        <svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="col-lg-3 col-sm-6">
                                <div className="card-popular-2">
                                    <div className="card-info">
                                        <h6 className="neutral-500">Crafting Your Perfect Travel Experience</h6>
                                        <div className="card-meta">
                                            <div className="meta-links">Browse <br />All tours</div>
                                            <div className="card-button hover-up"> <Link href="/tours">
                                                <svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg></Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
