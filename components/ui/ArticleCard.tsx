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
export function ArticleCard({title, author, description, slug}:Iarticle) {
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
        <Link href={`/blog/${slug}`}>
            <Button variant="outline" size="sm" className="w-full rounded-[10px]">
            Читать
            </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
