// src/pages/Quiz/QuizPlay.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRandomQuiz, saveQuizAttempt } from "../../services/operations/quizAPI";

const useQuery = () => new URLSearchParams(useLocation().search);

const QuizPlay = () => {
  const { category } = useParams();
  const query = useQuery();
  const difficulty = query.get("difficulty") || "easy";
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth); // tumhara auth slice

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await getRandomQuiz(token, category, difficulty, 5);
        if (!res.data.success) throw new Error(res.data.message);
        setQuestions(res.data.data || []);
      } catch (e) {
        setErrMsg(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [token, category, difficulty, navigate]);




  

  const handleOptionClick = (option) => {
    if (showAnswer) return;
    setSelected(option);
    setShowAnswer(true);

    if (option === questions[currentIdx].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    const q = questions[currentIdx];
    setAnswers((prev) => [
      ...prev,
      { questionId: q._id, selectedOption: selected },
    ]);

    const nextIndex = currentIdx + 1;
    if (nextIndex >= questions.length) {
      setFinished(true);
      setShowAnswer(false);
      await submitAttempt();
    } else {
      setCurrentIdx(nextIndex);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  const submitAttempt = async () => {
    try {
      setSaving(true);
      await saveQuizAttempt(token, {
        category,
        difficulty,
        answers,
      });
    } catch (e) {
      console.error("Save attempt error:", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-richblack-100">Loading quiz...</p>;
  if (errMsg) return <p className="text-red-400">Error: {errMsg}</p>;
  if (!questions.length) return <p>No questions found.</p>;

  if (finished) {
    const total = questions.length;
    const percent = Math.round((score / total) * 100);

    return (
      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-md bg-richblack-800 p-6 rounded-2xl border border-richblack-700 text-center">
          <h2 className="text-2xl font-semibold text-richblack-5 mb-2">
            Quiz Completed 🎉
          </h2>
          <p className="text-richblack-100 mb-2">
            Score: {score} / {total}
          </p>
          <p className="text-richblack-100 mb-4">Accuracy: {percent}%</p>
          {saving && (
            <p className="text-xs text-richblack-300 mb-2">
              Saving your attempt...
            </p>
          )}

          <button
            onClick={() => navigate("/quiz")}
            className="px-4 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-semibold mr-2"
          >
            Back to Categories
          </button>
          <button
            onClick={() => navigate("/quiz/history")}
            className="px-4 py-2 rounded-lg bg-richblack-700 text-richblack-100 border border-richblack-600"
          >
            View History
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-2xl bg-richblack-800 p-6 rounded-2xl border border-richblack-700">
        <p className="text-sm text-richblack-300 mb-2">
          Question {currentIdx + 1} / {questions.length}
        </p>
        <h3 className="text-lg font-semibold text-richblack-5 mb-4">
          {q.question}
        </h3>
        <div>
          {q.options.map((op) => {
            const isCorrect = op === q.correctAnswer;
            const isSelected = op === selected;
            let className =
              "w-full text-left px-4 py-2 rounded-lg border mb-2 transition-all ";

            if (showAnswer) {
              if (isCorrect) {
                className += "bg-green-600 border-green-400 text-white";
              } else if (isSelected && !isCorrect) {
                className += "bg-red-600 border-red-400 text-white";
              } else {
                className +=
                  "bg-richblack-700 border-richblack-600 text-richblack-200";
              }
            } else if (isSelected) {
              className +=
                "bg-yellow-50 text-richblack-900 border-yellow-200";
            } else {
              className +=
                "bg-richblack-700 text-richblack-5 border-richblack-600";
            }

            return (
              <button
                key={op}
                onClick={() => handleOptionClick(op)}
                className={className}
              >
                {op}
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleNext}
              disabled={!selected}
              className="px-4 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-semibold"
            >
              {currentIdx + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlay;
