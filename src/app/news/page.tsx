import Link from "next/link";
import { getNews, newsCategories } from "@/data/news";
import { formatDate } from "@/lib/format";
import Box from "@/components/ui/Box";
import Badge from "@/components/ui/Badge";
import NewsContent from "@/components/NewsContent";
import { linkClass } from "@/components/ui/styles";

export const metadata = { title: "Notícias" };

export default function NewsPage() {
  const all = getNews();
  const featured = all.filter((n) => n.featured);

  return (
    <>
      <Box title="Últimas atualizações">
        <ul className="divide-y divide-parchment-dark">
          {all.map((post) => {
            const cat = newsCategories[post.category];
            return (
              <li key={post.slug} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-3">
                <div className="flex shrink-0 items-center gap-2 sm:w-44">
                  <Badge label={cat.label} className={cat.className} />
                  <span className="text-xs text-stone-600">{formatDate(post.date)}</span>
                </div>
                <div className="min-w-0">
                  <Link href={`/news/${post.slug}`} className={linkClass}>
                    {post.title}
                  </Link>
                  <p className="text-sm text-stone-700">{post.summary}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Box>

      {featured.map((post) => (
        <Box key={post.slug} title={post.title}>
          <p className="mb-3 text-xs text-stone-600">
            {formatDate(post.date)} · por {post.author}
          </p>
          <NewsContent blocks={post.content} />
        </Box>
      ))}
    </>
  );
}
