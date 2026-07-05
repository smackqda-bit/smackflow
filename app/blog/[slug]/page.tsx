import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articlesDATA } from "@/data/articles_data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/ui/Footer";

export const dynamicParams = false;

export async function generateStaticParams() {
  return articlesDATA.map((a) => ({
    slug: a.slug,
  }));
}

/* SEO ДЛЯ СТАТЕЙ */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const articleMeta = articlesDATA.find((a) => a.slug === slug);

  if (!articleMeta) {
    return {
      title: "Статья не найдена",
      description: "Запрашиваемая статья не существует",
    };
  }

  const title = articleMeta.title;


  const description = articleMeta.description;
  const url = `https://smackflow.space/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "SmackFlow",
      publishedTime: articleMeta.date,
      
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      
    },
     keywords: [
    "AI",
    "нейросети",
    "искусственный интеллект",
    "ChatGPT",
    "автоматизация",
    "гайды",
  ],
  };
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date)
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const articleMeta = articlesDATA.find((a) => a.slug === slug);

  if (!articleMeta) {
    notFound();
  }

  try {
    const { default: Article } = await import(
      `@/content/markdown/${slug}.mdx`
    );

    return (
      <div>
      <main className="mx-auto px-5 lg:px-10   py-6  md:py-12 " id="header">
        {/* HEADER */}
        <header className="mb-12 border-b border-white pb-8" >
          <div className="flex justify-between items-center">
            <span className="inline-flex rounded-full border border-white px-3 py-1 text-sm text-muted-foreground">
              {articleMeta.tag}
            </span>

            <Link href="/">
              <Button variant="outline" size="sm" className="rounded-[10px]">
                Вернуться назад
              </Button>
            </Link>
          </div>

          <h1 className="mt-6 text-3xl sm:text-5xl font-semibold text-white">
            {articleMeta.title}
          </h1>

          <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
            {articleMeta.description}
          </p>
          <div className="flex justify-between items-center mt-8 text-sm text-muted-foreground">
            <div >
              {articleMeta.author}
            </div>
            <p>{formatDate(articleMeta.date)}</p>
          </div>
        </header>

        {/* MDX CONTENT */}
        <Article />
        <div className="flex justify-start items-center gap-5">
          <Link href="/">
            <Button variant="outline" size="sm" className="rounded-[10px]">
                Вернуться назад
            </Button>
          </Link>
          <Link href={'#header'}>
            <Button  variant="outline" size="sm" className="rounded-[10px]">Вверх</Button>
          </Link>
          
          </div>
      </main>
      <Footer/>
      </div>
    );
  } catch {
    notFound();
  }
}