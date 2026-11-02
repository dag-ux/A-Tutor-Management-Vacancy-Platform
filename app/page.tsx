// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navbar */}
      <header className="w-full max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-900 tracking-tight">A+ Tutor</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-indigo-600 font-medium hover:text-indigo-800">
            Sign In
          </Link>
          <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 max-w-3xl leading-tight">
          Find the perfect tutor or the perfect student.
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl">
          A+ Tutor Management connects parents with qualified tutors. 
          Whether you need help for your child or want to find tutoring opportunities, we have you covered.
        </p>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
          {/* Parent Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center hover:shadow-xl transition">
            <div className="bg-blue-100 p-4 rounded-full mb-4 text-3xl">👨‍👩‍👧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">I am a Parent</h3>
            <p className="text-gray-600 text-center mb-6">Request a tutor for your child and manage applications easily.</p>
            <Link href="/login" className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Find a Tutor
            </Link>
          </div>

          {/* Tutor Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center hover:shadow-xl transition">
            <div className="bg-green-100 p-4 rounded-full mb-4 text-3xl">🎓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">I am a Tutor</h3>
            <p className="text-gray-600 text-center mb-6">Create your profile, browse vacancies, and apply for jobs.</p>
            <Link href="/login" className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
              Find Students
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}