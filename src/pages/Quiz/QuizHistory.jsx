// src/pages/Quiz/QuizHistory.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuizHistory } from "../../services/operations/quizAPI";

const QuizHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getQuizHistory(token);
        if (!res.data.success) throw new Error(res.data.message);
        setAttempts(res.data.data || []);
      } catch (e) {
        setErrMsg(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  if (loading) return <p>Loading history...</p>;
  if (errMsg) return <p className="text-red-400">Error: {errMsg}</p>;
  if (!attempts.length) return <p>No attempts yet.</p>;

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-richblack-5 mb-4">
          My Quiz History
        </h2>
        <div className="space-y-3">
          {attempts.map((a) => (
            <div
              key={a._id}
              className="bg-richblack-800 border border-richblack-700 rounded-xl p-4"
            >
              <p className="text-richblack-50 font-semibold">
                {a.category.toUpperCase()} •{" "}
                <span className="capitalize">{a.difficulty}</span>
              </p>
              <p className="text-sm text-richblack-100">
                Score: {a.score} / {a.totalQuestions} ({a.percentage}%)
              </p>
              <p className="text-xs text-richblack-400">
                {new Date(a.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizHistory;
