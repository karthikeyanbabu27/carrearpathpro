'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Course recommendations by category
const courseRecommendations = {
  technical: [
    {
      id: 1,
      title: "Computer Science Fundamentals",
      description: "Master programming basics and algorithms",
      category: "Technical",
      level: "Beginner",
      duration: "8 weeks"
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      description: "Build complete web applications from scratch",
      category: "Technical",
      level: "Intermediate",
      duration: "12 weeks"
    }
  ],
  creative: [
    {
      id: 3,
      title: "Graphic Design Masterclass",
      description: "Learn professional design principles and tools",
      category: "Creative",
      level: "Beginner",
      duration: "6 weeks"
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      description: "Develop effective marketing campaigns",
      category: "Creative",
      level: "Intermediate",
      duration: "8 weeks"
    }
  ],
  social: [
    {
      id: 5,
      title: "Counseling Psychology",
      description: "Learn techniques for helping others",
      category: "Social",
      level: "Beginner",
      duration: "10 weeks"
    },
    {
      id: 6,
      title: "Educational Leadership",
      description: "Develop skills for teaching and mentoring",
      category: "Social",
      level: "Intermediate",
      duration: "12 weeks"
    }
  ],
  analytical: [
    {
      id: 7,
      title: "Data Science Essentials",
      description: "Master data analysis and visualization",
      category: "Analytical",
      level: "Intermediate",
      duration: "10 weeks"
    },
    {
      id: 8,
      title: "Research Methodology",
      description: "Learn scientific research techniques",
      category: "Analytical",
      level: "Advanced",
      duration: "8 weeks"
    }
  ]
}

export default function QuizResultsPage() {
//   const { data: session, status } = useSession()
  const router = useRouter()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recommendedCourses, setRecommendedCourses] = useState([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    // Simulate calculating results (in a real app, this would come from your backend)
    const calculateResults = () => {
      setTimeout(() => {
        // This is mock data - replace with actual calculation based on user answers
        const mockResult = {
          score: 82,
          primaryCategory: 'technical',
          secondaryCategory: 'analytical',
          strengths: ['Problem-solving', 'Logical reasoning', 'Attention to detail']
        }
        
        setResult(mockResult)
        
        // Get recommended courses
        const primaryCourses = courseRecommendations[mockResult.primaryCategory]
        const secondaryCourses = courseRecommendations[mockResult.secondaryCategory]
        setRecommendedCourses([...primaryCourses, ...secondaryCourses])
        
        setLoading(false)
      }, 1500) // Simulate loading delay
    }

    calculateResults()
  }, [status, router])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700">Analyzing your results...</h2>
          <p className="text-gray-500">We're determining the best courses for you</p>
        </div>
      </div>
    )
  }

  if (!result) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Results header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Career Assessment Results
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your answers, we've identified the best career paths and courses for you
          </p>
        </div>

        {/* Score and summary */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
              <div className="mb-6 sm:mb-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Compatibility Score</h2>
                <p className="text-gray-600">How well your skills match different career paths</p>
              </div>
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${result.score}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">{result.score}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Your Top Strengths</h3>
              <div className="flex flex-wrap gap-3">
                {result.strengths.map((strength, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
            Recommended Courses For You
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      course.category === 'Technical' ? 'bg-blue-100 text-blue-800' :
                      course.category === 'Creative' ? 'bg-purple-100 text-purple-800' :
                      course.category === 'Social' ? 'bg-green-100 text-green-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {course.category}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{course.level}</span>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">1. Explore Courses</h3>
              <p className="text-sm text-gray-700">Browse through our recommended courses and find one that matches your interests.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">2. Talk to an Advisor</h3>
              <p className="text-sm text-gray-700">Schedule a free consultation with our career advisors.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">3. Start Learning</h3>
              <p className="text-sm text-gray-700">Enroll in a course and begin your career journey.</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/courses" 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-center"
          >
            Browse All Courses
          </Link>
          <button 
            onClick={() => router.push('/quiz/start')}
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors shadow-sm text-center"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  )
}