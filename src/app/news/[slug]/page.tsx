import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, news, newsCategories } from "@/data/news";
import { formatDate } from "@/lib/format";
import Box from "@/components/ui/Box";
import Badge from "@/components/ui/Badge";
import NewsContent from "@/components/NewsContent";
import { linkClass } from "@/components/ui/styles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getNewsBySlug((await params).slug);
  return { title: post?.title ?? "Notícia não encontrada" };
}

export default async function NewsPostPage({ params }: Props) {
  const post = getNewsBySlug((await params).slug);
  if (!post) notFound();
  const cat = newsCategories[post.category];

  return (
    <Box title={post.title}>
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-stone-600">
        <Badge label={cat.label} className={cat.className} />
        <span>
          {formatDate(post.date)} · por {post.author}
        </span>
      </div>
      <NewsContent blocks={post.content} />
      <Link href="/news" className={`${linkClass} mt-6 inline-block text-sm`}>
        « Voltar para as notícias
      </Link>
    </Box>
  );
}
