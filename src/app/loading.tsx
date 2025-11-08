// app/loading.jsx
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent opacity-60"></div>
    </div>
  );
}
