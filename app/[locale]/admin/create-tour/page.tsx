// @ts-ignore
"use client";
import React, { useEffect, useState } from "react";
import { TiDelete, TiPlus } from "react-icons/ti";
import {
  MdDelete,
  MdImage,
} from "react-icons/md";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import createTourSchema from "@/validations/createTourSchema";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useTranslations } from "next-intl";
import FileResizer from "react-image-file-resizer";
import { InputNumber } from "primereact/inputnumber";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getRatesDispatch } from "@/redux/currencyRate";
import {
  getCitiesByCountryIdDispatch,
  getCountriesDispatch,
  getStatesDispatch,
} from "@/redux/searchSlice";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import Preloader from "@/components/elements/Preloader";
import { MultiSelect } from "primereact/multiselect";
import { days } from "@/data/days";
import { InputMask } from "primereact/inputmask";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { createTourDispatch } from "@/redux/adminSlice";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreateTour() {
  const [loading, setLoading] = useState<boolean>(false);
  const { countries } = useSelector((state: RootState) => state.search);
  const { cities } = useSelector((state: RootState) => state.search);
  const { states } = useSelector((state: RootState) => state.search);
  const [selectedTime,setSelectedTime] = useState('')
  const [images, setImages] = useState<(File | null)[]>([null]);

  const t = useTranslations("CreateTour");
  const dispatch = useDispatch<AppDispatch>();

  const { currencyRates } = useSelector(
    (state: RootState) => state.currencyRate
  );

  useEffect(() => {
    dispatch(getRatesDispatch());
    dispatch(getCountriesDispatch());
  }, []);

  const _handleSubmit = async (values: any) => {
    const formData = new FormData();

    const resizeAndAppendImages = async () => {
      const resizePromises = (
        Object.entries(images) as [string, File | null][]
      ).map(([key, file]) => {
        if (file) {
          return new Promise<File>((resolve, reject) => {
            FileResizer.imageFileResizer(
              file,
              800, // genişlik
              800, // yükseklik
              "JPEG", // format
              100, // kalite
              0, // rotasyon
              (uri) => {
                if (uri instanceof File) {
                  const updatedFile = new File([uri], file.name, {
                    type: uri.type,
                  });
                  formData.append("tourImages", updatedFile);
                  resolve(updatedFile);
                }
              },
              "file" // çıktı tipi
            );
          });
        }
        return Promise.resolve(null);
      });
      await Promise.all(resizePromises)
    };

    await resizeAndAppendImages();
    formData.append("createTourRequest",new Blob([JSON.stringify(values)], {type: "application/json"}))
    dispatch(createTourDispatch(formData,setLoading))
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = Array.from(event.target.files || []); // Seçilen tüm dosyaları al

    setImages((prevImages) => {
      const updatedImages = [...prevImages];

      // Her bir dosyayı sırayla ilgili yerlere yerleştir
      files.forEach((file, fileIndex) => {
        const targetIndex = index + fileIndex; // Hedef alan
        if (targetIndex < updatedImages.length) {
          // Mevcut boş alan varsa doldur
          updatedImages[targetIndex] = file;
        } else {
          // Mevcut alanların ötesinde yeni alanlar oluştur
          updatedImages.push(file);
        }
      });

      // Eğer son alana ekleme yapılmışsa yeni bir boş alan ekle
      if (updatedImages[updatedImages.length - 1]) {
        updatedImages.push(null);
      }

      return updatedImages;
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          groupSize: 0,
          tourCategory: "",
          tourSubCategory: "",
          overView: "",
          highlight: "",
          rating: 0,
          tourType: "DAILY",
          questionAnswer: [{ question: "", answer: "" }],
          tourDateTime: { days: [], times: [], hours: "" },
          tripType: { departure: "", turnaround: "" },
          included: [],
          excluded: [],
          location: {
            country: "",
            city: "",
            state: "",
            map: { lat: "", lon: "" },
          },
          extra: [{ name: "", price: 0 }],
          transfer: [
            {
              isActive: true,
              location: "",
              price: 0,
            },
          ],
          price: 0,
          childPrice: [
            { minAge: 0, maxAge: 0, price: 0 },
          ],
          languages: [],
          note: "",
        }}
        //validationSchema={createTourSchema}
        onSubmit={_handleSubmit}
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="space-y-6 w-full">
            {/* TOUR PHOTO */}

            <div className="flex flex-wrap border-2 py-4 border-dashed border-gray-300 justify-center space-x-4 gap-y-4">
              {images?.map((image, index) => (
                <div
                  key={index}
                  className="relative w-40 h-40 border cursor-pointer border-gray-300 rounded-lg flex flex-wrap items-center justify-center"
                >
                  {image ? ( // Eğer bir resim varsa, önizleme göster
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <label
                      htmlFor={`image-upload-${index}`}
                      className="w-full h-full flex items-center justify-center text-gray-400"
                    >
                      <MdImage size={32} />
                    </label>
                  )}
                  <input
                    type="file"
                    id={`image-upload-${index}`}
                    accept="image/*"
                    multiple // Çoklu dosya yükleme özelliği
                    onChange={(event) => handleImageChange(event, index)}
                    className="hidden"
                  />
                </div>
              ))}
            </div>

            {/* Tur Bilgisi */}
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <h2 className="text-2xl font-bold text-center mb-4">
                TUR BİLGİSİ
              </h2>
              <div className="flex flex-row items-center gap-x-10">
                <button
                  onClick={() => setFieldValue('tourType','DAILY')}
                  className={`${
                    values.tourType === "DAILY" ? "bg-primary text-white" : "border"
                  } text-md p-1 px-2 rounded-xl`}
                >
                  Günübirlik
                </button>
                <button
                  onClick={() => setFieldValue('tourType','LONG')}
                  className={`${
                    values.tourType === "LONG" ? "bg-primary text-white" : "border"
                  } text-md p-1 px-2 rounded-xl`}
                >
                  Günlük
                </button>
                <Rating value={values.rating} onChange={(e) => setFieldValue('rating',e.value)} cancel={false} />
              </div>
              <div>
                <label className="block text-md my-2 font-medium">
                  Tur Adı
                </label>
                <Field
                  name="name"
                  placeholder="Tur adı girin"
                  className="w-full rounded text-md border bg-white px-4 py-2.5"
                />
              </div>

              <div className="grid gap-x-3 my-4 items-center grid-cols-3">
                <div>
                  <label className="block text-md font-medium">
                    Tur Kategorisi
                  </label>
                  <Field
                    name="tourCategory"
                    placeholder="Kategori seçin"
                    as="select"
                    className="w-full rounded border text-md bg-white px-4 py-2.5"
                  >
                    <option value="" disabled>
                      Seçiniz
                    </option>
                    <option value="culture">Kültür Turları</option>
                    <option value="abroad">Yurt Dışı Turları</option>
                    <option value="ship">Gemi Turları</option>
                  </Field>
                </div>

                <div>
                  <label className="block text-md font-medium">
                    Tur Alt Kategori
                  </label>
                  <Field
                    name="tourSubCategory"
                    placeholder="Kategori seçin"
                    as="select"
                    className="w-full rounded border bg-white px-4 py-2.5"
                  >
                    <option value="">Seçiniz</option>
                    <option value="gobeklitepe">Göbekli Tepe Turları</option>
                    <option value="haftasonu">Hafta Sonu Turları</option>
                    <option value="dubai">Dubai Turları</option>
                  </Field>
                </div>

                <div>
                  <label className="block text-md font-medium">
                    Tur Kapasitesi
                  </label>
                  <Field
                    name="groupSize"
                    placeholder="Max kişi sayısı"
                    className="w-full rounded border px-4 py-2"
                  />
                </div>
              </div>

              {/* TOUR DATE TIME */}
              <div className="grid grid-cols-3 my-4 gap-x-4">
                <div
                  className={`${
                    values.tourType === "DAILY" ? "block" : "hidden"
                  } flex flex-row items-center`}
                >
                  <div className="flex flex-col">
                    <label className="block text-md font-medium">
                      Tur Günleri
                    </label>
                    <MultiSelect
                      value={values.tourDateTime.days}
                      onChange={(e) =>
                        setFieldValue("tourDateTime.days", e.value)
                      }
                      options={days}
                      display="chip"
                      style={{ padding: 12, maxWidth: "100%" }}
                      itemTemplate={(option) => (
                        <div className="flex align-items-center">
                          <option>{t(option)}</option>
                        </div>
                      )}
                      placeholder="Gün Seçiniz"
                      maxSelectedLabels={7}
                      className="w-full md:w-20rem"
                    />
                  </div>
                  <div className="flex flex-col relative">
                    <label className="block text-md font-medium">
                      Tur Saatleri
                    </label>
                      <InputMask
                      value={selectedTime}
                        onChange={(e) => {
                          setSelectedTime(e.value)
                        }} 
                        className="px-4 text-md"
                         mask="99:99"
                         />
                      <TiPlus onClick={()=> {
                        setFieldValue('tourDateTime.times',[...values.tourDateTime.times,selectedTime])
                        setSelectedTime('')
                      }} className="bg-primary z-9999 absolute right-2 rounded-full top-11 w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className={`${values.tourType !== "DAILY" ? "block" : "hidden"}`}>
                <label className="block text-md font-medium">
                  Tur Gün Sayısı
                </label>
                <Field
                  type="number"
                  name="duration"
                  placeholder="Süre (örneğin: 5 Gün)"
                  className="w-24 rounded bg-white border px-2 text-lg"
                />
              </div>
              {/* TOUR DATE TIME END */}

              <div className="grid grid-cols-2 gap-x-2">
                <div className="mb-4">
                  <label className="block text-md my-2 font-medium">
                    Genel Bakış
                  </label>
                  <ReactQuill
                    className="bg-white"
                    theme="snow"
                    value={values.overView}
                    onChange={handleChange("overView")}
                  />
                  {/* <Field
                name="overView"
                as="textarea"
                placeholder="Tur hakkında kısa bilgi"
                rows="3"
                className="w-full rounded border px-4 py-2"
              /> */}
                </div>
                <div className="mb-4">
                  <label className="block text-md my-2 font-medium">
                    Öne Çıkanlar
                  </label>
                  <ReactQuill
                    className="bg-white"
                    theme="snow"
                    value={values.highlight}
                    onChange={handleChange("highlight")}
                  />
                </div>
              </div>
            </div>

            {/* Dil */}
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">DİL</h3>
              <div className="grid grid-cols-2 gap-x-4 justify-around">
                <div>
                  <Field
                    name="languages"
                    placeholder="Kategori seçin"
                    as="select"
                    className="w-full rounded border bg-white px-4 py-2"
                    onChange={(e: any) => {
                      const value = e.target.value;
                      if (value) {
                        // `included` listesine ekleme
                        setFieldValue("languages", [
                          ...values.languages,
                          value,
                        ]);
                      }
                    }}
                  >
                    <option value="">Seçiniz</option>
                    <option value="İngilizce">İngilizce</option>
                    <option value="Türkçe">Türkçe</option>
                    <option value="Almanca">Almanca</option>
                    <option value="Rusca">Rusca</option>
                    <option value="Arapca">Arapca</option>
                  </Field>
                </div>
                <ul className="flex flex-row flex-wrap">
                  {values.languages?.map((item, index) => (
                    <li key={index} className="flex items-center ml-4">
                      <span className="text-md">{item}</span>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => {
                          // Listedeki öğeyi kaldır
                          const deletedLanguage = values.languages.filter(
                            (i) => i !== item
                          );
                          setFieldValue("languages", deletedLanguage);
                        }}
                      >
                        <TiDelete />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vasıta */}
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">VASITA</h3>
              <div className="grid grid-cols-2 gap-x-4 justify-around">
                <div>
                  <label className="block text-md font-medium">Gidiş</label>
                  <Field
                    name={`tripType.departure`}
                    placeholder="Kategori seçin"
                    as="select"
                    className="w-full rounded border bg-white px-4 py-2.5"
                  >
                    <option value="" disabled>
                      Seçiniz
                    </option>
                    <option value="Otobüs">Otobüs</option>
                    <option value="Uçak">Uçak</option>
                    <option value="Tren">Tren</option>
                  </Field>
                </div>
                <div>
                  <label className="block text-md font-medium">Gidiş</label>
                  <Field
                    name={`tripType.turnaround`}
                    placeholder="Kategori seçin"
                    as="select"
                    className="w-full rounded border bg-white px-4 py-2.5"
                  >
                    <option value="" disabled>
                      Seçiniz
                    </option>
                    <option value="Otobüs">Otobüs</option>
                    <option value="Uçak">Uçak</option>
                    <option value="Tren">Tren</option>
                  </Field>
                </div>
              </div>
            </div>

            {/* Dahil | Dahil Degil */}
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                DAHİL | DAHİL DEĞİL
              </h3>
              <div className="grid grid-cols-2 gap-x-4 justify-around">
                <div>
                  <ul className="mb-2">
                    {values.included.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ul className="flex flex-row w-full gap-y-2 bg-gray-100 px-4">
                          <li className="py-1">{item}</li>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => {
                              // Listedeki öğeyi kaldır
                              const updatedIncluded = values.included.filter(
                                (i) => i !== item
                              );
                              setFieldValue("included", updatedIncluded);
                            }}
                          >
                            <TiDelete />
                          </button>
                        </ul>
                      </li>
                    ))}
                  </ul>
                  <label className="block text-md font-medium">Dahil</label>
                  <Field
                    name="included"
                    as="select"
                    className="w-full rounded border bg-white px-4 py-2.5"
                    onChange={(e: any) => {
                      const value = e.target.value;
                      if (value) {
                        // `included` listesine ekleme
                        setFieldValue("included", [...values.included, value]);
                      }
                    }}
                  >
                    <option value="">Seçiniz</option>
                    <option value="Doğa">Doğa</option>
                    <option value="Tarih">Tarihi</option>
                    <option value="Macera">Macera</option>
                  </Field>
                </div>

                <div>
                  <ul className="mb-2">
                    {values.excluded.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row w-full gap-y-2 bg-gray-100 px-4"
                      >
                        <span className="py-1">{item}</span>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => {
                            // Listedeki öğeyi kaldır
                            const updateExcluded = values.excluded.filter(
                              (i) => i !== item
                            );
                            setFieldValue("included", updateExcluded);
                          }}
                        >
                          <TiDelete />
                        </button>
                      </div>
                    ))}
                  </ul>
                  <label className="block text-md font-medium">
                    Dahil Değil
                  </label>
                  <Field
                    name="excluded"
                    as="select"
                    className="w-full rounded border bg-white px-4 py-2.5"
                    onChange={(e: any) => {
                      const value = e.target.value;
                      if (value) {
                        // `included` listesine ekleme
                        setFieldValue("excluded", [...values.excluded, value]);
                      }
                    }}
                  >
                    <option value="">Seçiniz</option>
                    <option value="nature">Doğa</option>
                    <option value="historical">Tarihi</option>
                    <option value="adventure">Macera</option>
                  </Field>
                </div>
              </div>
            </div>

            {/* Sorular ve Cevaplar */}
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                SORULAR VE CEVAPLAR
              </h2>
              <FieldArray name="questionAnswer">
                {({ push, remove }) => (
                  <div>
                    {values.questionAnswer.map((item, index) => (
                      <div key={index} className="mb-4 flex gap-4">
                        <div className="flex flex-col w-full">
                          <Field
                            name={`questionAnswer[${index}].question`}
                            placeholder="Soru"
                            className="flex-1 flex-col rounded border px-4 py-2.5"
                          />
                          <ErrorMessage
                            name={`questionAnswer[${index}].question`}
                            component="span"
                            className="text-red-600 text-xs"
                          />
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name={`questionAnswer[${index}].answer`}
                            placeholder="Cevap"
                            className="flex-1 rounded border px-4 py-2.5"
                          />
                          <ErrorMessage
                            name={`questionAnswer[${index}].answer`}
                            component="span"
                            className="text-red-600 text-xs"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="px-4 py-2.5 rounded h-fit"
                        >
                          <MdDelete size={32} color="red" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ question: "", answer: "" })}
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Yeni Ekle
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            
            {/* Fiyatlandırma */}
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">FİYATLANDIRMA</h2>
              <div className="flex flex-col gap-4">
                {/* USD Alanı */}
                <div className="flex items-center gap-4">
                  <label className="font-medium w-20">USD:</label>
                  <InputNumber
                    mode="currency"
                    currency="USD"
                    currencyDisplay="symbol"
                    value={values.price}
                    inputClassName="px-4 text-md"
                    name={`price.price`}
                    onChange={(e) => {
                      const usdValue = e.value;
                      setFieldValue(`price`, usdValue);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-4">
                    <label className="font-medium w-20">TRY:</label>
                    <span className="bg-gray-100 py-[10px] rounded-lg px-4 font-bold">
                      {Math.round(values.price * currencyRates.TRY / 10) * 10 } ₺
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="font-medium w-20">EUR:</label>
                    <span className="bg-gray-100 py-[10px] rounded-lg px-4 font-bold">
                      {Math.round(values.price * currencyRates.EUR)} €
                    </span>
                  </div>
                </div>
                {/* Çocuk Fiyatları */}
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-md font-medium mb-2">Çocuk Fiyatları</h3>
                  <FieldArray
                    name="childPrice"
                    render={(arrayHelpers) => (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                          {values.childPrice.map((item, index) => (
                            <div className="flex items-center gap-4">
                              {/* Min Age */}
                              <InputNumber
                                inputClassName="px-2 placeholder:text-sm w-20 text-md"
                                placeholder="Min Yaş"
                                value={item.minAge}
                                onChange={(e) =>
                                  setFieldValue(
                                    `childPrice[${index}].minAge`,
                                    e.value
                                  )
                                }
                              />
                              <span>-</span>
                              {/* Max Age */}
                              <InputNumber
                                inputClassName="px-2 placeholder:text-sm w-20 text-md"
                                placeholder="Max Yaş"
                                value={item.maxAge}
                                onChange={(e) =>
                                  setFieldValue(
                                    `childPrice[${index}]maxAge`,
                                    e.value
                                  )
                                }
                              />
                              {/* Child Price */}
                              <InputNumber
                                mode="currency"
                                currency="USD"
                                currencyDisplay="symbol"
                                inputClassName="px-4 text-md"
                                value={item.price}
                                onChange={(e) => {
                                  const usdValue = e.value || 0;
                                  setFieldValue(
                                    `childPrice[${index}].price`,
                                    usdValue
                                  );
                                }}
                              />
                              <div className="flex flex-row items-center gap-2">
                                <div className="flex items-center">
                                  <span className="bg-gray-100 py-2.5 rounded-lg px-4 font-bold">
                                    {Math.round(
                                      (item.price * currencyRates.TRY) / 10
                                    ) * 10}{" "}
                                    ₺
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="bg-gray-100 py-2.5 rounded-lg px-4 font-bold">
                                    {Math.round(item.price * currencyRates.EUR)}{" "}
                                    €
                                  </span>
                                </div>
                              </div>
                              {/* Silme Butonu */}
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                className="bg-red-500 rounded text-white p-2"
                              >
                                <MdDelete />
                              </button>
                            </div>
                          ))}
                        </div>
                        {/* Yeni Çocuk Fiyatı Ekleme Butonu */}
                        <button
                          type="button"
                          className="px-4 py-2 w-44 bg-green-500 text-white rounded"
                          onClick={() =>
                            arrayHelpers.push({
                              minAge: 0,
                              maxAge: 0,
                              price: {code: 'USD', price: 0},
                            })
                          }
                        >
                          Çocuk Fiyatı Ekle
                        </button>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Lokasyon Bilgisi */}
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">LOKASYON BİLGİSİ</h2>
              <div>
                <div className="mb-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="card flex justify-content-center">
                      <Dropdown
                        value={values.location.country}
                        filter
                        optionLabel="country_name"
                        className="px-2 py-2.5"
                        options={countries}
                        placeholder="Ülke Seçiniz"
                        onChange={(e: DropdownChangeEvent) => {
                          setFieldValue(
                            "location.country",
                            e.value.country_name
                          );
                          dispatch(
                            getCitiesByCountryIdDispatch(e.value.country_id)
                          );
                        }}
                        valueTemplate={(option, props) => (
                          <div className="w-max h-max">
                            <div className="text-md">
                              {values.location.country}
                            </div>
                          </div>
                        )}
                        itemTemplate={(option) => (
                          <div className="text-md">{option?.country_name}</div>
                        )}
                      />
                    </div>
                    <div className="card flex justify-content-center">
                      <Dropdown
                        value={values.location.city}
                        filter
                        optionLabel="cityName"
                        className="px-2 py-2.5"
                        defaultValue="Seçiniz"
                        disabled={cities.length === 0 ? true : false}
                        options={cities}
                        placeholder="Şeihir Seçiniz"
                        onChange={(e: DropdownChangeEvent) => {
                          setFieldValue("location.city", e.value.cityName);
                          dispatch(getStatesDispatch(e.target.value.cityId));
                        }}
                        valueTemplate={(option, props) => (
                          <div className="text-md">{values.location.city}</div>
                        )}
                        itemTemplate={(option) => (
                          <div className="text-md px-2">{option?.cityName}</div>
                        )}
                      />
                    </div>

                    <div className="card flex justify-content-center">
                      <Dropdown
                        value={values.location.state}
                        filter
                        optionLabel="stateName"
                        className="px-2 py-2.5"
                        defaultValue="Seçiniz"
                        options={states}
                        placeholder="Ülke Seçiniz"
                        onChange={(e: DropdownChangeEvent) => {
                          setFieldValue("location.state", e.value.stateName);
                        }}
                        valueTemplate={(option, props) => (
                          <div className="text-md">{values.location.state}</div>
                        )}
                        itemTemplate={(option) => (
                          <div className="text-md px-2">
                            {option?.stateName}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      name={`location.map.lat`}
                      placeholder="Enlem (Lat)"
                      className="w-full rounded border px-4 py-2.5"
                    />
                    <Field
                      name={`location.map.lon`}
                      placeholder="Boylam (Lon)"
                      className="w-full rounded border px-4 py-2.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer */}
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">TRANSFER</h2>
              <FieldArray
                name="transfer"
                render={(arrayHelpers) => (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      {values.transfer.map((item, index) => (
                        <div className="flex items-center gap-4">
                          <div className="card flex justify-content-center">
                            <Dropdown
                              value={item.location}
                              filter
                              optionLabel="stateName"
                              className="px-2 py-2.5"
                              defaultValue="Seçiniz"
                              options={states}
                              placeholder="Ülke Seçiniz"
                              onChange={(e: DropdownChangeEvent) => {
                                setFieldValue(
                                  `transfer[${index}].location`,
                                  e.value.stateName
                                );
                              }}
                              valueTemplate={(option, props) => (
                                <div className="text-md">
                                  {values.transfer[index].location}
                                </div>
                              )}
                              itemTemplate={(option) => (
                                <div className="text-md px-2">
                                  {option?.stateName}
                                </div>
                              )}
                            />
                          </div>

                          {/* USD Fiyatı */}
                          <InputNumber
                            mode="currency"
                            currency="USD"
                            currencyDisplay="symbol"
                            inputClassName="px-4 text-md"
                            value={item.price}
                            onChange={(e) => {
                              const usdValue = e.value || 0;
                              setFieldValue(
                                `transfer[${index}].price`,
                                usdValue
                              );
                            }}
                          />
                          <div className="flex flex-row items-center gap-2">
                            <div className="flex items-center">
                              <span className="bg-gray-100 py-2.5 rounded-lg px-4 font-bold">
                                {Math.round(
                                  (item.price *currencyRates.TRY) /10) * 10}{" "}₺
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="bg-gray-100 py-2.5 rounded-lg px-4 font-bold">
                                {Math.round(
                                  item.price * currencyRates.EUR
                                )}{" "}
                                €
                              </span>
                            </div>
                          </div>
                          {/* Silme Butonu */}
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="bg-red-500 rounded text-white p-2"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 w-56 bg-green-500 text-white rounded"
                      onClick={() =>
                        arrayHelpers.push({
                          isActive: true,
                          location: "",
                          price: {code:'USD',price: 0},
                        })
                      }
                    >
                      Transfer Bölgesi Ekle
                    </button>
                  </div>
                )}
              />
            </div>
            
            <div className="rounded border border-gray-300 p-6 shadow-md">
              <label className="text-lg">NOT EKLE</label>
            <ReactQuill
                    className="bg-white"
                    theme="snow"
                    value={values.note}
                    onChange={handleChange("note")}
                  />
            </div>
            {/* Submit Button */}
            <div className="text-right">
              <Button
                type="submit"
                loading={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded"
              >
                Kaydet
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
