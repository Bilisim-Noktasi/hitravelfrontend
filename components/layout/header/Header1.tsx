"use client";
import CurrencyDropdown from "@/components/elements/CurrencyDropdown";
import LanguageDropdown from "@/components/elements/LanguageDropdown";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getTourCategoriesDispatch } from "@/redux/tourCategorySlice";
import { getTourSubCategoriesDispatch } from "@/redux/tourSubCategorySlice";
import { FaChevronRight } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { FaUser } from "react-icons/fa";

export default function Header1({
  scroll,
  handleLogin,
  handleLogout,
  handleMobileMenu,
  handleRegister,
  handleSidebar,
}: any) {
  const t = useTranslations("HeaderLink");
  const { user, email, isAuthenticated } = useAuth();

  const dispatch = useDispatch<AppDispatch>();

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
                    <li className="">
                      <Link href="/villa-list">{t("villa")}</Link>
                    </li>
                    <li className="">
                      <Link href="/coming">{t("hotel")}</Link>
                    </li>
                    <li className="mega-li-small">
                      <Link href="/tours">{t("destinations")}</Link>
                    </li>
                    <li>
                      <Link href="/blog">{t("blog")}</Link>
                     
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
              {isAuthenticated && user ? (
                <div className="d-none d-xxl-inline-block align-middle mr-15">
                  <div className="dropdown">
                    <button 
                      className="btn btn-default dropdown-toggle" 
                      type="button" 
                      id="userDropdown" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      <FaUser className="me-2" />
                      {email}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="userDropdown"> 
                      <li>
                        <p className="dropdown-item">
                          {t("profile") || "Profile"}
                        </p>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item text-danger" 
                          onClick={handleLogout}
                        >
                          {t("logout") || "Logout"}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="d-none d-xxl-inline-block align-middle mr-15">
                  <a className="btn btn-default btn-signin" onClick={handleLogin}>
                    {t("signIn")}
                  </a>
                </div>
              )}
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
