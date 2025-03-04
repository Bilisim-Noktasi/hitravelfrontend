"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from "date-fns/locale/tr";

export default function MyDatePicker() {
  const params = useParams();
  const [startDate, setStartDate] = useState(new Date());
  
  return (
    <>
      <DatePicker
        locale={tr}
		dateFormat={params?.locale === 'tr' ? 'dd.MM.yyyy':'MM/dd/yyyy'}
        selected={startDate}
		minDate={new Date()}
        onChange={(date: any) => setStartDate(date)}
        className="search-input datepicker"
      />
    </>
  );
}
