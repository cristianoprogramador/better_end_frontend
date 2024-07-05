import { resultsGEt } from "@/utils/resultsJsonGET";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";

export function Get() {
  const [loadPercentageSQL, setLoadPercentageSQL] = useState(0);
  const [loadPercentageNoSQL, setLoadPercentageNoSQL] = useState(0);
  const [loading, setLoading] = useState(false);

  // Os tempos são agora em milissegundos, diretamente proporcionais a segundos completos
  const averageTimePostgresql = 193; // 0.193 segundos em milissegundos
  const averageTimeMongoDB = 1544; // 1.544 segundos em milissegundos

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
            href="/assets/files/getResults.json"
            download
            className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950 cursor-pointer hover:bg-gray-300"
          >
            <div className="flex flex-col justify-center items-center">
              <div>Download the File</div>
              <div className="text-xs text-justify w-3/4">
                (Click here to download the JSON result file)
              </div>
            </div>
            <FaDownload size={25} />
          </a>
          <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
            <div className="flex flex-col justify-center items-center">
              <div className="text-base">
                The query retrieves orders that include products from the
                "Fruits" category and where the order status is "Shipped". This
                demonstrates the performance of MongoDB and PostgreSQL when
                filtering data through lookups, unwinds, and multiple joins.
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
            {loading ? "Loading..." : "Click to Filter"}
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
              PostgreSQL is generally faster for relational queries due to its
              optimized query planner and execution engine. MongoDB, being a
              NoSQL database, excels in scenarios involving large volumes of
              unstructured data and provides flexibility in schema design.
            </div>
            <div className="text-sm italic mt-2">
              (the JSON result is the same for both databases)
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
          <div className="flex flex-col justify-center items-center">
            <div className="text-sm italic mt-2">
              For PostgreSQL, the query uses efficient SQL joins and indexing to
              quickly filter and retrieve the data. PostgreSQL's optimized query
              planner helps in determining the most efficient way to execute the
              query, ensuring faster response times for relational data.
            </div>
            <div className="text-sm italic mt-2">
              For MongoDB, the query involves the use of the aggregation
              framework, which includes stages like `$lookup` for joining
              collections and `$unwind` for deconstructing arrays. MongoDB's
              flexibility in handling unstructured data allows for complex
              aggregations but may result in longer processing times compared to
              traditional SQL databases.
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
          <div className="flex flex-col justify-center items-center">
            <div className="text-base">Example:</div>
            <div className="text-sm italic mt-2">
              <pre>{JSON.stringify(resultsGEt, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
