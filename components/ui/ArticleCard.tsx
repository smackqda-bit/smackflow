import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Iarticle } from "@/interfaces/article_interface"
import Link from "next/link"

const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date)
}
export function ArticleCard({title, author, description, slug, date}:Iarticle) {
  return (
    <Card size="sm"  className="mx-auto w-full   ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
        {author}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {description}
        </p>
      </CardContent>
      <CardFooter>
      <div className="flex justify-between items-center w-full">
        <Link href={`/blog/${slug}`}>
          <Button variant="outline" size="sm" className="rounded-[10px]">
            Читать
          </Button>
        </Link>

        <p className="text-muted-foreground">{formatDate(date)}</p>
      </div>
</CardFooter>
    </Card>
  )
}
