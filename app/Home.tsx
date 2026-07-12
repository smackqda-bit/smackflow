"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { articlesDATA } from "@/data/articles_data"
import { ArticleCard } from "@/components/ui/ArticleCard"
import { Header } from "@/components/ui/Header"
import { Paginationdown } from "@/components/ui/Paginationdown"
import Footer from "@/components/ui/Footer"
import DescriptionUnderPagination from "@/components/sections/DescriptionUnderPagination"

gsap.registerPlugin(useGSAP)

export default function Home() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase().trim() || ""

  const articlesRef = useRef<HTMLDivElement>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  // Адаптивное количество карточек на странице
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(3)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4)
      } else {
        setItemsPerPage(6)
      }
    }

    updateItemsPerPage()

    window.addEventListener("resize", updateItemsPerPage)

    return () => {
      window.removeEventListener("resize", updateItemsPerPage)
    }
  }, [])

  // Возвращаемся на первую страницу при поиске
  // или изменении количества карточек
  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage, query])

  // Фильтрация статей
  const filteredArticles = articlesDATA.filter((item) => {
    if (query.startsWith("#")) {
      const tagQuery = query.slice(1).trim()

      return item.tag
        .toLowerCase()
        .replace("#", "")
        .includes(tagQuery)
    }

    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query)
    )
  })

  // Сортировка от новых статей к старым
  const sortedArticles = [...filteredArticles].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  )

  // Расчёт пагинации
  const totalPages = Math.max(
    1,
    Math.ceil(sortedArticles.length / itemsPerPage)
  )

  const safePage = Math.min(currentPage, totalPages)

  const startIndex = (safePage - 1) * itemsPerPage

  const currentItems = sortedArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // Анимация карточек
  useGSAP(
    () => {
      if (currentItems.length === 0) return

      gsap.fromTo(
        ".article-card",
        {
          autoAlpha: 0,
          y: 30,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility",
        }
      )
    },
    {
      scope: articlesRef,
      dependencies: [safePage, query, itemsPerPage],
      revertOnUpdate: true,
    }
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentPage={setCurrentPage} />

      <main className="flex-1">
        <div
          ref={articlesRef}
          className="
            mt-10
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
            mx-5
            lg:mx-10
          "
        >
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div
                key={item.slug}
                className="article-card"
              >
                <ArticleCard
                  id={item.id}
                  slug={item.slug}
                  title={item.title}
                  description={item.description}
                  author={item.author}
                  tag={item.tag}
                  date={item.date}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <p className="text-3xl text-muted-foreground">
                Ничего не найдено
              </p>

              <p className="mt-2 text-lg text-muted-foreground">
                Попробуйте изменить запрос поиска
              </p>
            </div>
          )}
        </div>

        {currentItems.length > 0 && totalPages > 1 && (
          <div className="mt-10 lg:mt-20">
            <Paginationdown
              currentPage={safePage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </main>

      <DescriptionUnderPagination />
      <Footer />
    </div>
  )
}