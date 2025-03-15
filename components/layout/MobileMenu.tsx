"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function MobileMenu({ isMobileMenu, handleMobileMenu, handleLogin, handleLogout }: any) {
  const [isAccordion, setIsAccordion] = useState(0);

  const { user, isAuthenticated } = useAuth();

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
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
            {" "}
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
                    <p className="text-md-bold neutral-1000">{user.email}</p>
                    <p className="text-xs neutral-1000">{user.status}</p>
                  </div>
                </div>
                <button 
                          className="dropdown-item text-danger" 
                          onClick={handleLogout}
                        >
                          {t("logout") || "Logout"}
                        </button>
              </div>
            ) : (
              <div className="d-none d-xxl-inline-block align-middle mr-15">
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
                    <li
                      className={`has-children ${isAccordion === 2 ? "active" : ""
                        }`}
                    >
                      <span
                        className="menu-expand"
                        onClick={() => handleAccordion(2)}
                      >
                        <i className="arrow-small-down"></i>
                      </span>
                      <Link href="/tour-grid">{t("tours")}</Link>
                      <ul
                        className="sub-menu"
                        style={{
                          display: `${isAccordion == 2 ? "block" : "none"}`,
                        }}
                      >
                        <li>
                          <Link href="/tour-grid-3">
                            Tours List - Top Fillter
                          </Link>
                        </li>
                        <li>
                          <Link href="/tour-grid">
                            Tours List - Sidebar Left Fillter
                          </Link>
                        </li>
                        <li>
                          <Link href="/tour-grid-2">
                            Tours List - Sidebar Right Fillter
                          </Link>
                        </li>
                        <li>
                          <Link href="/tour-list">Tours List 1</Link>
                        </li>
                        <li>
                          <Link href="/tour-list-2">Tours List 2</Link>
                        </li>
                        <li>
                          <Link href="/tour-detail">
                            Tour Single 01 - Gallery
                          </Link>
                        </li>
                        <li>
                          <Link href="/tour-detail-2">
                            Tour Single 02 - Slideshow
                          </Link>
                        </li>
                        <li>
                          <Link href="/tour-detail-3">
                            Tour Single 03 - Video
                          </Link>
                        </li>
                        <li>
                          <Link href="/tour-detail-4">
                            Tour Single 04 - Image
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={`has-children ${isAccordion === 3 ? "active" : ""
                        }`}
                    >
                      <span
                        className="menu-expand"
                        onClick={() => handleAccordion(3)}
                      >
                        <i className="arrow-small-down"></i>
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
                        <i className="arrow-small-down"></i>
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
