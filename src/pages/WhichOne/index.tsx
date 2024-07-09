import { useEffect, useState } from "react";
import { questions_en } from "@/utils/questions-en";
import { questions_pt } from "@/utils/questions-pt";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

interface Option {
  answer: string;
  result: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

export function WhichOne() {
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [visibleQuestions, setVisibleQuestions] = useState<number[]>([1]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [sqlCount, setSqlCount] = useState(0);
  const [noSqlCount, setNoSqlCount] = useState(0);
  const { t } = useTranslation();
  const { language } = useLanguage();

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    if (language === "pt") {
      const shuffled = shuffleArray([...questions_pt]);
      setShuffledQuestions(shuffled);
      setVisibleQuestions([shuffled[0].id]);
    } else {
      const shuffled = shuffleArray([...questions_en]);
      setShuffledQuestions(shuffled);
      setVisibleQuestions([shuffled[0].id]);
    }

    setResponses({});
    setSqlCount(0);
    setNoSqlCount(0);
  }, [language]);

  const handleOptionClick = (questionId: number, result: string) => {
    setResponses((prevResponses) => {
      const newResponses = { ...prevResponses, [questionId]: result };

      if (result === "SQL") {
        setSqlCount((prevCount) => prevCount + 1);
      } else if (result === "NoSQL") {
        setNoSqlCount((prevCount) => prevCount + 1);
      }

      if (prevResponses[questionId]) {
        if (prevResponses[questionId] === "SQL" && result !== "SQL") {
          setSqlCount((prevCount) => prevCount - 1);
        } else if (
          prevResponses[questionId] === "NoSQL" &&
          result !== "NoSQL"
        ) {
          setNoSqlCount((prevCount) => prevCount - 1);
        }
      }

      return newResponses;
    });
  };

  const showNextQuestion = () => {
    const nextQuestionIndex = visibleQuestions.length;
    if (nextQuestionIndex < shuffledQuestions.length) {
      setVisibleQuestions([
        ...visibleQuestions,
        shuffledQuestions[nextQuestionIndex].id,
      ]);
    }
  };

  const sqlBgClass = sqlCount > noSqlCount ? "bg-green-200" : "";
  const noSqlBgClass = noSqlCount > sqlCount ? "bg-green-200" : "";

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="max-w-[650px] mb-20">
        <div className="font-bold text-3xl text-gray-700 text-center">
          {t("which_one.title")}
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="my-1 border w-72 py-2">
            <div className="text-lg text-center font-semibold">
              {t("which_one.scoreboard")}
            </div>
            <div className="flex flex-row justify-center items-center gap-10 mt-3">
              <div
                className={`flex flex-col justify-center items-center gap-1 border border-black border-dashed text-center w-20 ${sqlBgClass}`}
              >
                <div className="text-lg font-bold border-b border-black border-dashed p-1 flex w-full text-center items-center justify-center">
                  {t("which_one.sql")}:
                </div>
                <div className="text-base font-bold p-1">{sqlCount}</div>
              </div>
              <div
                className={`flex flex-col justify-center items-center gap-1 border border-black border-dashed text-center w-20 ${noSqlBgClass}`}
              >
                <div className="text-lg font-bold border-b border-black border-dashed p-1 flex w-full text-center items-center justify-center">
                  {t("which_one.nosql")}:
                </div>
                <div className="text-base font-bold p-1">{noSqlCount}</div>
              </div>
            </div>
          </div>
        </div>
        {shuffledQuestions.map((question) =>
          visibleQuestions.includes(question.id) ? (
            <div
              key={question.id}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="text-lg font-semibold mb-2">
                {question.question}
              </div>
              <div className="flex flex-col">
                {question.options.map((option) => (
                  <button
                    key={option.answer}
                    onClick={() =>
                      handleOptionClick(question.id, option.result)
                    }
                    className={`p-2 mb-2 rounded-lg ${
                      responses[question.id] === option.result
                        ? "bg-green-800 text-white"
                        : "bg-green-500 text-white hover:bg-green-700"
                    }`}
                  >
                    {option.answer}
                  </button>
                ))}
              </div>
              {responses[question.id] && (
                <div className="mt-2 text-blue-600 font-semibold">
                  {t("which_one.recommendation")}: {responses[question.id]}
                </div>
              )}
            </div>
          ) : null
        )}
        {visibleQuestions.length < shuffledQuestions.length && (
          <div className="flex w-full justify-center">
            <button
              onClick={showNextQuestion}
              className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              {t("which_one.test_another_question")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
