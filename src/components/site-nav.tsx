import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/report-sample", label: "Sample report" },
  { href: "/research", label: "Research" },
  { href: "/submit-model", label: "Submit model" },
];

export function SiteNav({ current = "/" }: { current?: string }) {
  return (
    <header className="nav-wrap">
      <nav className="container nav" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Solace Robotics Home">
          Solace Robotics
        </Link>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.href === current ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
