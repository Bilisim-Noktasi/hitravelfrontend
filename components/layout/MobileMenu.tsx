"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getTourCategoriesDispatch } from "@/redux/tourCategorySlice";
import { getTourSubCategoriesDispatch } from "@/redux/tourSubCategorySlice";
import { FaChevronRight } from "react-icons/fa";

export default function MobileMenu({ isMobileMenu, handleMobileMenu, handleLogin }: any) {
  const [isAccordion, setIsAccordion] = useState(0);

  const { user, isAuthenticated, logout } = useAuth();

  const dispatch = useDispatch<AppDispatch>();
  const locale = useLocale();

  // Güvenli selector kullanımı
  const categoryState = useSelector((state: RootState) => state?.tourCategory);
  const subCategoryState = useSelector((state: RootState) => state?.tourSubCategory);

  const categories = categoryState?.categories || [];
  const subCategories = subCategoryState?.subCategories || [];

  const [selectedCategory, setSelectedCategory] = useState<any>(null); // State to store selected category

  useEffect(() => {
    if (!categories.length) {
      dispatch(getTourCategoriesDispatch(0, 10));
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (!subCategories.length) {
      dispatch(getTourSubCategoriesDispatch(0, 10));
    }
  }, [dispatch, subCategories]);

  // Handle hover to set the selected category
  const handleHoverCategoryChange = (categoryId: string) => {
    const selected = categories.find((cat) => cat.id === categoryId);
    setSelectedCategory(selected); // Update the selected category
  };

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  const handleLogout = () => {
    try {
      // Önce çıkış yap
      logout();
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  const t = useTranslations("HeaderLink");
  return (
    <>
      <div
        className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${isMobileMenu ? "sidebar-visible" : ""
          }`}
      >
        <PerfectScrollbar className="mobile-header-wrapper-inner">
          <div className="mobile-header-logo">
            <Link className="d-flex" href="/">
              <img
                className="light-mode"
                alt="Travila"
                src="/assets/imgs/template/hitravel.png"
              />
            </Link>
            <div
              className="burger-icon burger-icon-white"
              onClick={handleMobileMenu}
            />
          </div>
          <div className="mobile-header-top">
            {isAuthenticated && user ? (
              <div className="box-author-profile">
              <div className="card-author">
                <div className="card-image">
                  <img
                    src="/assets/imgs/page/homepage1/author2.png"
                  />
                </div>
                <div className="card-info">
                  <Link href="/profile">
                    <p className="text-xs neutral-1000">{user?.email}</p>
                  </Link>
                </div>
              </div>
              <button className="btn btn-black" onClick={handleLogout}>
                {t("logout")}
              </button>
            </div>
            ) : (
              <div className="align-middle mr-15">
                <a className="btn btn-default btn-signin" onClick={handleLogin}>
                  {t("signIn")}
                </a>
              </div>
            )}
          </div>
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                <nav>
                  <ul className="mobile-menu font-heading">
                    <li className={`has-children ${isAccordion === 2 ? "active" : ""}`}>
                      <span className="menu-expand" onClick={() => handleAccordion(2)}>
                        <i className="arrow-small-down"></i>
                      </span>
                      <Link href="/tours">{t("tours")}</Link>
                      <ul className="sub-menu" style={{ display: `${isAccordion == 2 ? "block" : "none"}`, }}>
                        {categories
                          ?.slice()
                          .filter((item) => item.categoryType == 1)
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((item, index) => (
                            <li onMouseEnter={() => handleHoverCategoryChange(item.id)} // Handle hover event
                              key={index}>
                              <Link
                                href="/tours"
                                style={{
                                  color: selectedCategory?.id === item.id ? "orange" : "",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {locale === 'tr' ? item.name : item.nameEn}
                                <FaChevronRight size={9} />
                              </Link>
                            </li>
                          ))}
                      </ul>
                      {selectedCategory && (
                        <ul className="sub-menu" style={{ display: isAccordion === 2 ? "block" : "none", marginLeft: 16 }}>
                          {subCategories
                            ?.filter((sub) => sub.categoryId === selectedCategory.id)
                            .map((subItem, index) => (
                              <li key={index}>
                                <Link href={`/tours?subCategory=${subItem.id}`} onClick={handleMobileMenu}>
                                  {locale == 'tr' ? subItem.name : subItem.nameEn}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                    <li
                      className={`has-children ${isAccordion === 3 ? "active" : ""
                        }`}
                    >
                      <span
                        className="menu-expand"
                        onClick={() => handleAccordion(3)}
                      >
                        {/* <i className="arrow-small-down"></i> */}
                      </span>
                      <Link href="/coming">{t("destinations")}</Link>
                      <ul
                        className="sub-menu"
                        style={{
                          display: `${isAccordion == 3 ? "block" : "none"}`,
                        }}
                      ></ul>
                    </li>
                    <li
                      className={`has-children ${isAccordion === 5 ? "active" : ""
                        }`}
                    >
                      <span
                        className="menu-expand"
                        onClick={() => handleAccordion(5)}
                      >
                        {/* <i className="arrow-small-down"></i> */}
                      </span>
                      <Link href="/coming">{t("hotel")}</Link>
                    </li>
                    <li className={` ${isAccordion === 9 ? "active" : ""}`}>
                      <span
                        className="menu-expand"
                        onClick={() => handleAccordion(9)}
                      >
                        <i className="arrow-small-down"></i>
                      </span>
                      <Link href="/villa-list"> {t("villa")}</Link>
                    </li>
                    <li
                      className={` ${isAccordion === 9 ? "active" : ""
                        }`}
                    >
                      <span
                        className="menu-expand"
                        onClick={() => handleAccordion(9)}
                      >
                        <i className="arrow-small-down"></i>
                      </span>
                      <Link href="/blog"> Hi Blog</Link>

                    </li>
                    <li>
                      <Link href="/contact">{t("contact")}</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </>
  );
}
