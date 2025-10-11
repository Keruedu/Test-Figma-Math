import { useState, useEffect } from 'react'
import type { Question } from '../types'
import { questions } from '../data/questions'

interface GameScreenProps {
  questionIndex: number
  onNextQuestion: () => void
  onFinish: () => void
}

export const GameScreen = ({ questionIndex, onNextQuestion, onFinish }: GameScreenProps) => {
  const [timer, setTimer] = useState(25)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const [textAnswer, setTextAnswer] = useState('')
  const [matchingPairs, setMatchingPairs] = useState<{ left: string; right: string }[]>([])
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [orderedItems, setOrderedItems] = useState<string[]>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const question = questions[questionIndex]
  const totalQuestions = questions.length

  // Initialize ordering question
  useEffect(() => {
    if (question && question.type === 'ordering') {
      setOrderedItems(question.items.map((item) => item.id))
    }
  }, [questionIndex, question])

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !showFeedback) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer, showFeedback])

  const handleAnswerSelect = (answerId: string, isCorrect: boolean) => {
    setSelectedAnswer(answerId)
    setShowFeedback(true)
    if (isCorrect) {
      setCurrentScore((prev) => prev + 100)
    }
    setTimeout(() => {
      if (questionIndex < totalQuestions - 1) {
        handleNext()
      } else {
        onFinish()
      }
    }, 2000)
  }

  const handleTextSubmit = () => {
    setShowFeedback(true)
    if (question.type === 'text-input') {
      const isCorrect = textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
      if (isCorrect) {
        setCurrentScore((prev) => prev + 100)
      }
      setTimeout(() => {
        if (questionIndex < totalQuestions - 1) {
          handleNext()
        } else {
          onFinish()
        }
      }, 2000)
    }
  }

  const handleTrueFalseSelect = (answer: boolean) => {
    setShowFeedback(true)
    if (question.type === 'true-false') {
      const isCorrect = answer === question.correctAnswer
      setSelectedAnswer(answer ? 'true' : 'false')
      if (isCorrect) {
        setCurrentScore((prev) => prev + 100)
      }
      setTimeout(() => {
        if (questionIndex < totalQuestions - 1) {
          handleNext()
        } else {
          onFinish()
        }
      }, 2000)
    }
  }

  const handleMatchingSelect = (leftId: string, rightId: string) => {
    const existingPairIndex = matchingPairs.findIndex((p) => p.left === leftId)
    if (existingPairIndex >= 0) {
      const newPairs = [...matchingPairs]
      newPairs[existingPairIndex] = { left: leftId, right: rightId }
      setMatchingPairs(newPairs)
    } else {
      setMatchingPairs([...matchingPairs, { left: leftId, right: rightId }])
    }
    setSelectedLeft(null)
  }

  const handleMatchingSubmit = () => {
    setShowFeedback(true)
    if (question.type === 'matching') {
      const correctCount = matchingPairs.filter((pair) =>
        question.correctPairs.some((cp) => cp.left === pair.left && cp.right === pair.right)
      ).length
      const isCorrect = correctCount === question.correctPairs.length
      if (isCorrect) {
        setCurrentScore((prev) => prev + 100)
      }
      setTimeout(() => {
        if (questionIndex < totalQuestions - 1) {
          handleNext()
        } else {
          onFinish()
        }
      }, 2000)
    }
  }

  const handleOrderingSubmit = () => {
    setShowFeedback(true)
    if (question.type === 'ordering') {
      const isCorrect = orderedItems.every((itemId, index) => {
        const item = question.items.find((i) => i.id === itemId)
        return item && item.correctOrder === index
      })
      if (isCorrect) {
        setCurrentScore((prev) => prev + 100)
      }
      setTimeout(() => {
        if (questionIndex < totalQuestions - 1) {
          handleNext()
        } else {
          onFinish()
        }
      }, 2000)
    }
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...orderedItems]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)
    setOrderedItems(newItems)
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setShowFeedback(false)
    setTimer(25)
    setTextAnswer('')
    setMatchingPairs([])
    setSelectedLeft(null)
    onNextQuestion()
  }

  if (!question) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-6 animate-fade-slide">
          <div className="bg-white px-6 py-3 rounded-xl shadow-md border border-gray-200">
            <p className="text-gray-900 font-bold text-lg">
              Câu {questionIndex + 1}/{totalQuestions}
            </p>
          </div>
          <div
            className={`bg-white px-8 py-3 rounded-xl border-2 shadow-md ${timer < 10 ? 'border-red-500 animate-pulse' : 'border-gray-300'}`}
          >
            <p className={`font-bold text-2xl ${timer < 10 ? 'text-red-500' : 'text-gray-900'}`}>
              ⏱️ 00:{timer.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-6 py-3 rounded-xl shadow-md">
            <p className="text-white font-bold text-lg">🏆 {currentScore} điểm</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 mb-6 animate-fade-slide animate-delay-200">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-300">
                  <span className="text-xl font-bold text-gray-900">{questionIndex + 1}</span>
                </div>
                <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-[#6E55FB] text-sm font-semibold border border-purple-200">
                  {question.type === 'multiple-choice' && '📝 Trắc nghiệm'}
                  {question.type === 'text-input' && '✍️ Tự luận'}
                  {question.type === 'matching' && '🔗 Ghép cột'}
                  {question.type === 'ordering' && '🔢 Sắp xếp'}
                  {question.type === 'true-false' && '✓✗ Đúng/Sai'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                {question.text}
              </h2>
            </div>
          </div>

          {/* Multiple Choice */}
          {question.type === 'multiple-choice' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {question.answers.map((answer, index) => {
                  const isSelected = selectedAnswer === answer.id
                  const showCorrect = showFeedback && answer.isCorrect
                  const showWrong = showFeedback && isSelected && !answer.isCorrect

                  return (
                    <button
                      key={answer.id}
                      onClick={() => !showFeedback && handleAnswerSelect(answer.id, answer.isCorrect)}
                      disabled={showFeedback}
                      className={`relative p-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95 animate-fade-slide text-left ${
                        showCorrect
                          ? 'bg-green-50 border-2 border-green-500'
                          : showWrong
                            ? 'bg-red-50 border-2 border-red-500'
                            : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-400'
                      } disabled:cursor-not-allowed`}
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-xl font-bold ${
                            showCorrect
                              ? 'text-green-600'
                              : showWrong
                                ? 'text-red-600'
                                : 'text-gray-500'
                          }`}
                        >
                          {answer.id}.
                        </span>
                        <span
                          className={`text-xl font-medium ${
                            showCorrect
                              ? 'text-green-700'
                              : showWrong
                                ? 'text-red-700'
                                : 'text-gray-900'
                          }`}
                        >
                          {answer.text}
                        </span>
                        {showCorrect && (
                          <span className="ml-auto text-2xl">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                              ✓
                            </span>
                          </span>
                        )}
                        {showWrong && (
                          <span className="ml-auto text-2xl">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white">
                              ✗
                            </span>
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {showFeedback && (
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 animate-fade-slide">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Câu trả lời của bạn:{' '}
                      <span
                        className={
                          selectedAnswer &&
                          question.answers.find((a) => a.id === selectedAnswer)?.isCorrect
                            ? 'text-green-600 font-semibold'
                            : 'text-red-600 font-semibold'
                        }
                      >
                        {selectedAnswer}
                      </span>
                    </span>
                    <span className="text-gray-600">
                      Đáp án đúng:{' '}
                      <span className="text-green-600 font-semibold">
                        {question.answers.find((a) => a.isCorrect)?.id}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Text Input */}
          {question.type === 'text-input' && (
            <div className="space-y-6">
              <input
                type="text"
                placeholder={question.placeholder}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={showFeedback}
                className="w-full px-8 py-6 rounded-2xl bg-gray-50 border-2 border-gray-300 text-gray-900 text-2xl text-center placeholder-gray-500 focus:outline-none focus:border-[#6E55FB] transition-all disabled:cursor-not-allowed"
              />
              {!showFeedback && (
                <button
                  onClick={handleTextSubmit}
                  disabled={!textAnswer.trim()}
                  className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✓ Gửi đáp án
                </button>
              )}
              {showFeedback && (
                <div
                  className={`text-center p-6 rounded-2xl ${
                    textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
                      ? 'bg-green-50 border-2 border-green-500'
                      : 'bg-red-50 border-2 border-red-500'
                  }`}
                >
                  <p
                    className={`text-2xl font-bold ${
                      textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
                      ? '🎉 Chính xác!'
                      : `😔 Sai rồi! Đáp án đúng: ${question.correctAnswer}`}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* True/False */}
          {question.type === 'true-false' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <button
                  onClick={() => !showFeedback && handleTrueFalseSelect(true)}
                  disabled={showFeedback}
                  className={`relative p-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 animate-fade-slide ${
                    showFeedback && question.correctAnswer
                      ? 'bg-green-50 border-2 border-green-500'
                      : showFeedback && selectedAnswer === 'true' && !question.correctAnswer
                        ? 'bg-red-50 border-2 border-red-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-400'
                  } disabled:cursor-not-allowed`}
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="text-center">
                    <span
                      className={`text-5xl mb-4 block ${
                        showFeedback && question.correctAnswer
                          ? 'text-green-600'
                          : showFeedback && selectedAnswer === 'true' && !question.correctAnswer
                            ? 'text-red-600'
                            : 'text-gray-900'
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={`text-2xl font-bold ${
                        showFeedback && question.correctAnswer
                          ? 'text-green-700'
                          : showFeedback && selectedAnswer === 'true' && !question.correctAnswer
                            ? 'text-red-700'
                            : 'text-gray-900'
                      }`}
                    >
                      ĐÚNG
                    </span>
                  </div>
                  {showFeedback && question.correctAnswer && (
                    <span className="absolute top-4 right-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-xl">
                        ✓
                      </span>
                    </span>
                  )}
                  {showFeedback && selectedAnswer === 'true' && !question.correctAnswer && (
                    <span className="absolute top-4 right-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white text-xl">
                        ✗
                      </span>
                    </span>
                  )}
                </button>
                <button
                  onClick={() => !showFeedback && handleTrueFalseSelect(false)}
                  disabled={showFeedback}
                  className={`relative p-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 animate-fade-slide ${
                    showFeedback && !question.correctAnswer
                      ? 'bg-green-50 border-2 border-green-500'
                      : showFeedback && selectedAnswer === 'false' && question.correctAnswer
                        ? 'bg-red-50 border-2 border-red-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-400'
                  } disabled:cursor-not-allowed`}
                  style={{ animationDelay: '0.4s' }}
                >
                  <div className="text-center">
                    <span
                      className={`text-5xl mb-4 block ${
                        showFeedback && !question.correctAnswer
                          ? 'text-green-600'
                          : showFeedback && selectedAnswer === 'false' && question.correctAnswer
                            ? 'text-red-600'
                            : 'text-gray-900'
                      }`}
                    >
                      ✗
                    </span>
                    <span
                      className={`text-2xl font-bold ${
                        showFeedback && !question.correctAnswer
                          ? 'text-green-700'
                          : showFeedback && selectedAnswer === 'false' && question.correctAnswer
                            ? 'text-red-700'
                            : 'text-gray-900'
                      }`}
                    >
                      SAI
                    </span>
                  </div>
                  {showFeedback && !question.correctAnswer && (
                    <span className="absolute top-4 right-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-xl">
                        ✓
                      </span>
                    </span>
                  )}
                  {showFeedback && selectedAnswer === 'false' && question.correctAnswer && (
                    <span className="absolute top-4 right-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white text-xl">
                        ✗
                      </span>
                    </span>
                  )}
                </button>
              </div>

              {showFeedback && (
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 animate-fade-slide">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Câu trả lời của bạn:{' '}
                      <span
                        className={
                          selectedAnswer === (question.correctAnswer ? 'true' : 'false')
                            ? 'text-green-600 font-semibold'
                            : 'text-red-600 font-semibold'
                        }
                      >
                        {selectedAnswer === 'true' ? 'ĐÚNG' : 'SAI'}
                      </span>
                    </span>
                    <span className="text-gray-600">
                      Đáp án đúng:{' '}
                      <span className="text-green-600 font-semibold">
                        {question.correctAnswer ? 'ĐÚNG' : 'SAI'}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Matching */}
          {question.type === 'matching' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 px-3 py-1 rounded-lg text-blue-700">Cột A</span>
                  </h3>
                  {question.leftColumn.map((item, index) => {
                    const paired = matchingPairs.find((p) => p.left === item.id)
                    const isSelected = selectedLeft === item.id
                    const showCorrect =
                      showFeedback &&
                      question.correctPairs.some(
                        (cp) => cp.left === item.id && cp.right === paired?.right
                      )
                    const showWrong =
                      showFeedback &&
                      paired &&
                      !question.correctPairs.some(
                        (cp) => cp.left === item.id && cp.right === paired.right
                      )

                    return (
                      <button
                        key={item.id}
                        onClick={() => !showFeedback && setSelectedLeft(isSelected ? null : item.id)}
                        disabled={showFeedback}
                        className={`w-full p-4 rounded-xl transition-all transform hover:scale-105 text-left animate-fade-slide ${
                          showCorrect
                            ? 'bg-green-50 border-2 border-green-500'
                            : showWrong
                              ? 'bg-red-50 border-2 border-red-500'
                              : isSelected
                                ? 'bg-purple-100 border-2 border-[#6E55FB]'
                                : paired
                                  ? 'bg-blue-50 border-2 border-blue-400'
                                  : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-400'
                        } disabled:cursor-not-allowed`}
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        <span className="text-gray-900 font-semibold text-lg">{item.text}</span>
                        {paired && (
                          <div className="mt-2 text-sm text-blue-700">
                            → {question.rightColumn.find((r) => r.id === paired.right)?.text}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-purple-100 px-3 py-1 rounded-lg text-purple-700">
                      Cột B
                    </span>
                  </h3>
                  {question.rightColumn.map((item, index) => {
                    const isPaired = matchingPairs.some((p) => p.right === item.id)
                    const canSelect = selectedLeft !== null

                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          !showFeedback && selectedLeft && handleMatchingSelect(selectedLeft, item.id)
                        }
                        disabled={showFeedback || !canSelect}
                        className={`w-full p-4 rounded-xl transition-all transform hover:scale-105 text-left animate-fade-slide ${
                          isPaired
                            ? 'bg-purple-50 border-2 border-purple-400'
                            : canSelect
                              ? 'bg-gray-50 border-2 border-gray-200 hover:border-purple-500'
                              : 'bg-gray-50 border-2 border-gray-100'
                        } disabled:cursor-not-allowed`}
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        <span className="text-gray-900 font-semibold text-lg">{item.text}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {!showFeedback && (
                <button
                  onClick={handleMatchingSubmit}
                  disabled={matchingPairs.length < question.leftColumn.length}
                  className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✓ Gửi đáp án{' '}
                  {matchingPairs.length > 0 &&
                    `(${matchingPairs.length}/${question.leftColumn.length})`}
                </button>
              )}
            </div>
          )}

          {/* Ordering */}
          {question.type === 'ordering' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-4">
                <p className="text-gray-700 text-sm">
                  💡 Kéo thả để sắp xếp các mục theo thứ tự đúng
                </p>
              </div>
              <div className="space-y-3">
                {orderedItems.map((itemId, index) => {
                  const item = question.items.find((i) => i.id === itemId)
                  if (!item) return null

                  const isCorrectPosition = showFeedback && item.correctOrder === index
                  const isWrongPosition = showFeedback && item.correctOrder !== index

                  return (
                    <div
                      key={itemId}
                      draggable={!showFeedback}
                      onDragStart={() => setDraggedItem(itemId)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (draggedItem) {
                          const fromIndex = orderedItems.indexOf(draggedItem)
                          moveItem(fromIndex, index)
                          setDraggedItem(null)
                        }
                      }}
                      className={`relative p-6 rounded-xl transition-all cursor-move animate-fade-slide ${
                        isCorrectPosition
                          ? 'bg-green-50 border-2 border-green-500'
                          : isWrongPosition
                            ? 'bg-red-50 border-2 border-red-500'
                            : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-400 hover:scale-105'
                      } ${showFeedback ? 'cursor-default' : ''}`}
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center border border-gray-300">
                          {index + 1}
                        </span>
                        <span className="text-xl md:text-2xl font-semibold text-gray-900 flex-1">
                          {item.text}
                        </span>
                        {!showFeedback && <span className="text-2xl text-gray-400">⋮⋮</span>}
                      </div>
                      {isCorrectPosition && (
                        <span className="absolute top-4 right-4 text-3xl">✓</span>
                      )}
                      {isWrongPosition && <span className="absolute top-4 right-4 text-3xl">✗</span>}
                    </div>
                  )
                })}
              </div>

              {!showFeedback && (
                <button
                  onClick={handleOrderingSubmit}
                  className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
                >
                  ✓ Gửi đáp án
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
