"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Tour } from "@/types";
import { InputNumber } from "primereact/inputnumber";
import { TiMinus, TiPlus } from "react-icons/ti";
import { Calendar } from "primereact/calendar";
import { useLocale, useTranslations } from "next-intl";
import { BsCalendarEvent, BsCalendarHeart } from "react-icons/bs";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { Dropdown } from "primereact/dropdown";
import { FaUserPlus } from "react-icons/fa6";
import { Button } from "primereact/button";
import { PiMinus, PiPlus } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

export default function TourBooking({ tour }: { tour: Tour | null }) {
  const locale = useLocale();
  const date = new Date();
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [openPrice, setOpenPrice] = useState(false);

  const t = useTranslations("tour");

  return (
    <>
      <div className="content-booking-form">
        <div className="item-line-booking">
          {" "}
          <strong className="text-md-bold neutral-1000">{t("Tarih")}:</strong>
          <span className="p-float-label" style={{ position: "relative" }}>
            <Calendar
              minDate={new Date()}
              locale="en"
              style={{ background: "white" }}
              dateFormat="dd/mm/yy"
            />
            <CiCalendar
              color="gray"
              size={28}
              style={{ position: "absolute", right: 10, top: 11 }}
            />
            <label>Reservation Date</label>
          </span>
        </div>
        <div className="item-line-booking">
          {" "}
          <strong className="text-md-bold neutral-1000">{t("Hours")}:</strong>
          <div className="line-booking-right flex-wrap">
            {tour?.tourDays.times.map((item, index) => (
              <label key={index}>
                <input key={index} type="radio" name="time" />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="item-line-booking">
          <strong className="text-md-bold neutral-1000">{t("Ticket")}:</strong>
          <span style={{ position: "relative" }}>
            <Button
              onClick={() => setOpenPrice(!openPrice)}
              outlined
              style={{ width: "200px", border: "1px solid lightgray" }}
              size="small"
              severity="secondary"
            >
              {adultCount} {t("adult")} {childCount} {t("cocuk")}
            </Button>
            <span
              className="adult-child-price-dropdown"
              style={{
                rowGap: 12,
                marginTop: 6,
                display: openPrice ? "flex" : "none",
              }}
            >
              <span className="adult-child-price-dropdown-content">
                <span style={{ fontWeight: "bold" }}>{t("adult")}</span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 12,
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      if (adultCount < 2) return null;
                      setAdultCount(adultCount - 1);
                    }}
                    rounded
                    outlined
                    severity="secondary"
                    icon={<PiMinus />}
                    className="adult-child-price-dropdown-button"
                  />
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "18px",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {adultCount}
                  </span>
                  <Button
                    onClick={() => setAdultCount(adultCount + 1)}
                    rounded
                    outlined
                    severity="secondary"
                    icon={<PiPlus />}
                    className="adult-child-price-dropdown-button"
                  />
                </span>
              </span>
              <span className="adult-child-price-dropdown-content">
                <span style={{ fontWeight: "bold" }}>{t("cocuk")}</span>
                <span
                  style={{
                    display: "flex",
                    fontSize: "18px",
                    flexDirection: "row",
                    columnGap: 12,
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      if (childCount < 1) return null;
                      setChildCount(childCount - 1);
                    }}
                    rounded
                    outlined
                    severity="secondary"
                    icon={<PiMinus />}
                    className="adult-child-price-dropdown-button"
                  />
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {childCount}
                  </span>
                  <Button
                    onClick={() => setChildCount(childCount + 1)}
                    rounded
                    outlined
                    severity="secondary"
                    icon={<PiPlus />}
                    className="adult-child-price-dropdown-button"
                  />
                </span>
              </span>
            </span>
          </span>
        </div>
        <div className="item-line-booking">
          <div className="box-tickets">
            <strong className="text-md-bold neutral-1000">
              {t("Ekstra")}:
            </strong>
            <div className="line-booking-tickets">
              <div className="item-ticket">
                <ul className="list-filter-checkbox">
                  {tour?.tourExtras.map((extra, index) => (
                    <li key={index}>
                      <label className="cb-container">
                        <input type="checkbox" />
                        <span className="text-sm-medium">{extra.name}</span>
                        <span className="checkmark" />
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="include-price">
                <ul className="">
                  {tour?.tourExtras.map((extra, index) => (
                    <p className="text-md-bold neutral-1000">${extra.priceUSD}</p>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="item-line-booking last-item">
          {" "}
          <strong className="text-md-bold neutral-1000">{t("Toplam")}:</strong>
          <div className="line-booking-right">
            <p className="text-xl-bold neutral-1000">
              ${tour?.tourPriceUSD.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="box-button-book">
          {" "}
          <a className="btn btn-book" href="#">
            {t("book")}
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 15L15 8L8 1M15 8L1 8"
                stroke="#0D0D0D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div className="box-need-help">
          {" "}
          <a href="help-center">
            <svg
              width={12}
              height={14}
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.83366 3.66667C2.83366 1.92067 4.25433 0.5 6.00033 0.5C7.74633 0.5 9.16699 1.92067 9.16699 3.66667C9.16699 5.41267 7.74633 6.83333 6.00033 6.83333C4.25433 6.83333 2.83366 5.41267 2.83366 3.66667ZM8.00033 7.83333H4.00033C1.88699 7.83333 0.166992 9.55333 0.166992 11.6667C0.166992 12.678 0.988992 13.5 2.00033 13.5H10.0003C11.0117 13.5 11.8337 12.678 11.8337 11.6667C11.8337 9.55333 10.1137 7.83333 8.00033 7.83333Z"
                fill="#0D0D0D"
              />
            </svg>
            {t("yardım")}
          </a>
        </div>
      </div>
    </>
  );
}
