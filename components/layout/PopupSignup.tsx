import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { login, register } from "@/redux/authSlice";

export default function PopupSignup({ isRegister, handleRegister, handleLogin }: any) {
  const t = useTranslations("SignUp");
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(credentials)).unwrap();
      if (handleRegister) handleRegister(); // Başarılı girişten sonra popup'ı kapat
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // Giriş başarılı olduğunda popup'ı kapat
  useEffect(() => {
    if (isAuthenticated && isRegister) {
      handleRegister(); // Popup'ı kapat
    }
  }, [isAuthenticated, isRegister, handleLogin, handleRegister]);

  return (
    <>
      <div
        className="popup-signup"
        style={{ display: `${isRegister ? "block" : "none"}` }}
      >
        <div className="popup-container">
          <div className="popup-content">
            <a className="close-popup-signup" onClick={handleRegister} />
            <div className="d-flex gap-2 align-items-center">
              <Link href="#"></Link>
              <h4 className="neutral-1000">{t("title")}</h4>
            </div>
            <div className="form-login">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 form-group">
                    <label className="text-sm-medium">{t("firstName")}</label>
                    <input
                      className="form-control username"
                      type="text"
                      placeholder={t("firstName")}
                      name="firstName"
                      value={credentials.firstName}
                      onChange={handleChange}
                    // required
                    />
                  </div><div className="col-lg-6 form-group">
                    <label className="text-sm-medium">{t("surName")}</label>
                    <input
                      className="form-control username"
                      type="text"
                      placeholder={t("surName")}
                      name="lastName"
                      value={credentials.lastName}
                      onChange={handleChange}
                    // required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-sm-medium">{t("mail")}</label>
                  <input
                    className="form-control username"
                    type="email"
                    placeholder="Mail"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-sm-medium">{t("phone")}</label>
                  <input
                    className="form-control username"
                    type="tel"
                    placeholder={t("phone")}
                    name="phone"
                    value={credentials.phone}
                    onChange={handleChange}
                  // required
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-sm-medium">{t("password")}</label>
                      <input
                        className="form-control password"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-sm-medium">{t("password")}</label>
                      <input
                        className="form-control password"
                        type="password"
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="box-remember-forgot">
                    <div className="remeber-me">
                      <label className="text-xs-medium neutral-500">
                        <input className="cb-remember" type="checkbox" />
                        {t("subTitle")}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-black-lg">
                    {t("button")}
                  </button>
                </div>

                <p className="text-sm-medium neutral-500">
                  {t("subTitle1")}
                  <Link
                    className="neutral-1000 btn-signin"
                    href="#"
                    onClick={() => {
                      handleRegister();
                      handleLogin();
                    }}
                  >
                    {t("subTitle2")}{" "}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
