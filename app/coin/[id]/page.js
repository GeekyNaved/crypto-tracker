export default async function CoinDetailPage({ params }) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`, {
    cache: 'no-store',
  });
  const coin = await res.json();
  console.log('coin', coin)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <h1 className="text-3xl font-bold">{coin.name}</h1>
        </div>

        <div className="mt-4 space-y-2">
          <p>
            <span className="font-medium">Symbol:</span> {coin.symbol.toUpperCase()}
          </p>
          <p>
            <span className="font-medium">Current Price:</span> $
            {coin.market_data.current_price.usd.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Market Cap Rank:</span> #{coin.market_cap_rank}
          </p>
        </div>
      </div>
    </div>
  );
}