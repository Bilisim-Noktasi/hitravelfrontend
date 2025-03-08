// 'use client'
// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";

// const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
//   <button
//     {...props}
//     className={
//       "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
//     }
//     type="button"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 16 16"
//       fill="none"
//     >
//       <path
//         d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
//         stroke=""
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       ></path>
//     </svg>
//   </button>
// );
// const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
//   <button
//     {...props}
//     className={
//       "slick-next slick-arrow" +
//       (currentSlide === slideCount - 1 ? " slick-disabled" : "")
//     }
//     type="button"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 16 16"
//       fill="none"
//     >
//       <path
//         d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
//         stroke=""
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         {" "}
//       </path>
//     </svg>
//   </button>
// );

// function VillaSlider({ urlList }: { urlList: string[] }) {
//   const [nav1, setNav1] = useState<Slider | null>(null);
//   const [nav2, setNav2] = useState<Slider | null>(null);
//   let sliderRef1 = useRef(null);
//   let sliderRef2 = useRef(null);

//   const settingsMain = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     fade: true,
//     prevArrow: <SlickArrowLeft />,
//     nextArrow: <SlickArrowRight />,
//   };

//   const settingsThumbs = {
// 		slidesToShow: 5,
// 		slidesToScroll: 1,
// 		dots: false,
// 		focusOnSelect: true,
// 	}

//   useEffect(() => {
//     setNav1(sliderRef1);
//     setNav2(sliderRef2);
//   }, []);

//   return (
//     <section className="background-body">
//       <div className="box-banner-tour-detail-2-inner">
//         <div className="">
//           <Slider
//             {...settingsMain}
//             asNavFor={nav2}
//             ref={(slider) => (sliderRef1 = slider)}
//             className="banner-main"
//           >
//            {
//             urlList.map((item,index)=> (
//               <div key={index} className="banner-slide">
//               <div className="banner-image" style={{background:`url(${item})`, backgroundSize:'cover', backgroundPosition:'center'}} />
//             </div>
//             ))
//            }
//           </Slider>
//             <Slider
//               asNavFor={nav1}
//               ref={(slider) => (sliderRef2 = slider)}
//               slidesToShow={5}
//               dots={false}
//               arrows={false}
//               swipeToSlide={true}
//               focusOnSelect={true}
//             >
//               {urlList.map((item, index) => (
//                 <div key={index} className="banner-slide">
//                   <img
//                   className="rounded border"
//                     src={item}
//                     alt="Travila"
//                   />
//                 </div>
//               ))}
//             </Slider>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default VillaSlider;
