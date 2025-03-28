'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

// Mock questions data
const questions = [
    {
      id: 1,
      text: "Which activity interests you the most?",
      options: [
        { id: 1, text: "Solving complex problems" },
        { id: 2, text: "Designing creative solutions" },
        { id: 3, text: "Helping others" },
        { id: 4, text: "Analyzing data" }
      ]
    },
    {
      id: 2,
      text: "What type of work environment do you prefer?",
      options: [
        { id: 1, text: "Structured and organized" },
        { id: 2, text: "Flexible and dynamic" },
        { id: 3, text: "Team-oriented and collaborative" },
        { id: 4, text: "Independent and self-directed" }
      ]
    },
    {
      id: 3,
      text: "Which skill comes most naturally to you?",
      options: [
        { id: 1, text: "Logical reasoning" },
        { id: 2, text: "Visual design" },
        { id: 3, text: "Communication" },
        { id: 4, text: "Research and analysis" }
      ]
    },
    {
      id: 4,
      text: "How do you prefer to learn new things?",
      options: [
        { id: 1, text: "Through hands-on practice" },
        { id: 2, text: "By exploring creative possibilities" },
        { id: 3, text: "Through discussion and interaction" },
        { id: 4, text: "By studying theories and concepts" }
      ]
    },
    {
      id: 5,
      text: "Which of these tasks would you enjoy most?",
      options: [
        { id: 1, text: "Debugging a computer program" },
        { id: 2, text: "Creating a marketing campaign" },
        { id: 3, text: "Teaching someone a new skill" },
        { id: 4, text: "Conducting a scientific experiment" }
      ]
    },
    {
      id: 6,
      text: "What type of projects excite you?",
      options: [
        { id: 1, text: "Building technical systems" },
        { id: 2, text: "Developing artistic works" },
        { id: 3, text: "Improving people's lives" },
        { id: 4, text: "Solving scientific mysteries" }
      ]
    },
    {
      id: 7,
      text: "Which subject did you enjoy most in school?",
      options: [
        { id: 1, text: "Mathematics" },
        { id: 2, text: "Art/Design" },
        { id: 3, text: "Psychology/Sociology" },
        { id: 4, text: "Biology/Chemistry" }
      ]
    },
    {
      id: 8,
      text: "How do you approach problems?",
      options: [
        { id: 1, text: "Systematically, step-by-step" },
        { id: 2, text: "Intuitively, thinking outside the box" },
        { id: 3, text: "By consulting with others" },
        { id: 4, text: "Through careful observation and analysis" }
      ]
    },
    {
      id: 9,
      text: "Which of these careers appeals to you most?",
      options: [
        { id: 1, text: "Software Engineer" },
        { id: 2, text: "Graphic Designer" },
        { id: 3, text: "Social Worker" },
        { id: 4, text: "Research Scientist" }
      ]
    },
    {
      id: 10,
      text: "What's your preferred way to spend free time?",
      options: [
        { id: 1, text: "Building or fixing things" },
        { id: 2, text: "Creating art or music" },
        { id: 3, text: "Volunteering or community service" },
        { id: 4, text: "Reading scientific articles" }
      ]
    },
    {
      id: 11,
      text: "Which of these is most important to you in a job?",
      options: [
        { id: 1, text: "Intellectual challenge" },
        { id: 2, text: "Creative freedom" },
        { id: 3, text: "Helping others" },
        { id: 4, text: "Discovering new knowledge" }
      ]
    },
    {
      id: 12,
      text: "How would friends describe your strengths?",
      options: [
        { id: 1, text: "Analytical and detail-oriented" },
        { id: 2, text: "Imaginative and original" },
        { id: 3, text: "Compassionate and supportive" },
        { id: 4, text: "Curious and investigative" }
      ]
    },
    {
      id: 13,
      text: "Which type of book would you choose?",
      options: [
        { id: 1, text: "Technology and innovation" },
        { id: 2, text: "Art and design" },
        { id: 3, text: "Human relationships" },
        { id: 4, text: "Scientific discoveries" }
      ]
    },
    {
      id: 14,
      text: "What kind of challenges do you enjoy?",
      options: [
        { id: 1, text: "Technical puzzles" },
        { id: 2, text: "Creative blocks" },
        { id: 3, text: "Social conflicts" },
        { id: 4, text: "Research questions" }
      ]
    },
    {
      id: 15,
      text: "Which work outcome is most satisfying?",
      options: [
        { id: 1, text: "A functional, well-built system" },
        { id: 2, text: "A beautiful, innovative design" },
        { id: 3, text: "A positive impact on people" },
        { id: 4, text: "A new discovery or insight" }
      ]
    },
    {
      id: 16,
      text: "What type of tools do you prefer using?",
      options: [
        { id: 1, text: "Programming languages" },
        { id: 2, text: "Design software" },
        { id: 3, text: "Communication platforms" },
        { id: 4, text: "Scientific instruments" }
      ]
    },
    {
      id: 17,
      text: "Which of these values resonates most with you?",
      options: [
        { id: 1, text: "Efficiency" },
        { id: 2, text: "Innovation" },
        { id: 3, text: "Empathy" },
        { id: 4, text: "Knowledge" }
      ]
    },
    {
      id: 18,
      text: "What type of presentation would you prefer to give?",
      options: [
        { id: 1, text: "Technical demonstration" },
        { id: 2, text: "Creative pitch" },
        { id: 3, text: "Motivational talk" },
        { id: 4, text: "Research findings" }
      ]
    },
    {
      id: 19,
      text: "How do you make important decisions?",
      options: [
        { id: 1, text: "Using logical analysis" },
        { id: 2, text: "Following my intuition" },
        { id: 3, text: "Considering others' perspectives" },
        { id: 4, text: "Reviewing available evidence" }
      ]
    },
    {
      id: 20,
      text: "Which of these would you most like to develop?",
      options: [
        { id: 1, text: "Technical expertise" },
        { id: 2, text: "Creative skills" },
        { id: 3, text: "Interpersonal abilities" },
        { id: 4, text: "Research capabilities" }
      ]
    }
  ]

export default function QuizQuestionPage() {
//   const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const questionId = parseInt(params.id)
  
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState({})

//   if (status === 'loading') return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="animate-pulse text-xl">Loading...</div>
//     </div>
//   )
  
//   if (!session) {
//     router.push('/login')
//     return null
//   }

  const currentQuestion = questions.find(q => q.id === questionId)
  
  if (!currentQuestion) {
    router.push('/quiz/results')
    return null
  }

  const handleNext = () => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }))
    
    if (questionId < questions.length) {
      router.push(`/quiz/${questionId + 1}`)
    } else {
      router.push('/quiz/results')
    }
    
    setSelectedOption(null)
  }

  // Calculate progress percentage
  const progress = Math.round((questionId / questions.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {questionId} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {progress}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 leading-tight">
            {currentQuestion.text}
          </h2>
          
          {/* Options grid */}
          <div className="grid gap-3 mb-8">
            {currentQuestion.options.map(option => (
              <div 
                key={option.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedOption === option.id 
                    ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                    selectedOption === option.id 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">{option.text}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            {questionId > 1 ? (
              <Link 
                href={`/quiz/${questionId - 1}`}
                className="px-5 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
              >
                ← Previous
              </Link>
            ) : (
              <div></div>
            )}
            
            <button 
              onClick={handleNext}
              disabled={!selectedOption}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedOption 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {questionId < questions.length ? 'Next Question →' : 'Finish Test'}
            </button>
          </div>
        </div>

        {/* Test info footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Take your time - you can always go back to previous questions</p>
        </div>
      </div>
    </div>
  )
}