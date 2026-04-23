import { Coffee, Feather, Github, Rss } from "lucide-react"

export function Footer() {
  return (
    <footer
      id="newsletter"
      className="border-t border-ink-200 bg-paper mt-24"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Feather className="h-6 w-6" />
            <span className="text-lg font-semibold">Quillora</span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/AVA-NTHIKA14/Quillora"
              className="text-ink-600 hover:text-ink-950"
              aria-label="Quillora on GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={20} />
            </a>
            <a
              href="https://buymeacoffee.com/avanthika.k.s"
              className="text-ink-600 hover:text-ink-950"
              aria-label="Support Quillora on Buy Me a Coffee"
              target="_blank"
              rel="noreferrer"
            >
              <Coffee size={20} />
            </a>
            <a
              href="/feed.xml"
              className="text-ink-600 hover:text-ink-950"
              aria-label="RSS feed"
            >
              <Rss size={20} />
            </a>
          </div>
        </div>
        <p className="text-sm text-ink-600">
          &copy; {new Date().getFullYear()} Quillora. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
