import { FaDatabase, FaChartLine, FaCode, FaTrash } from "react-icons/fa";

export function Home() {
  return (
    <div className="flex flex-col items-center p-10 min-h-screen">
      <section className="flex flex-col items-center text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Better-end
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Compare the performance of SQL and NoSQL databases through various
          operations.
        </p>
      </section>

      <section className="mt-10 w-full max-w-4xl">
        <p className="mt-4 text-gray-600">
          Better-end is a tool designed to help developers understand the
          performance differences between SQL and NoSQL databases. By testing
          various operations like data insertion, retrieval, updating, and
          deletion, you can see firsthand how each database type performs under
          different scenarios.
        </p>
      </section>

      <section className="mt-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center p-5 bg-white shadow rounded">
          <FaDatabase size={40} className="text-blue-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            Data Insertion (POST)
          </h3>
          <p className="mt-2 text-gray-600">
            Test how quickly data can be inserted into SQL and NoSQL databases.
          </p>
        </div>
        <div className="flex flex-col items-center p-5 bg-white shadow rounded">
          <FaChartLine size={40} className="text-green-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            Data Retrieval (GET)
          </h3>
          <p className="mt-2 text-gray-600">
            Compare the speed of data retrieval with complex queries.
          </p>
        </div>
        <div className="flex flex-col items-center p-5 bg-white shadow rounded">
          <FaCode size={40} className="text-yellow-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            Data Update (UPDATE)
          </h3>
          <p className="mt-2 text-gray-600">
            See how efficiently data can be updated in both database types.
          </p>
        </div>
        <div className="flex flex-col items-center p-5 bg-white shadow rounded">
          <FaTrash size={40} className="text-red-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            Data Deletion (DELETE)
          </h3>
          <p className="mt-2 text-gray-600">
            Understand the performance of data deletion operations.
          </p>
        </div>
        <a
          href="https://github.com/cristianoprogramador/better_end_frontend"
          className="flex flex-col items-center p-5 bg-white shadow rounded hover:bg-gray-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode size={40} className="text-blue-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            Frontend Code
          </h3>
          <p className="mt-2 text-gray-600">
            Access the frontend code repository on GitHub.
          </p>
        </a>
        <a
          href="https://github.com/cristianoprogramador/better_end_backend"
          className="flex flex-col items-center p-5 bg-white shadow rounded hover:bg-gray-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode size={40} className="text-green-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">Backend Code</h3>
          <p className="mt-2 text-gray-600">
            Access the backend code repository on GitHub.
          </p>
        </a>
      </section>
    </div>
  );
}
