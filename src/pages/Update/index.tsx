import {
  updateMongoDBCode,
  updatePostgreSQLCode,
} from "@/utils/resultsJsonGET";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const customStyle = {
  ...solarizedlight,
  'code[class*="language-"]': {
    ...solarizedlight['code[class*="language-"]'],
    background: "none",
    fontSize: "0.9em",
  },
  'pre[class*="language-"]': {
    ...solarizedlight['pre[class*="language-"]'],
    background: "none",
    padding: "0",
    margin: "0",
    fontSize: "0.9em",
  },
};
export function Update() {
  const [loadPercentageSQL, setLoadPercentageSQL] = useState(0);
  const [loadPercentageNoSQL, setLoadPercentageNoSQL] = useState(0);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const averageTimePostgresql = 25; // 0.025 seconds to milliseconds
  const averageTimeMongoDB = 54; // 0.054 seconds to milliseconds

  const formatTime = (time: number) =>
    `${Math.floor(time / 1000)}s ${time % 1000}ms`;

  const startLoadSimulation = () => {
    if (!loading) {
      setLoading(true);
      setLoadPercentageSQL(0);
      setLoadPercentageNoSQL(0);

      const intervalSQL = setInterval(() => {
        setLoadPercentageSQL((prev) => {
          const nextPercentage = prev + (10 / averageTimePostgresql) * 100;
          if (nextPercentage >= 100) {
            clearInterval(intervalSQL);
            return 100;
          }
          return nextPercentage;
        });
      }, 10);

      const intervalNoSQL = setInterval(() => {
        setLoadPercentageNoSQL((prev) => {
          const nextPercentage = prev + (10 / averageTimeMongoDB) * 100;
          if (nextPercentage >= 100) {
            clearInterval(intervalNoSQL);
            setLoading(false);
            return 100;
          }
          return nextPercentage;
        });
      }, 10);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="max-w-[800px]">
        <div className="font-bold text-3xl text-gray-700 text-center">
          {t("update.performance")}
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
            <div className="flex flex-col justify-center items-center">
              <div className="text-base">{t("update.update_description")}</div>
            </div>
          </div>
          <button
            className={`p-2 mt-5 ${
              loading ? "bg-gray-500" : "hover:bg-green-700 bg-green-500"
            } rounded-lg cursor-pointer flex flex-row items-center gap-3 text-white`}
            onClick={startLoadSimulation}
            disabled={loading}
          >
            {loading ? t("update.loading") : t("update.click_to_update")}
          </button>
        </div>
        <div className="flex flex-row justify-center gap-10 w-full mt-6">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="font-bold text-3xl text-gray-700 text-center">
              <div>{t("update.postgresql")}</div>
              <div>{t("update.sql")}</div>
            </div>
            <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 mb-4 border border-green-800">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${loadPercentageSQL}%` }}
              ></div>
            </div>
            <div className="text-lg font-mono">
              {formatTime(averageTimePostgresql)}
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="font-bold text-3xl text-gray-700 text-center">
              <div>{t("update.mongodb")}</div>
              <div>{t("update.nosql")}</div>
            </div>
            <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 mb-4 border border-green-800">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${loadPercentageNoSQL}%` }}
              ></div>
            </div>
            <div className="text-lg font-mono">
              {formatTime(averageTimeMongoDB)}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
          <div className="flex flex-col justify-center items-center">
            <div className="text-base">{t("update.sql_performance")}</div>
          </div>
        </div>
        <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
          <div className="flex flex-col justify-center items-center">
            <div className="text-sm italic mt-2">
              {t("update.sql_update_explanation")}
            </div>
            <div className="text-sm italic mt-2">
              {t("update.mongodb_update_explanation")}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row rounded mt-5 justify-center items-start p-4 border-dashed border border-cyan-950">
        <div className="flex flex-col justify-center items-center">
          <div className="text-base">{t("update.postgresql_function")}</div>
          <div className="text-sm italic mt-2">
            <SyntaxHighlighter language="javascript" style={customStyle}>
              {updatePostgreSQLCode}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="text-base">{t("update.mongodb_function")}</div>
          <div className="text-sm italic mt-2">
            <SyntaxHighlighter language="javascript" style={customStyle}>
              {updateMongoDBCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
