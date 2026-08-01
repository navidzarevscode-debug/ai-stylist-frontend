"use client";

import { useRouter } from "next/navigation";
import { Palette, ChevronLeft } from "lucide-react";

interface StyleMatchTriggerProps {
  productId: number;
}

export default function StyleMatchTrigger({ productId }: StyleMatchTriggerProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/chat?productId=${productId}`)}
      className="group relative w-full flex items-center justify-start rounded-2xl bg-gradient-to-l from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/40 pl-10 pr-3 py-2.5 text-right shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-amber-200 dark:hover:border-amber-800"
    >
      <ChevronLeft
        size={18}
        className="absolute left-4 text-amber-300 dark:text-amber-700 shrink-0 transition-transform group-hover:-translate-x-0.5"
      />

      <div className="flex items-center justify-start gap-3 text-right">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
          <Palette size={18} />
        </span>

        <div>
          <p className="text-sm font-bold text-neutral-900 dark:text-white">
            ست کردن هوشمند با این لباس
          </p>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
            بر اساس سلیقه و مشخصات تو، بهترین ست رو پیشنهاد می‌دیم
          </p>
        </div>
      </div>
    </button>
  );
}