import Link from "next/link";

export default function Header() {
  return (
    <header className="border-border-default text-text-primary fixed top-0 left-0 z-50 flex h-25 w-full items-center justify-between border-b border-solid bg-white px-15">
      <Link href="/" className="text-brand-logo">
        pengbutt*
      </Link>
      <nav className="text-body-md flex items-center gap-15">
        <Link href="/about">ABOUT</Link>
        <Link href="/blog">BLOG</Link>
        <Link href="/projects">PROJECTS</Link>
      </nav>
    </header>
  );
}
