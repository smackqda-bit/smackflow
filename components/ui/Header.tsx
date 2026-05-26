import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

interface Props {
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export function Header({ setCurrentPage }: Props) {
  return (
    <div id="header" className="mx-5 lg:mx-10 py-3 ">
      <div className="flex justify-between items-center gap-5">
        
        <Link
          href="/"
          onClick={() => setCurrentPage(1)}
        >
          <p className="font-extralight cursor-pointer">
            SmackFlow
          </p>
        </Link>

        <div className="flex items-center gap-2">
          <Input
            id="search"
            placeholder="Введите для поиска..."
          />

          <Button
            variant="outline"
            className="rounded-[10px]"
          >
            Поиск
          </Button>
        </div>
      </div>
    </div>
  )
}