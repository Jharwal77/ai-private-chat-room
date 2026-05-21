export default function LoveMeter({ messages }) {

  const loveScore = Math.min(messages.length * 2, 100);

  return (
    <div className="p-2">
      <div className="text-xs text-gray-500">Love Meter ❤️</div>

      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
        <div
          className="h-2 bg-pink-500 rounded-full"
          style={{ width: `${loveScore}%` }}
        />
      </div>

      <div className="text-xs">{loveScore}% love</div>
    </div>
  );
}