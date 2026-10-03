import { changelog, changeTypes } from "@/data/changelog";
import { formatDate } from "@/lib/format";
import Box from "@/components/ui/Box";
import Badge from "@/components/ui/Badge";
import { tableClass, tdClass, thClass } from "@/components/ui/styles";

export const metadata = { title: "Changelog" };

export default function ChangelogPage() {
  const entries = [...changelog].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Box title="Changelog">
      <div className="overflow-x-auto">
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={`${thClass} w-28`}>Data</th>
              <th className={`${thClass} w-28`}>Tipo</th>
              <th className={thClass}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => {
              const t = changeTypes[e.type];
              return (
                <tr key={i} className="even:bg-parchment-dark/40">
                  <td className={`${tdClass} whitespace-nowrap`}>{formatDate(e.date)}</td>
                  <td className={tdClass}>
                    <Badge label={t.label} className={t.className} />
                  </td>
                  <td className={tdClass}>{e.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Box>
  );
}
