"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { articlesDATA } from "@/data/articles_data"
import { ArticleCard } from "@/components/ui/ArticleCard"
import { Header } from "@/components/ui/Header"
import { Paginationdown } from "@/components/ui/Paginationdown"
import Footer from "@/components/ui/Footer"
import DescriptionUnderPagination from "@/components/sections/DescriptionUnderPagination"

export default function Home() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase().trim() || ""

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  // 📱 responsive pagination
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setItemsPerPage(3)
      else if (window.innerWidth < 1024) setItemsPerPage(4)
      else setItemsPerPage(6)
    }

    update()
    window.addEventListener("resize", update)

    return () => window.removeEventListener("resize", update)
  }, [])

  // 🔄 reset page on change
  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage, query])

  // 🔎 filter articles
  const filteredArticles = articlesDATA.filter((item) => {
    // поиск только по тегу: #дизайн
    if (query.startsWith("#")) {
      const tagQuery = query.slice(1).trim()  

      return item.tag.toLowerCase().includes(tagQuery)
    }

    // обычный поиск
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query)
    )
  })

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / itemsPerPage)
  )

  const safePage = Math.min(currentPage, totalPages)

  const startIndex = (safePage - 1) * itemsPerPage

  const currentItems = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentPage={setCurrentPage} />

      <div className="flex-1">
        {/* ARTICLES */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 lg:mx-10">

          {currentItems.length > 0 ? (
            currentItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                author={item.author}
                description={item.description}
                id={item.id}
                slug={item.slug}
                tag={item.tag}
                date={item.date}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <p className="text-3xl text-muted-foreground">
                Ничего не найдено
              </p>

              <p className="text-lg mt-2 text-muted-foreground">
                Попробуйте изменить запрос поиска
              </p>
            </div>
          )}

        </div>

        {/* PAGINATION */}
        <div className="mt-10 lg:mt-20">
          <Paginationdown
            currentPage={safePage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <DescriptionUnderPagination />
      <Footer />
    </div>
  )
}