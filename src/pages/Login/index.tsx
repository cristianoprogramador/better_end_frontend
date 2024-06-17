// src/pages/Login/index.tsx

import loginImg from "@/assets/images/login.png";

export function Login() {
  return (
    <main className="flex min-h-screen w-full justify-between items-center bg-theme-bg">
      <div className="flex flex-row h-full gap-4 items-center justify-center bg-theme-bg w-full">
        <div className="flex lg:w-1/2 justify-center items-center">
          <div className="p-10 rounded-md sm:border bg-white">
            <div className=" text-center text-2xl lg:text-4xl font-bold">
              Acesse a conta
            </div>
            <div className="mt-3 text-sm">Preencha os campos abaixo</div>
            <div>Nome</div>
            <div>Senha</div>
          </div>
        </div>

        <div className="hidden lg:flex animate-fadeIn">
          <img src={loginImg} alt="" />
        </div>
      </div>
    </main>
  );
}
