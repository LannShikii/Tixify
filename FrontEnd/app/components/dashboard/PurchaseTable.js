

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STATUS_STYLE = {
  Lunas: "bg-gray-900 text-white",
  Menunggu: "bg-gray-200 text-gray-700",
  Dibatalkan: "bg-gray-100 text-gray-400 line-through",
};

export default function PurchaseTable({ rows }) {
  return (
    <section className="flex flex-1 flex-col rounded-3xl border border-gray-200 bg-white">
      <header className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-gray-800">
          Tanggal Users Membeli dan Tanggal Jadwal Konser
        </h2>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Konser</th>
              <th className="px-6 py-3 font-medium">Tgl. Pembelian</th>
              <th className="px-6 py-3 font-medium">Tgl. Konser</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-100 text-gray-700 hover:bg-gray-50"
              >
                <td className="px-6 py-3.5">
                  <div className="font-medium text-gray-800">{row.userName}</div>
                  <div className="text-xs text-gray-400">{row.id}</div>
                </td>
                <td className="px-6 py-3.5">{row.concertName}</td>
                <td className="px-6 py-3.5 text-gray-500">
                  {formatDate(row.purchaseDate)}
                </td>
                <td className="px-6 py-3.5 text-gray-500">
                  {formatDate(row.concertDate)}
                </td>
                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}