import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-25 w-full items-center justify-between border-b border-solid border-border-default px-15 text-text-primary">
      <Link href="/" className="text-brand-logo">
        pengbutt
      </Link>
      <nav className="flex items-center gap-15 text-body-md">
        <Link href="/about">ABOUT</Link>
        <Link href="/blog">BLOG</Link>
        <Link href="/projects">PROJECTS</Link>
      </nav>
    </header>
  );
}
