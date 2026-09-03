import { navLinks, site } from "@/content/site";

export default function Footer() {
  return (
    <footer data-surface="dark" className="border-t border-line bg-canvas">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={`/${link.href}`}
                className="text-[0.72rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
