// app/page.tsx
import Link from 'next/link';

async function getCoins() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1',
    { next: { revalidate: 3600 } }
  );
  return res.json();
}

export default async function HomePage() {
  const coins = await getCoins();

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Top 10 Cryptos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {coins.map((coin) => (
          <Link key={coin.id} href={`/coin/${coin.id}`}>
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center space-x-4">
                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                <div>
                  <h2 className="text-lg font-semibold">{coin.name}</h2>
                  <p className="text-sm text-gray-500">Symbol: {coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p className="mt-4 text-green-600 font-bold">
                ${coin.current_price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
