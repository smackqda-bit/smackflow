import { MDXContent } from "@/components/mdx/mdx-content"
import Footer from "@/components/ui/Footer"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MDXContent>
        {children}
      </MDXContent>
      <Footer/>
    </div>
    )
}