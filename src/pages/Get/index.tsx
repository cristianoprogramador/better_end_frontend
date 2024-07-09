import { resultsGEt } from "@/utils/resultsJsonGET";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";

export function Get() {
  const [loadPercentageSQL, setLoadPercentageSQL] = useState(0);
  const [loadPercentageNoSQL, setLoadPercentageNoSQL] = useState(0);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  // Times are now in milliseconds, directly proportional to full seconds
  const averageTimePostgresql = 193; // 0.193 seconds to milliseconds
  const averageTimeMongoDB = 1544; // 1.544 seconds to milliseconds

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
          {t("get.performance")}
        </div>
        <div className="flex flex-col justify-center items-center">
          <a
            href="/assets/files/getResults.json"
            download
            className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950 cursor-pointer hover:bg-gray-300"
          >
            <div className="flex flex-col justify-center items-center">
              <div>{t("get.download_file")}</div>
              <div className="text-xs text-justify w-3/4">
                {t("get.download_description")}
              </div>
            </div>
            <FaDownload size={25} />
          </a>
          <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
            <div className="flex flex-col justify-center items-center">
              <div className="text-base">
                {t("get.query_description")}
              </div>
            </div>
          </div>
          <button
            className={`p-2 mt-5 ${
              loading ? "bg-gray-500" : "hover:bg-green-700 bg-green-500"
            } rounded-lg cursor-pointer flex flex-row items-center gap-3 text-white`}
            onClick={startLoadSimulation}
            disabled={loading}
          >
            {loading ? t("get.loading") : t("get.click_to_filter")}
          </button>
        </div>
        <div className="flex flex-row justify-center gap-10 w-full mt-6">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="font-bold text-3xl text-gray-700 text-center">
              <div>{t("get.postgresql")}</div>
              <div>{t("get.sql")}</div>
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
              <div>{t("get.mongodb")}</div>
              <div>{t("get.nosql")}</div>
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
            <div className="text-base">
              {t("get.sql_performance")}
            </div>
            <div className="text-sm italic mt-2">
              {t("get.json_note")}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
          <div className="flex flex-col justify-center items-center">
            <div className="text-sm italic mt-2">
              {t("get.sql_query_explanation")}
            </div>
            <div className="text-sm italic mt-2">
              {t("get.mongodb_query_explanation")}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
          <div className="flex flex-col justify-center items-center">
            <div className="text-base">{t("get.example")}</div>
            <div className="text-sm italic mt-2">
              <pre>{JSON.stringify(resultsGEt, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
