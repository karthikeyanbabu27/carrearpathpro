import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function QuizStartPage() {
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   redirect('/login')
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-200 rounded-full opacity-20"></div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 relative z-10">
            Career Path Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
            Discover your perfect career match with our comprehensive assessment
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <h2 className="text-2xl font-bold text-white text-center">
              Test Instructions
            </h2>
          </div>
          
          {/* Content */}
          <div className="p-8 sm:p-10">
            <div className="space-y-6">
              {/* Instruction items with icons */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">20 Multiple-Choice Questions</p>
                  <p className="text-gray-600">Carefully crafted questions to assess your skills and interests</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">30 Minute Time Limit</p>
                  <p className="text-gray-600">Complete the assessment in one sitting for best results</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Personalized Results</p>
                  <p className="text-gray-600">Get customized course recommendations based on your answers</p>
                </div>
              </div>
            </div>

            {/* Start button with animation */}
            <div className="mt-12 text-center">
              <Link href="/quiz/1">
                <button className="relative px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Start Assessment
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 rounded-full bg-blue-300 animate-ping"></span>
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 rounded-full bg-blue-400"></span>
                </button>
              </Link>
              
              <p className="mt-4 text-sm text-gray-500">
                By starting, you agree to our terms of service
              </p>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact our support team</Link></p>
        </div>
      </div>
    </div>
  )
}