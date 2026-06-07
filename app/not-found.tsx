import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-gray-400">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
        Page not found
      </h1>
      <p className="mt-4 text-gray-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Back home
      </Link>
    </div>
  )
}