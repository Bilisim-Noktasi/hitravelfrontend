// @ts-nocheck
"use client";
import { getRatesDispatch } from "@/redux/currencyRate";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {

    const dispatch = useDispatch<AppDispatch>()
    const {currencyRates} = useSelector((state: RootState) => state.currencyRate)

    useEffect(()=> {
        dispatch(getRatesDispatch())
    },[])

  return (
    <div>
      <ul className="flex flex-row">
        <li>{currencyRates?.TRY}</li>
      </ul>
    </div>
  );
}
