"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface Props {
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export function Header({ setCurrentPage }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlQuery = searchParams.get("query") || ""
  const [value, setValue] = useState(urlQuery)

  // sync input with URL
  useEffect(() => {
    setValue(urlQuery)
  }, [urlQuery])

  const handleSearch = () => {
    setCurrentPage(1)

    if (!value.trim()) {
      router.push("/")
      return
    }

    router.push(`/?query=${encodeURIComponent(value)}`)
  }

  return (
    <div id="header" className="mx-5 lg:mx-10 py-3">
      <div className="flex justify-between items-center gap-5">

        <Link href="/" onClick={() => setCurrentPage(1)}>
          <p className="font-extralight cursor-pointer text-lg">
            SmackFlow
          </p>
        </Link>

        <div className="flex items-center gap-2">

          <Input
            placeholder="Введите для поиска..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
          />

          <Button
            variant="outline"
            className="rounded-[10px]"
            onClick={handleSearch}
          >
            Поиск
          </Button>

        </div>
      </div>
    </div>
  )
}