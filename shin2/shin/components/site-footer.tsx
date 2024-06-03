import { siteConfig } from "@/config/site";
import Link from "next/link";

export function SiteFotter() {
  return (
    <footer>
      <div className="container py-10 md:py-0 md:h-20">
        <p className="text-center text-sm md:text-left">
            built by {''}
            <Link href={siteConfig.links.x} className="underline underline-offset-4 font-medium"
            target='_blank' rel='noreferrer'>Shincode</Link>
            .Hosted on {''}
            <Link href={'https://vercel.com'} className="underline underline-offset-4 font-medium"
            target='_blank' rel='noreferrer'>Vercel</Link>
        </p>
      </div>
    </footer>
  )
}

