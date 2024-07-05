import { useState } from "react";
import { FaDownload } from "react-icons/fa";

export function Post() {
  const [loadPercentageSQL, setLoadPercentageSQL] = useState(0);
  const [loadPercentageNoSQL, setLoadPercentageNoSQL] = useState(0);
  const [loading, setLoading] = useState(false);

  // Os tempos são agora em milissegundos, diretamente proporcionais a segundos completos
  const averageTimePostgresql = 3220; // 3.220 segundos em milissegundos
  const averageTimeMongoDB = 1976; // 1.976 segundos em milissegundos

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
            setLoading(false); // Libera o botão após terminar o carregamento de NoSQL
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
          Performance Comparison: SQL vs NoSQL
        </div>
        <div className="flex flex-col justify-center items-center">
          <a
            href="/assets/files/orders_data.xlsx"
            download
            className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950 cursor-pointer hover:bg-gray-300"
          >
            <div className="flex flex-col justify-center items-center">
              <div>Download the File</div>
              <div className="text-xs text-justify w-3/4">
                (Click here to download and see the content)
              </div>
            </div>
            <FaDownload size={25} />
          </a>
          <button
            className={`p-2 mt-5 ${
              loading ? "bg-gray-500" : "hover:bg-green-700 bg-green-500"
            } rounded-lg cursor-pointer flex flex-row items-center gap-3 text-white`}
            onClick={startLoadSimulation}
            disabled={loading}
          >
            {loading ? "Loading..." : "Click to Load"}
          </button>
        </div>
        <div className="flex flex-row justify-center gap-10 w-full mt-6">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="font-bold text-3xl text-gray-700 text-center">
              <div>(PostgreSQL)</div>
              <div>SQL</div>
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
              <div>(MongoDB)</div>
              <div>NoSQL</div>
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
              Above we will show the average speed for the backend to get the
              file and register in the appropriate tables.
            </div>
            <div className="text-base mt-5">
              Below you will be able to understand the functions performed what
              is being done in the backend, the file in question has 11.952
              lines and 21 columns, only 1.612KB in size and you can test the
              entire process by downloading the backend code and testing by
              yourself.
            </div>
            <div className="text-sm italic mt-2">
              (you can get differents results depending on your machine)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
