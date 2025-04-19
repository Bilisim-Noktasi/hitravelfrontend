'use client'
import Layout from "@/components/layout/Layout";
import Subscriber1 from "@/components/sections/Subscriber1";
import { Link } from "@/i18n/routing";
import { getBlogsDispatch } from "@/redux/blogSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { formatDate } from "@/utils/dateUtils";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BlogGrid2() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const { blogs } = useSelector((state: RootState) => state.blog);
  const { categories } = useSelector((state: RootState) => state.tourCategory);

  useEffect(() => {
    dispatch(getBlogsDispatch(0, 20));
  }, [dispatch]);

  // En yeni blogu ve sonraki 4 blogu almak için useMemo kullanıyoruz
  const { latestBlog, otherBlogs } = useMemo(() => {
    if (!blogs || blogs.length === 0) return { latestBlog: null, otherBlogs: [] };

    const sortedBlogs = [...blogs]
      .filter(blog => blog.publishedDate) // Geçerli tarihi olmayanları filtrele
      .sort((a, b) => new Date(b.publishedDate!).getTime() - new Date(a.publishedDate!).getTime());

    return {
      latestBlog: sortedBlogs[0] || null,  // En yeni blog
      otherBlogs: sortedBlogs.slice(1, 5), // 2., 3., 4. ve 5. blog
    };
  }, [blogs]);

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <section className="box-section box-breadcrumb background-body">
            <div className="container">
              <ul className="breadcrumbs">
                <li>
                  <Link href="/">{t("ana")}</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <Link href="/blog">{t("blog")}</Link>
                </li>
              </ul>
            </div>
          </section>
          <section className="section-box box-next-trips background-body">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <h1 className="text-64-medium neutral-1000">
                    {t("title")} <h1 className="neutral-1000">{t("esin")}</h1>
                  </h1>
                </div>
              </div>
              <div className="box-button-slider-nexttrip full-line" />
            </div>
          </section>
          <section className="section-box box-posts-grid-2 background-body">
            <div className="container">
              <div className="row">
                {latestBlog &&
                  <div className="col-lg-7">
                    <div className="card-blog">
                      <div className="card-image">
                        <img
                          src={latestBlog.imageUrl}
                        />
                      </div>
                      <div className="card-info">
                        <div className="card-info-blog">
                          <Link className="btn btn-label-tag" href={`/blog/${latestBlog.slug}`}>
                            {latestBlog.categoryName}
                          </Link>
                          <Link
                            className="card-title heading-5"
                            href={`/blog/${latestBlog.slug}`}
                          >
                            {latestBlog.title}
                          </Link>
                          <div className="card-meta-user">
                            <div className="box-author-small">
                              <img
                                src={latestBlog.imageUrl}
                                alt="Hi Travel"
                              />
                              <p className="text-sm-bold">Hi Travel</p>
                            </div>
                            <div className="date-post">
                              <p className="text-sm-medium">{formatDate(latestBlog.publishedDate ?? "")}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {/* En yeni 2-5. bloglar */}
                <div className="col-lg-5">
                  <ul className="list-posts list-posts-md">
                    {otherBlogs.map((item, index) => (
                      <li key={index}>
                        <div className="card-post">
                          <div className="card-image">
                            {" "}
                            <Link href={`/blog/${item.slug}`}>
                              <img src={item.imageUrl ?? "/assets/imgs/default-image.png"} alt="Blog" />
                            </Link>
                          </div>
                          <div className="card-info">
                            {" "}
                            <Link
                              className="text-xl-bold neutral-1000"
                              href={`/blog/${item.slug}`}
                            >
                              {item.title}
                            </Link>
                            <div className="d-flex align-items-center">
                              <p className="text-md-bold  neutral-500 mr-20">
                                📅 {formatDate(item.publishedDate ?? "")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </section>
          <section className="section-box box-category-posts background-body">
            <div className="container">
              <div className="box-list-populars">
                <div className="row">
                  {categories
                    .slice(0, 8)
                    .filter((category) => category.categoryType == 2)
                    .map((category) => (
                      <div className="col-lg-3 col-sm-6">
                        <div className="card-popular card-top-destination background-card wow fadeInUp">
                          <div className="card-image">
                            <img
                              src="/assets/imgs/page/blog/cat.png"
                              alt="Travila"
                            />
                          </div>
                          <div className="card-info">
                            <Link className="card-title" href="/blog-grid">
                              {locale == 'tr' ? category.name : category.nameEn}
                            </Link>
                            <div className="card-meta">
                              <div className="meta-links">
                                <Link className="text-tour text-post" href="#">
                                  {blogs.length} gönderi
                                </Link>
                              </div>
                              <div className="card-button">
                                <Link href="/blog-grid">
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
                    ))}


                </div>
              </div>
            </div>
          </section>
          <section className="section-box box-news box-news-blog-2 background-9">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-md-6 wow fadeInLeft">
                  <h2 className="neutral-1000">{t("hi")}</h2>
                  <p className="text-xl-medium neutral-500"></p>
                </div>
                <div className="col-md-6 wow fadeInRight">
                  <div className="d-flex justify-content-center justify-content-md-end">
                    <Link className="btn btn-black-lg" href="#">
                      {t("view")}
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 15L15 8L8 1M15 8L1 8"
                          stroke=""
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="box-list-news wow fadeInUp">
                <div className="row">
                  {blogs.map((item) => (
                    <div className="col-lg-4 col-md-6 mb-30">
                      <div className="card-news background-card hover-up">
                        <div className="card-image">
                          <label className="label">{item.categoryName}</label>
                          <Link className="wish" href="#">
                            <svg
                              width={20}
                              height={18}
                              viewBox="0 0 20 18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z"
                                stroke=""
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                              />
                            </svg>
                          </Link>
                          <img
                            src={item.imageUrl}
                            alt="Travila"
                          />
                        </div>
                        <div className="card-info">
                          <div className="card-title">
                            <Link
                              className="text-xl-bold neutral-1000"
                              href={`/blog/${item.slug}`}
                            >
                              {item.title}
                            </Link>
                          </div>
                          <div className="card-program">
                            <div className="endtime">
                              <div className="card-meta">
                                <span className=" neutral-1000">📅 {formatDate(item.publishedDate ?? "")}</span>
                              </div>
                              <div className="card-button">
                                <Link
                                  className="btn btn-gray"
                                  href={`/blog/${item.slug}`}
                                >
                                  {t("keep")}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <Link
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link active" href="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        ...
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <div className="pb-90 background-card" />
          <Subscriber1></Subscriber1>
          <section className="section-box box-media background-body">
            <div className="container-media wow fadeInUp">
              {" "}
              <img src="/assets/imgs/page/homepage5/media.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media2.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media3.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media4.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media5.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media6.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media7.png" alt="Travila" />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
