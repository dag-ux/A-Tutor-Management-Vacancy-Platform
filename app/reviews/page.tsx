// app/reviews/page.tsx
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";
import WriteReviewModal from "../components/WriteReviewModal";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <PublicNavbar />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Community Reviews</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8">Read what parents and graduates say about A+ Tutor.</p>
          <WriteReviewModal />
        </div>

        {reviews.length === 0 ? (
          <div className="text-center p-16 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 border-dashed">
            <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
            <p className="text-zinc-500">Be the first to share your experience with the community!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                <div className="flex text-[#069494] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-[#069494]" : "text-zinc-300 dark:text-zinc-700"} />
                  ))}
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 mb-6 text-lg">"{review.comment}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#069494] to-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">{review.userName}</h4>
                    <p className="text-sm text-zinc-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}