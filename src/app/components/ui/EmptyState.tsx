export default function EmptyState({ message }: { message: string }) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12 gap-3">
        <span className="text-4xl">🔍</span>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{message}</p>
      </div>
    );
  }