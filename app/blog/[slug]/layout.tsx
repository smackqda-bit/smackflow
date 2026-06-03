import { MDXContent } from "@/components/mdx/mdx-content"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MDXContent>
        {children}
      </MDXContent>
    </div>
    )
}