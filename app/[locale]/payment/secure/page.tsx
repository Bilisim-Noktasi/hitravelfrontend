"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";

const SecurePayment = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      const content = searchParams.get("content");
      
      if (!content) {
        setError("Ödeme bilgileri bulunamadı");
        setLoading(false);
        return;
      }
      
      // İçeriği çözümle
      const decodedContent = decodeURIComponent(content);
      
      // HTML içeriğini parse et
      const parser = new DOMParser();
      const doc = parser.parseFromString(decodedContent, "text/html");
      
      // Form ve submit işlemini manuel olarak gerçekleştir
      const form = doc.getElementById("iyzico-3ds-form") as HTMLFormElement;
      
      if (!form) {
        setError("Ödeme formu bulunamadı");
        setLoading(false);
        return;
      }
      
      const action = form.getAttribute("action");
      const method = form.getAttribute("method") || "post";
      
      // Form elemanlarını al
      const formData = new FormData();
      const inputs = form.querySelectorAll("input");
      
      inputs.forEach((input) => {
        const name = input.getAttribute("name");
        const value = input.getAttribute("value");
        
        if (name && value) {
          formData.append(name, value);
        }
      });
      
      // Yeni bir form oluştur ve submit et
      const newForm = document.createElement("form");
      newForm.setAttribute("method", method);
      newForm.setAttribute("action", action || "");
      newForm.style.display = "none";
      
      inputs.forEach((input) => {
        const clone = input.cloneNode(true);
        newForm.appendChild(clone);
      });
      
      document.body.appendChild(newForm);
      newForm.submit();
      
    } catch (err) {
      console.error("3D Secure yönlendirme hatası:", err);
      setError("Ödeme sayfası yüklenirken bir hata oluştu");
      setLoading(false);
    }
  }, [searchParams]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-3 text-lg">3D Secure sayfasına yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-4 max-w-md">
          <h2 className="text-xl text-red-500 font-semibold">Ödeme sayfası yüklenemedi</h2>
          <p className="mt-3">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Ödeme Sayfasına Geri Dön
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-3 text-lg">Banka sayfasına yönlendiriliyorsunuz...</p>
      </div>
    </div>
  );
};

export default SecurePayment;
