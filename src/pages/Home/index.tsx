import { FaDatabase, FaChartLine, FaCode, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-10 min-h-screen">
      <section className="flex flex-col items-center text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800">
          {t("home.welcome")}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{t("home.compare")}</p>
      </section>

      <section className="mt-10 w-full max-w-4xl">
        <p className="mt-4 text-gray-600">{t("home.betterend")}</p>
      </section>

      <section className="mt-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
        <div
          className="flex flex-col items-center p-5 bg-white shadow rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => navigate("/post")}
        >
          <FaDatabase size={40} className="text-blue-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            {t("home.data_insertion")}
          </h3>
          <p className="mt-2 text-gray-600">
            {t("home.data_insertion_description")}
          </p>
        </div>
        <div
          className="flex flex-col items-center p-5 bg-white shadow rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => navigate("/get")}
        >
          <FaChartLine size={40} className="text-green-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            {t("home.data_retrieval")}
          </h3>
          <p className="mt-2 text-gray-600">
            {t("home.data_retrieval_description")}
          </p>
        </div>
        <div
          className="flex flex-col items-center p-5 bg-white shadow rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => navigate("/update")}
        >
          <FaCode size={40} className="text-yellow-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            {t("home.data_update")}
          </h3>
          <p className="mt-2 text-gray-600">
            {t("home.data_update_description")}
          </p>
        </div>
        <div
          className="flex flex-col items-center p-5 bg-white shadow rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => navigate("/delete")}
        >
          <FaTrash size={40} className="text-red-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            {t("home.data_deletion")}
          </h3>
          <p className="mt-2 text-gray-600">
            {t("home.data_deletion_description")}
          </p>
        </div>
        <a
          href="https://github.com/cristianoprogramador/better_end_frontend"
          className="flex flex-col items-center p-5 bg-white shadow rounded hover:bg-gray-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode size={40} className="text-blue-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            {t("home.frontend_code")}
          </h3>
          <p className="mt-2 text-gray-600">
            {t("home.frontend_code_description")}
          </p>
        </a>
        <a
          href="https://github.com/cristianoprogramador/better_end_backend"
          className="flex flex-col items-center p-5 bg-white shadow rounded hover:bg-gray-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode size={40} className="text-green-500" />
          <h3 className="mt-5 text-xl font-bold text-gray-800">
            {t("home.backend_code")}
          </h3>
          <p className="mt-2 text-gray-600">
            {t("home.backend_code_description")}
          </p>
        </a>
      </section>
    </div>
  );
}
