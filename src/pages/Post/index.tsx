// src\pages\Home\index.tsx

import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

export function Post() {
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
          Performance Comparison: SQL vs NoSQL
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950 cursor-pointer hover:bg-gray-300">
            <div className="flex flex-col justify-center items-center">
              <div>Download the File</div>
              <div className="text-xs text-justify w-3/4">
                (The file is fixed to avoid manipulation and errors, but click
                here to download and see the content )
              </div>
            </div>
            <div>
              <FaDownload size={25} />
            </div>
          </div>
          <div
            className="p-2 mt-5 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-3 text-white"
            onClick={startTimer}
          >
            Click to Load
          </div>
        </div>
        <div className="flex flex-row justify-center gap-10 w-full mt-6">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="font-bold text-3xl text-gray-700">SQL</div>

            <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 mb-4 border border-green-800">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${(elapsedTime / 5000) * 100}%` }}
              ></div>
            </div>
            <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="font-bold text-3xl text-gray-700">NoSQL</div>

            <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 mb-4 border border-green-800">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${(elapsedTime / 5000) * 100}%` }}
              ></div>
            </div>
            <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
          </div>
        </div>
        <div className="flex flex-row gap-4 rounded mt-5 justify-center items-center p-4 border-dashed border border-cyan-950">
          <div className="flex flex-col justify-center items-center">
            <div className="text-base">
              Above we will test the speed for the backend to get the file and
              register in the appropriate tables
            </div>
            <div className="text-base mt-10">
              When you click the Upload button, we will first send the
              spreadsheet to the SQL database and once we get the answer of
              success we will stop the timer, then we will do same for NoSQL
              database
            </div>
            <div className="text-sm">(The files are the same )</div>
          </div>
        </div>
      </div>
    </div>
  );
}
