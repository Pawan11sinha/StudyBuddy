// src/pages/Quiz/QuizCategory.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("dsa");
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    navigate(`/quiz/${category}?difficulty=${difficulty}`);
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-md bg-richblack-800 p-6 rounded-2xl border border-richblack-700">
        <h2 className="text-2xl font-semibold text-richblack-5 mb-4 text-center">
          Choose Quiz
        </h2>

        <div className="mb-4">
          <label className="block text-richblack-200 mb-1">Category</label>
          <select
            className="w-full bg-richblack-700 text-richblack-5 rounded-lg px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="dsa">DSA</option>
            <option value="webdev">Web Development</option>
            <option value="ml">Machine Learning</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-richblack-200 mb-1">Difficulty</label>
          <select
            className="w-full bg-richblack-700 text-richblack-5 rounded-lg px-3 py-2"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-yellow-50 text-richblack-900 font-semibold py-2 rounded-lg hover:bg-yellow-100"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCategory;
