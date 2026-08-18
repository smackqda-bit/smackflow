import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Dispatch, SetStateAction } from "react"
interface Props {
  currentPage: number
  totalPages: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export function Paginationdown({ currentPage, totalPages, setCurrentPage }: Props) {
  const visiblePagesCount = Math.min(3, totalPages)
  const firstVisiblePage = Math.min(
    Math.max(currentPage - 1, 1),
    totalPages - visiblePagesCount + 1
  )
  const visiblePages = Array.from(
    { length: visiblePagesCount },
    (_, index) => firstVisiblePage + index
  )

  return (
    <Pagination>
      <PaginationContent>

        <PaginationItem>
  <PaginationPrevious
  text="Назад"
  onClick={(e) => {
    e.preventDefault()
    setCurrentPage((p) => Math.max(p - 1, 1))
  }}
  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
/>
</PaginationItem>

        {visiblePages.map((page) => {
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
          className={
  currentPage === totalPages
    ? "pointer-events-none opacity-50"
    : ""
}
  text="Вперед"
  onClick={(e) => {
    e.preventDefault()
    setCurrentPage((p) => Math.min(p + 1, totalPages))
  }}
/>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
