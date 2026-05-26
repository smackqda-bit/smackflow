import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ slug: "ai-for-accountants" }, { slug: "ai-for-accountants" }];
}

export default async function Page({params,}: {params: Promise<{ slug: string }>;}) {

  const { slug } = await params;

  try {
    const { default: Article } = await import(
      `@/content/markdown/${slug}.mdx`
    );

    return (
      <div className="prose prose-lg mx-auto dark:prose-invert">
        <Article />
      </div>
    );
  } catch (e) {
    return notFound();
  }
}