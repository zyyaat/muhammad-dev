import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import CaseStudy from "@/components/portfolio/CaseStudy";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Project not found" };
  return {
    title: `${cs.title} — Case Study | MUHAMMAD`,
    description: cs.tagline,
    openGraph: {
      title: `${cs.title} — Case Study | MUHAMMAD`,
      description: cs.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  return <CaseStudy data={cs} />;
}
