import { Link } from "@/i18n/routing";
import CurrencyDropdown from "@/components/elements/CurrencyDropdown";
import LanguageDropdown from "@/components/elements/LanguageDropdown";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslations } from "next-intl";
import { IoSettingsOutline } from "react-icons/io5";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Sidebar({ isSidebar, handleSidebar, handleLogin }: any) {
  const t = useTranslations("SideBarMenu");
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    try {
      // Önce çıkış yap
      logout();
      // Sayfayı ana sayfaya yönlendir
      setTimeout(() => {
        router.push('/');
      }, 100);
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  return (
    <>
      <div
        className={`sidebar-canvas-wrapper perfect-scrollbar button-bg-2 ${isSidebar ? "sidebar-canvas-visible" : ""
          }`}
      >
        <PerfectScrollbar className="sidebar-canvas-container">
          <div className="sidebar-canvas-head">
            <div className="sidebar-canvas-logo">
              <Link className="d-flex" href="/">
                <img
                  className="light-mode"
                  alt="Travila"
                  src="/assets/imgs/template/hitravel.png"
                />
                <img
                  className="dark-mode"
                  alt="Travila"
                  src="/assets/imgs/template/hitravel.png"
                />
              </Link>
            </div>
            <div className="sidebar-canvas-lang">
              <LanguageDropdown />
              <CurrencyDropdown />
              <a className="close-canvas" onClick={handleSidebar}>
                <img
                  alt="Travila"
                  src="/assets/imgs/template/icons/close.png"
                />
              </a>
            </div>
          </div>
          <div className="sidebar-canvas-content" style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 100px)" }}>
            {isAuthenticated ? (
              <>
                <div className="box-author-profile">
                  <div className="card-author">
                    <div className="card-image">
                      <img
                        src="/assets/imgs/page/homepage1/author2.png"
                      />
                    </div>
                    <div className="card-info">
                      <Link href="/profile">
                        <p className="text-md-bold neutral-1000">{user?.email || "Kullanıcı"}</p>
                      </Link>
                      {/* <p className="text-xs neutral-1000">{user?.status || "Bilinmeyen Konum"}</p> */}
                    </div>
                  </div>
                  <button className="btn btn-black" onClick={handleLogout}>
                    {t("logout")}
                  </button>
                </div>

                <div className="box-quicklinks">
                  <h6 className="neutral-1000">🔗 {t("quickLinks")}</h6>
                  <div className="box-list-quicklinks">
                    <div className="item-quicklinks">
                      <div className="item-icon">
                        <img
                          src="/assets/imgs/template/icons/notify.svg"
                          alt="Travila"
                        />
                      </div>
                      <div className="item-info">
                        <Link href="#">
                          <h6 className="text-md-bold neutral-1000">
                            {t("notifications")}
                          </h6>
                        </Link>
                        <p className="text-xs neutral-500 online">2 yeni mesaj</p>
                      </div>
                    </div>
                    <div className="item-quicklinks">
                      <div className="item-icon">
                        <img
                          src="/assets/imgs/template/icons/bookmark.svg"
                          alt="Travila"
                        />
                      </div>
                      <div className="item-info">
                        <Link href="#">
                          <h6 className="text-md-bold neutral-1000">
                            {t("bookMarks")}
                          </h6>
                        </Link>
                        <p className="text-xs neutral-500">7 tours, 2 rooms</p>
                      </div>
                    </div>
                    <div className="item-quicklinks">
                      <div className="item-icon">
                        <IoSettingsOutline size={24} />
                      </div>

                      <div className="item-info">
                        <Link href="#">
                          <h6 className="text-md-bold neutral-1000">
                            {t("settings")}
                          </h6>
                        </Link>
                        <p className="text-xs neutral-500">Hesap Ayarları</p>
                      </div>
                    </div>
                  </div>
                </div>
              
                <div className="box-eventsdate">
                  <h6 className="neutral-1000">🗓️ {t("eventDates")}</h6>
                </div>
                <div className="box-savedplaces">
                  <h6 className=" neutral-1000">❤️ {t("savedPlaces")}</h6>
                  <div className="box-list-places">
                    <div className="card-place">
                      <div className="card-image">
                        <img
                          src="/assets/imgs/page/homepage1/place.png"
                          alt="Travila"
                        />
                      </div>
                      <div className="card-info background-card">
                        <div className="card-info-top">
                          <h6 className="text-xl-bold">
                            <Link className="neutral-1000" href="#">
                              Machu Picchu
                            </Link>
                          </h6>
                          <p className="text-xs card-rate">
                            <img
                              src="/assets/imgs/template/icons/star.svg"
                              alt="Travila"
                            />
                            4/5
                          </p>
                        </div>
                        <div className="card-info-bottom">
                          <p className="text-xs-medium neutral-500">
                            Carved by the Colorado River in Arizona, United States
                          </p>
                          <Link href="#">
                            <svg
                              width={10}
                              height={10}
                              viewBox="0 0 10 10"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Giriş yapmamış kullanıcı için boş alan
              null
            )}

            <div className="box-contactus" style={{ marginTop: "auto", paddingTop: "2rem" }}>
              <h6 className="neutral-1000" style={{ marginBottom: "1rem" }}>
                ☎️ {t("contactUs")}
              </h6>

              <div className="contact-info">
                <p
                  className="text-md-medium neutral-1000"
                  style={{ marginBottom: "1.5rem" }}
                >
                  📍 Antalya,Türkiye
                </p>
                <p className="text-md-medium neutral-1000">
                  📮 destek@hitravel.com.tr
                </p>
              </div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </>
  );
}
