"use client"

import { useEffect, useState } from "react"
import { articlesDATA } from "@/data/articles_data"
import { ArticleCard } from "@/components/ui/ArticleCard"
import { Header } from "@/components/ui/Header"
import { Paginationdown } from "@/components/ui/Paginationdown"
import Footer from "@/components/ui/Footer"
import DescriptionUnderPagination from "@/components/sections/DescriptionUnderPagination"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  // 📱 responsive items per page
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(3)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4)
      } else {
        setItemsPerPage(6)
      }
    }

    update()
    window.addEventListener("resize", update)

    return () => window.removeEventListener("resize", update)
  }, [])

  // 🔄 reset page when layout changes
  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage])

  // 📊 total pages (always safe)
  const totalPages = Math.max(
    1,
    Math.ceil(articlesDATA.length / itemsPerPage)
  )

  // 🛡 protect against invalid page
  const safePage = Math.min(currentPage, totalPages)

  const startIndex = (safePage - 1) * itemsPerPage

  const currentItems = articlesDATA.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentPage={setCurrentPage} />

      <div className="flex-1">
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 lg:mx-10">
          {currentItems.map((item) => (
            <ArticleCard
              key={item.slug}
              title={item.title}
              author={item.author}
              description={item.description}
              id={item.id}
              slug={item.slug}
            />
          ))}
        </div>

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