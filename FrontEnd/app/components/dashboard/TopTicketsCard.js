// components/dashboard/TopTicketsCard.jsx

export default function TopTicketsCard({ data }) {
  const max = Math.max(...data.map((d) => d.ticketsSold));

  return (
    <section className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white">
      <header className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-gray-800">
          Pembelian Tiket Terbanyak
        </h2>
        <p className="text-xs text-gray-400">Berdasarkan jumlah tiket terjual</p>
      </header>

      <div className="flex flex-1 flex-col justify-center gap-4 px-6 py-5">
        {data.map((concert, i) => (
          <div key={concert.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="truncate text-sm font-medium text-gray-700">
                <span className="mr-2 text-gray-400">{i + 1}.</span>
                {concert.name}
              </span>
              <span className="shrink-0 text-xs font-semibold text-gray-500">
                {concert.ticketsSold.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-700"
                style={{ width: `${(concert.ticketsSold / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}