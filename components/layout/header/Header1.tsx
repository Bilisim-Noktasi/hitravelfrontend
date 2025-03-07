"use client";
import CurrencyDropdown from "@/components/elements/CurrencyDropdown";
import LanguageDropdown from "@/components/elements/LanguageDropdown";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/routing";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getTourCategoriesDispatch } from "@/redux/tourCategorySlice";
import { getTourSubCategoriesDispatch } from "@/redux/tourSubCategorySlice";
import { FaChevronRight } from "react-icons/fa";

const ThemeSwitch = dynamic(() => import("@/components/elements/ThemeSwitch"), {
  ssr: false,
});

export default function Header1({
  scroll,
  handleLogin,
  handleMobileMenu,
  handleRegister,
  handleSidebar,
}: any) {
  const t = useTranslations("HeaderLink");

  const dispatch = useDispatch<AppDispatch>();

  const { tours } = useSelector((state: RootState) => state.tour);
  const { categories } = useSelector((state: RootState) => state.tourCategory);
  const { subCategories } = useSelector((state: RootState) => state.tourSubCategory);
  
  const [selectedCategory, setSelectedCategory] = useState<any>(null); // State to store selected category

  useEffect(() => {
    dispatch(getTourCategoriesDispatch(0, 10));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTourSubCategoriesDispatch(0, 10));
  }, [dispatch]);

  // Handle hover to set the selected category
  const handleHoverCategoryChange = (categoryId: string) => {
    const selected = categories.find((cat) => cat.id === categoryId);
    setSelectedCategory(selected); // Update the selected category
  };

  return (
    <>
      <header className={`header sticky-bar ${scroll ? "stick" : ""}`}>
        <div className="container-fluid background-body">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link className="d-flex" href="/">
                  <img
                    className="light-mode"
                    alt="Travila"
                    src="/assets/imgs/template/hitravel.png"
                  />
                </Link>
              </div>
              <div className="header-nav">
                <nav className="nav-main-menu">
                  <ul className="main-menu">
                    <li className="mega-li">
                      <Link className="active" href="/">
                        {t("home")}
                      </Link>
                    </li>
                    <li className="mega-li-small has-children">
                      <Link href="/tours">{t("tours")}</Link>

                      {/* Kategorileri döngüye sokuyoruz */}
                      <div className="mega-menu">
                        <div className="mega-menu-inner mega-menu-inner-small">
                          <div className="row">
                            <div className="col-lg-6">
                              <ul className="sub-menu">
                                {categories?.map((item, index) => (
                                  <li
                                    onMouseEnter={() => handleHoverCategoryChange(item.id)} // Handle hover event
                                    key={index}
                                  >
                                    <Link
                                      href="/tours"
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        color:
                                          selectedCategory?.id === item.id
                                            ? "orange"
                                            : "",
                                      }}
                                    >
                                      {item.name}
                                      <FaChevronRight size={9} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-lg-6">
                              <ul className="sub-menu" style={{ marginLeft: 12 }}>
                                {/* Alt kategoriler, ilgili kategori seçildiğinde gösterilsin */}
                                {selectedCategory &&
                                  selectedCategory.id === selectedCategory?.id &&
                                  subCategories
                                    ?.filter(
                                      (subCategory) =>
                                        subCategory.categoryId ===
                                        selectedCategory.id
                                    )
                                    .map((item: any, index: number) => (
                                      <li key={index}>
                                        <Link href="/tours">{item.name}</Link>
                                      </li>
                                    ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="has-children">
                      <Link href="/villa-list">{t("villa")}</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/antalya-villa">Antalya Villaları</Link>
                        </li>
                        <li>
                          <Link href="/fethiye-villa">Fethiye Villaları</Link>
                        </li>
                      </ul>
                    </li>

                    <li className="">
                      <Link href="/coming">{t("hotel")}</Link>
                    </li>

                    <li className="mega-li-small">
                      <Link href="/coming">{t("destinations")}</Link>
                    </li>

                    <li>
                      <Link href="/blog">{t("blog")}</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/blog-grid-2">Grid Sidebar</Link>
                        </li>
                        <li>
                          <Link href="/blog-detail">Blog Details</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/contact">{t("contact")}</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="header-right">
              <LanguageDropdown />
              <CurrencyDropdown />
              <div className="d-none d-xxl-inline-block align-middle mr-15">
                <a className="btn btn-default btn-signin" onClick={handleLogin}>
                  {t("signIn")}
                </a>
              </div>
              <div
                className="burger-icon-2 burger-icon-white"
                onClick={handleSidebar}
              >
                <img src="/assets/imgs/template/icons/menu.svg" alt="Travila" />
              </div>
              <div
                className="burger-icon burger-icon-white"
                onClick={handleMobileMenu}
              >
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
