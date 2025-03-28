import { getServerSession } from 'next-auth'
import { authOptions } from './lib/auth'
import Link from 'next/link'


export default async function Home() {
  // const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-black">
            'Career Path Assessment'
          </h1>
         
          
          <Link href={"/quiz/start"}>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xl font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Take Test Now
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}