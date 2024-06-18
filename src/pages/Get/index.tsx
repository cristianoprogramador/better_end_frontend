import { useEffect, useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Filter {
  type: string;
  value: string;
  operator?: string;
}

const filterOptions = [
  "Category",
  "Tag",
  "Product Name",
  "Description",
  "Price",
];

export function Get() {
  const [isUploading, setIsUploading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [filters, setFilters] = useState<Filter[]>([{ type: "", value: "" }]);
  const [results, setResults] = useState<any>(null);

  const startTimer = () => {
    setIsUploading(true);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isUploading) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isUploading, startTime]);

  const stopTimer = () => {
    setIsUploading(false);
  };

  useEffect(() => {
    if (isUploading) {
      setTimeout(() => {
        stopTimer();
      }, 5000);
    }
  }, [isUploading]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleFilterChange = (index: number, field: string, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
  };

  const getAvailableFilterOptions = (currentIndex: number) => {
    const selectedOptions = filters
      .map((filter, idx) => idx !== currentIndex && filter.type)
      .filter(Boolean);
    return filterOptions.filter((option) => !selectedOptions.includes(option));
  };

  const addFilter = () => {
    setFilters([...filters, { type: "", value: "" }]);
  };

  const removeFilter = (index: number) => {
    const newFilters = filters.filter((_, idx) => idx !== index);
    setFilters(newFilters);
  };

  const handleSearch = async () => {
    startTimer();
    // Mocking search results with setTimeout
    setTimeout(() => {
      setResults({
        sql: { responseTime: 1200, data: { message: "SQL Results" } },
        noSql: { responseTime: 800, data: { message: "NoSQL Results" } },
      });
      stopTimer();
    }, 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="max-w-[800px]">
        <div className="font-bold text-3xl text-gray-700 text-center">
          Comparação de Desempenho: SQL vs NoSQL
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-2xl text-gray-700 text-center">
            Get
          </h2>
          {filters.map((filter, index) => (
            <div key={index} className="mb-3 flex items-center mt-5">
              {index > 0 && (
                <button
                  onClick={() => removeFilter(index)}
                  className="mr-2 p-1 rounded hover:opacity-60"
                >
                  <IoRemoveCircleOutline size={30} color="red" />
                </button>
              )}
              <select
                value={filter.type || ""}
                onChange={(e) =>
                  handleFilterChange(index, "type", e.target.value)
                }
                className={`p-2 rounded ${index === 0 ? "ml-[46px]" : ""}`}
              >
                <option value="">Selecione o Tipo de Filtro</option>
                {getAvailableFilterOptions(index).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {filter.type === "Price" && (
                <select
                  value={filter.operator || ""}
                  onChange={(e) =>
                    handleFilterChange(index, "operator", e.target.value)
                  }
                  className="ml-2 p-2 rounded"
                >
                  <option value="">Operador</option>
                  <option value=">">Maior que</option>
                  <option value="<">Menor que</option>
                  <option value="=">Igual a</option>
                </select>
              )}
              <input
                type="text"
                value={filter.value || ""}
                onChange={(e) =>
                  handleFilterChange(index, "value", e.target.value)
                }
                className="ml-2 p-2 rounded"
              />
            </div>
          ))}
          <div className="mt-2 p-1 rounded w-full flex justify-center items-center">
            <IoAddCircleOutline
              size={30}
              color="green"
              onClick={addFilter}
              className="hover:opacity-60 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center justify-center">
          <button
            onClick={handleSearch}
            disabled={isUploading}
            className="mt-5 bg-blue-500 text-white py-2 px-4 rounded"
          >
            {isUploading ? "Carregando..." : "Buscar"}
          </button>
          <div className="mt-5">
            <div>Tempo decorrido: {formatTime(elapsedTime)}</div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-xl text-center">Resultados</h2>
          <div className="flex flex-row w-full justify-between gap-4 mt-3">
            <div className="mt-3">
              <h3 className="font-semibold">SQL</h3>
              <p>Tempo de resposta: {results?.sql?.responseTime} ms</p>
              <pre>{JSON.stringify(results?.sql?.data, null, 2)}</pre>
            </div>
            <div className="mt-3">
              <h3 className="font-semibold">NoSQL</h3>
              <p>Tempo de resposta: {results?.noSql?.responseTime} ms</p>
              <pre>{JSON.stringify(results?.noSql?.data, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
