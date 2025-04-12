"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/utils/dateUtils";

const ThankYouPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");

  useEffect(() => {
    if (paymentId && token) {
      fetch(
        `https://api.hitravel.com.tr/api/Payments/${paymentId}?token=${token}`
      )
        .then((res) => res.json())
        .then((data) => {
          // Ödeme verilerini state'e kaydet
          setPaymentData(data);
          
          // Ödeme durumunu ayarla
          switch (data.paymentStatus) {
            case 1:
              setPaymentStatus("pending");
              break;
            case 2:
              setPaymentStatus("completed");
              break;
            case 3:
              setPaymentStatus("failed");
              break;
            case 4:
              setPaymentStatus("refunded");
              break;
            case 5:
              setPaymentStatus("disputed");
              break;
            default:
              setPaymentStatus("unknown");
              break;
          }
        })
        .catch((err) => {
          console.error("API error:", err);
          setError("Ödeme durumu alınırken bir hata oluştu.");
        });
    } else {
      setError("Gerekli parametreler eksik!");
    }
  }, [paymentId, token]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Ödeme durumuna göre arkaplan ve renk ayarları
  const getStatusStyles = () => {
    switch (paymentStatus) {
      case "completed":
        return {
          background: "linear-gradient(120deg, #e0f7fa 0%, #bbdefb 100%)",
          cardBg: "rgba(255, 255, 255, 0.9)",
          textColor: "#333",
          accentColor: "#00b0ff",
          icon: (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00b0ff"
                strokeWidth="2"
                style={{ display: "block", margin: "0 auto" }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          ),
          title: "Ödeme Başarılı!",
          description: "Teşekkür ederiz, ödemeniz başarıyla tamamlandı. Tatiliniz için hazırız! 🏝️"
        };
      case "pending":
        return {
          background: "linear-gradient(120deg, #e6f7ff 0%, #cce9ff 100%)",
          cardBg: "#fff",
          textColor: "#333",
          accentColor: "#0091ea",
          icon: (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0091ea"
                strokeWidth="2"
                style={{ display: "block", margin: "0 auto" }}
              >
                <circle cx="12" cy="12" r="10" strokeDasharray="40" strokeDashoffset="0" />
              </svg>
            </motion.div>
          ),
          title: "Ödeme İşleniyor",
          description: "Ödemeniz şu anda işleniyor. Lütfen bekleyin, bu işlem birkaç dakika sürebilir."
        };
      case "failed":
        return {
          background: "linear-gradient(120deg, #fff5f5 0%, #fed7d7 100%)",
          cardBg: "#fff",
          textColor: "#333",
          accentColor: "#f56565",
          icon: (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 5, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f56565"
                strokeWidth="2"
                style={{ display: "block", margin: "0 auto" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </motion.div>
          ),
          title: "Ödeme Başarısız!",
          description: "Üzgünüz, ödeme işleminiz tamamlanamadı. Lütfen tekrar deneyin veya başka bir ödeme yöntemi kullanın."
        };
      case "refunded":
        return {
          background: "linear-gradient(120deg, #f0fff4 0%, #c6f6d5 100%)",
          cardBg: "#fff",
          textColor: "#333",
          accentColor: "#38a169",
          icon: (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#38a169"
              strokeWidth="2"
              style={{ display: "block", margin: "0 auto" }}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
              <path d="M16 7l-4-4-4 4" />
            </svg>
          ),
          title: "Ödeme İade Edildi",
          description: "Ödemeniz iade edildi. İade tutarı 3-5 iş günü içinde hesabınıza yansıyacaktır."
        };
      case "disputed":
        return {
          background: "linear-gradient(120deg, #fff8e1 0%, #ffecb3 100%)",
          cardBg: "#fff",
          textColor: "#333",
          accentColor: "#f59e0b",
          icon: (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              style={{ display: "block", margin: "0 auto" }}
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ),
          title: "Ödeme İtiraz Edildi",
          description: "Ödemeniz için bir itiraz süreci başlatıldı. Ekibimiz en kısa sürede sizinle iletişime geçecektir."
        };
      default:
        return {
          background: "linear-gradient(120deg, #f8f9fa 0%, #e9ecef 100%)",
          cardBg: "#fff",
          textColor: "#333",
          accentColor: "#6c757d",
          icon: (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6c757d"
              strokeWidth="2"
              style={{ display: "block", margin: "0 auto" }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          ),
          title: "Bilinmeyen Durum",
          description: "Ödeme durumu şu anda bilinmiyor. Lütfen daha sonra tekrar kontrol edin."
        };
    }
  };

  const statusStyles = getStatusStyles();

  // 👉 Burası kritik kısım!
  if (paymentStatus === null) {
    return null;
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: statusStyles.background,
        }}
      >
        {/* Completed payment animations and effects */}
        {paymentStatus === "completed" && (
          <>
            {/* Animated Beach Wave Background */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "150px",
                background: "rgba(0, 149, 255, 0.2)",
                zIndex: 1,
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "200%",
                  height: "100%",
                  background: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1440 320\"><path fill=\"%230095ff\" fill-opacity=\"0.3\" d=\"M0,192L60,197.3C120,203,240,213,360,192C480,171,600,117,720,117.3C840,117,960,171,1080,197.3C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z\"></path></svg>')",
                  backgroundRepeat: "repeat-x",
                  backgroundSize: "50% 100%",
                }}
                animate={{
                  x: [0, -window.innerWidth / 2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear",
                }}
              />
            </div>

            {/* Sky objects */}
            <>
              {/* Sun */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "10%",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ffeb3b, #ff9800)",
                  boxShadow: "0 0 50px rgba(255, 235, 59, 0.7)",
                  zIndex: 1,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />

              {/* Clouds */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "15%",
                  left: "10%",
                  width: "100px",
                  height: "60px",
                  borderRadius: "30px",
                  background: "rgba(255, 255, 255, 0.9)",
                  zIndex: 1,
                }}
                animate={{
                  x: [0, 50, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                }}
              />

              <motion.div
                style={{
                  position: "absolute",
                  top: "25%",
                  left: "25%",
                  width: "120px",
                  height: "70px",
                  borderRadius: "35px",
                  background: "rgba(255, 255, 255, 0.8)",
                  zIndex: 1,
                }}
                animate={{
                  x: [0, 30, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
              />
            </>

            {/* Vacation Icons Animation */}
            {showConfetti && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                {/* Airplane */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`plane-${i}`}
                    style={{
                      position: "absolute",
                      top: `${Math.random() * 70}%`,
                      left: "-100px",
                      transform: "rotate(10deg)",
                      fontSize: `${Math.random() * 20 + 20}px`,
                      color: "#3498db",
                    }}
                    animate={{
                      left: "120%",
                      y: [-20, 20, -10, 30, -20],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      delay: i * 3,
                      ease: "linear",
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "mirror",
                      },
                    }}
                  >
                   ✈️
                  </motion.div>
                ))}

                {/* Beach Icons */}
                {[...Array(20)].map((_, i) => {
                  const icons = ["🏖️", "🌴", "🧳", "🏝️", "🌞", "🕶️", "🍹", "🏄‍♂️", "🚢", "🏨"];
                  const icon = icons[Math.floor(Math.random() * icons.length)];
                  return (
                    <motion.div
                      key={`icon-${i}`}
                      style={{
                        position: "absolute",
                        top: "-50px",
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 20 + 20}px`,
                      }}
                      animate={{
                        top: "110%",
                        rotate: Math.random() * 720 - 360,
                        x: Math.random() * 100 - 50,
                      }}
                      transition={{
                        duration: Math.random() * 5 + 5,
                        delay: Math.random() * 5,
                        ease: "easeOut",
                      }}
                    >
                      {icon}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Payment status specific background */}
        {paymentStatus === "pending" && (
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, opacity: 0.3 }}>
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                border: "2px solid #0091ea",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </div>
        )}

        {paymentStatus === "failed" && (
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, opacity: 0.1 }}>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`error-${i}`}
                style={{
                  position: "absolute",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  fontSize: "36px",
                  opacity: 0.2,
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                }}
              >
                ⚠️
              </motion.div>
            ))}
          </div>
        )}

        {/* Colorful Confetti Animation (only for completed) */}
        {paymentStatus === "completed" && showConfetti && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: `${Math.random() * 12 + 8}px`,
                  height: `${Math.random() * 12 + 8}px`,
                  borderRadius: Math.random() > 0.3 ? "50%" : "0",
                  backgroundColor: `hsl(${Math.random() * 360}, 90%, 65%)`,
                  top: -20,
                  left: `${Math.random() * 100}vw`,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  top: "100vh",
                  rotate: Math.random() * 520,
                  x: Math.random() * 200 - 100,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: "easeOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        {/* Main Card Container */}
        <div style={{ position: "relative", zIndex: 3, padding: "20px", width: "100%", maxWidth: "700px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              width: "100%",
              margin: "0 auto",
              borderRadius: "24px",
              padding: "40px",
              background: statusStyles.cardBg,
              boxShadow: "0 20px 50px rgba(0, 149, 255, 0.2)",
              color: statusStyles.textColor,
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {statusStyles.icon}

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                margin: "20px 0 10px",
                color: statusStyles.accentColor,
              }}
            >
              {statusStyles.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: "18px", marginBottom: "25px" }}
            >
              {statusStyles.description}
            </motion.p>

            {/* Payment details for all statuses */}
            {paymentData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                  backgroundColor: paymentStatus === "completed" ? "rgba(255, 255, 255, 0.8)" : "rgba(245, 245, 245, 0.7)",
                  color: "#333",
                  borderRadius: "16px",
                  padding: "20px",
                  textAlign: "left",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <h3 style={{ fontSize: "20px", marginBottom: "15px", color: statusStyles.accentColor, fontWeight: "bold" }}>
                  Ödeme Detayları
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div style={{ background: "rgba(255,255,255,0.6)", padding: "15px", borderRadius: "12px" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", opacity: 0.7, fontSize: "14px" }}>İşlem Numarası</p>
                    <p style={{ fontWeight: "500" }}>{paymentData.transactionId || "N/A"}</p>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.6)", padding: "15px", borderRadius: "12px" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", opacity: 0.7, fontSize: "14px" }}>Ödeme Tutarı</p>
                    <p style={{ fontWeight: "500" }}>{paymentData.amount || "0"} {paymentData.currency || "TRY"}</p>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.6)", padding: "15px", borderRadius: "12px" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", opacity: 0.7, fontSize: "14px" }}>Ödeme Tarihi</p>
                    <p style={{ fontWeight: "500" }}>{paymentData.paymentDate ? formatDate(paymentData.paymentDate) : "N/A"}</p>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.6)", padding: "15px", borderRadius: "12px" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", opacity: 0.7, fontSize: "14px" }}>Ödeme Yöntemi</p>
                    <p style={{ fontWeight: "500" }}>{paymentData.paymentMethod || "N/A"}</p>
                  </div>
                  <div style={{ 
                    gridColumn: "1 / span 2", 
                    background: "rgba(255,255,255,0.6)", 
                    padding: "15px", 
                    borderRadius: "12px",
                    textAlign: "center"
                  }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", opacity: 0.7, fontSize: "14px" }}>Rezervasyon Kodu</p>
                    <p style={{ 
                      fontSize: "28px", 
                      letterSpacing: "3px",
                      color: statusStyles.accentColor,
                      fontWeight: "bold"
                    }}>
                      {paymentData.bookingId || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tamamlanan ödemeler için tatil hazırlık bölümü */}
            {paymentStatus === "completed" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                style={{
                  marginTop: "30px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "16px",
                  padding: "25px",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <h3 style={{ fontSize: "20px", marginBottom: "20px", color: "#00b0ff", textAlign: "center", fontWeight: "bold" }}>
                  Tatil Kontrol Listesi 🌴
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  {[
                    { text: "Bavulunuz", icon: "🧳" },
                    { text: "Pasaportunuz", icon: "🛂" },
                    { text: "Güneş Kremleri", icon: "🧴" },
                    { text: "Güneş Gözlüğünüz", icon: "🕶️" },
                    { text: "Mayo & Bikini", icon: "👙" },
                    { text: "Şapkanız", icon: "👒" },
                    { text: "Elektronik Cihazlar", icon: "📱" },
                    { text: "Şarj Aletleri", icon: "🔌" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 5px 15px rgba(0, 149, 255, 0.2)"
                      }}
                      style={{
                        background: "rgba(255, 255, 255, 0.8)",
                        padding: "12px 18px",
                        borderRadius: "50px",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "1px solid rgba(0, 176, 255, 0.3)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                        cursor: "default"
                      }}
                    >
                      <span style={{ fontSize: "22px" }}>{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Diğer statüler için yönlendirme düğmeleri */}
            {paymentStatus !== "completed" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: statusStyles.accentColor,
                    color: "#fff",
                    borderRadius: "50px",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  Anasayfaya Dön
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "white",
                    color: statusStyles.accentColor,
                    borderRadius: "50px",
                    border: `1px solid ${statusStyles.accentColor}`,
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Destek Al
                </motion.button>
              </motion.div>
            )}

            {/* Completed payment için tatil düğmeleri */}
            {paymentStatus === "completed" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  flexWrap: "wrap"
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#00b0ff",
                    color: "#fff",
                    borderRadius: "50px",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>🏠</span> Anasayfaya Dön
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#ff9800",
                    color: "#fff",
                    borderRadius: "50px",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>🧳</span> Rezervasyonlarım
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "white",
                    color: "#00b0ff",
                    borderRadius: "50px",
                    border: "1px solid #00b0ff",
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>🔍</span> Yeni Tatil Ara
                </motion.button>
              </motion.div>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: "#e53e3e",
                  fontWeight: "bold",
                  marginTop: "20px",
                  padding: "15px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(229, 62, 62, 0.1)",
                }}
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;