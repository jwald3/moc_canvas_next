import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">Could not find the requested resource</p>
        <Link 
          href="/"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 