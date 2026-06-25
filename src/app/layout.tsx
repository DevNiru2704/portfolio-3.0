import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteProviders } from "@/providers/site-providers";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { owner } from "@/config/owner";
import { projectRepository } from "@/repositories/project-repository";
import type { Project } from "@/types/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(owner.url),
  title: {
    default: `${owner.name} — ${owner.role}`,
    template: `%s · ${owner.name}`,
  },
  description: owner.tagline,
  keywords: [...owner.keywords],
  authors: [{ name: owner.name, url: owner.url }],
  creator: owner.name,
  openGraph: {
    type: "website",
    url: owner.url,
    title: `${owner.name} — ${owner.role}`,
    description: owner.tagline,
    siteName: `${owner.name} · ${owner.brand.productLine}`,
    images: [{ url: owner.ogImage, width: 1200, height: 630, alt: owner.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${owner.name} — ${owner.role}`,
    description: owner.tagline,
    creator: owner.twitterHandle,
    images: [owner.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#090909" },
  ],
  width: "device-width",
  initialScale: 1,
};

async function getPaletteProjects(): Promise<Project[]> {
  try {
    return await projectRepository.findAll();
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const projects = await getPaletteProjects();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="font-display bg-background text-foreground min-h-screen antialiased">
        <SiteProviders projects={projects}>
          <div className="relative flex min-h-screen flex-col">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </SiteProviders>
      </body>
    </html>
  );
}
