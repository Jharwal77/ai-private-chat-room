export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 text-gray-500 text-sm">
      <span>Sanjana typing</span>
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-100">.</span>
      <span className="animate-bounce delay-200">.</span>
    </div>
  );
}