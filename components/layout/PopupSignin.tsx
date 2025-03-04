import { useTranslations } from "next-intl";
import Link from "next/link";
export default function PopupSignin({
  isLogin,
  handleLogin,
  isRegister,
  handleRegister,
}: any) {
  const t = useTranslations("SignIn");
  return (
    <>
      <div
        className="popup-signin"
        style={{ display: `${isLogin ? "block" : "none"}` }}
      >
        <div className="popup-container">
          <div className="popup-content">
            {" "}
            <a className="close-popup-signin" onClick={handleLogin} />
            <div className="d-flex gap-2 align-items-center">
              <Link href="#"></Link>
              <h4 className="neutral-1000">{t("title")}</h4>
            </div>
            <div className="box-button-logins">
              {" "}
              <Link className="btn btn-login btn-google mr-10" href="#">
                <img
                  src="/assets/imgs/template/popup/google.svg"
                  alt="Travila"
                />
                <span className="text-sm-bold">{t("google")}</span>
              </Link>
              <Link className="btn btn-login mr-10" href="#">
                <img
                  src="/assets/imgs/template/popup/facebook.svg"
                  alt="Travila"
                />
              </Link>
              <Link className="btn btn-login" href="#">
                <img
                  src="/assets/imgs/template/popup/apple.svg"
                  alt="Travila"
                />
              </Link>
            </div>
            <div className="form-login">
              <form action="#">
                <div className="form-group">
                  <label className="text-sm-medium">{t("mail")}</label>
                  <input
                    className="form-control username"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label className="text-sm-medium">{t("password")}</label>
                  <input className="form-control password" type="password" />
                </div>
                <div className="form-group">
                  <div className="box-remember-forgot">
                    <div className="remeber-me">
                      <label className="text-xs-medium neutral-500">
                        <input className="cb-remember" type="checkbox" />
                        {t("rememberMe")}
                      </label>
                    </div>
                    <div className="forgotpass">
                      {" "}
                      <Link className="text-xs-medium neutral-500" href="#">
                        {t("forgotPassword")}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-45 mb-30">
                  <Link className="btn btn-black-lg" href="#">
                    {t("button")}
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 15L15 8L8 1M15 8L1 8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
                <p className="text-sm-medium neutral-500 px-6">
                  {" "}
                  {t("subTitle")}
                  <a
                    className="neutral-1000 font-bold"
                    onClick={() => {
                      handleRegister();
                      handleLogin();
                    }}
                  >
                    {t("subTitle2")}{" "}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
