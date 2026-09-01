import { navLinks, site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={`/${link.href}`}
                className="text-sm text-muted transition-colors hover:text-accent"
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
