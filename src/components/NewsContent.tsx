import type { NewsBlock } from "@/data/news";

export default function NewsContent({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div className="space-y-3 leading-relaxed">
      {blocks.map((block, i) => {
        if (block.type === "h3")
          return (
            <h3 key={i} className="pt-2 font-display text-lg font-bold text-wood">
              {block.text}
            </h3>
          );
        if (block.type === "ul")
          return (
            <ul key={i} className="list-disc space-y-1 pl-6 marker:text-blood">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        return <p key={i}>{block.text}</p>;
      })}
    </div>
  );
}
