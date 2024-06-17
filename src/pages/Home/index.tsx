// src\pages\Home\index.tsx

import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

export function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="max-w-[800px]">
        <div className="font-bold text-3xl text-gray-700 text-center">
          Comparação de Desempenho: SQL vs NoSQL
        </div>
        <div className="flex justify-center items-center">
          <div
            className="p-2 mt-5 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-3 text-white"
            onClick={startTimer}
          >
            Clique para Carregar
          </div>
        </div>
        <div className="flex flex-row justify-center gap-10 w-full mt-6">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="font-bold text-3xl text-gray-700">SQL</div>
            <div className="flex flex-row gap-4  mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
              <div className="flex flex-col justify-center items-center">
                <div>Baixe o Arquivo</div>
                <div className="text-xs text-justify w-3/4">
                  (O arquivo é fixo para evitar manipulação, mas clique para
                  baixa-lo e ver o conteudo)
                </div>
              </div>
              <div>
                <FaDownload size={25} />
              </div>
            </div>

            <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${(elapsedTime / 5000) * 100}%` }}
              ></div>
            </div>
            <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="font-bold text-3xl text-gray-700">NoSQL</div>
            <div className="flex flex-row gap-4  mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
              <div className="flex flex-col justify-center items-center">
                <div>Baixe o Arquivo</div>
                <div className="text-xs text-justify w-3/4">
                  (O arquivo é fixo para evitar manipulação, mas clique para
                  baixa-lo e ver o conteudo)
                </div>
              </div>
              <div>
                <FaDownload size={25} />
              </div>
            </div>

            <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${(elapsedTime / 5000) * 100}%` }}
              ></div>
            </div>
            <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
          </div>
        </div>
        <div className="flex flex-row gap-4  mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
          <div className="flex flex-col justify-center items-center">
            <div className="text-base">
              Acima iremos testar a velocidade para o backend pegar o arquivo e
              cadastrar nas devidas tabelas
            </div>
            <div className="text-base mt-10">
              Ao clicar no botão para Carregar, primeiro iremos enviar a
              planilha para o banco de dados SQL e assim que obtermos a resposta
              de sucesso iremos parar o cronometro, logo em seguida iremos fazer
              o mesmo para o banco de dados NoSQL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
