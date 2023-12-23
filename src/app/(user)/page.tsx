import Link from "next/link";
export default function Page() {
  return (
    <div className="w-screen">
      <section id="section-1" className="min-h-screen justify-between flex flex-col">
        <div className="flex justify-between bg-h-line bg-contain h-40 items-center px-8">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="md:h-28 h-16"
          />
          <img
            src="/img/logo/flowers/orange.svg"
            alt="orange flower"
            className="h-80 z-50 animate-spin-slow absolute -top-32 right-[35vw]"
          />
          <nav>
            <ul className="flex flex-col items-end gap-1">
              <div className="flex gap-1">
                <li className=" bg-yellow hover:bg-yellower transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-md font-semibold">
                  Results
                </li>
                <li className=" bg-blue hover:bg-bluer transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-md font-semibold">
                  Candidates
                </li>
              </div>
              <div className="flex gap-1">
                
                <li className=" bg-orange hover:bg-oranger transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-md font-semibold">
                  Downloads
                </li>
                <li className=" bg-pink hover:bg-pinker transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-md font-semibold">
                  Login
                </li>
              </div>
            </ul>
          </nav>
        </div>
        <p className="px-20 text-[6vw] leading-[6vw] font-bold text-center">
          Brushing{" "}
          <span className="bg-yellow hover:bg-pinker transition-colors  duration-300 font-mono">
            Colours
          </span>
          , <br />
          <span className="text-blue hover:text-brown transition-colors duration-300 font-serif animate-pulse">
            Bridging
          </span>{" "}
          Cultures
        </p>
        <div className="flex justify-between bg-h-line bg-contain h-40 items-end">
         <a href="#section-2">
         <button className="bg-yellow hover:bg-yellower transition-colors duration-300 ml-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
            explore
          </button>
         </a>
          <img
            src="/img/logo/flowers/blue.svg"
            alt="blue flower"
            className="h-80 z-50 animate-spin-slow absolute -bottom-32 -right-32"
          />
        </div>
      </section>

      <section id="section-2" className="h-screen relative flex flex-col justify-between">
        <div className="bg-h-line bg-contain h-40 flex items-center justify-center">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="h-[120px]"
          />
        </div>

        <div className="flex justify-center gap-16">
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/alpha.svg"
              alt="one of three parts of the logo"
              className="h-40"
            />
            <div className="text-center">
              <p className="font-bold text-[70px] leading-[50px]">300</p>
              <p className="font-semibold text-lg">candidates</p>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/beta.svg"
              alt="one of three parts of the logo"
              className="h-40"
            />
            <div className="text-center">
              <p className="font-bold text-[70px] leading-[50px]">300</p>
              <p className="font-semibold text-lg">candidates</p>
            </div>
          </div>

          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/gamma.svg"
              alt="one of three parts of the logo"
              className="h-40"
            />
            <div className="text-center">
              <p className="font-bold text-[70px] leading-[50px]">300</p>
              <p className="font-semibold text-lg">candidates</p>
            </div>
          </div>
        </div>

        <div className="bg-h-line bg-contain h-40 flex items-end justify-end">
         <a href="#section-3"> <button className="bg-yellow hover:bg-yellower transition-colors duration-300 mr-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
            explore
          </button></a>
        </div>
        <img
          src="/img/logo/flowers/yellow.svg"
          alt="yellow flower"
          className="h-80 z-50 animate-spin-slow absolute -bottom-32 -left-32"
        />
      </section>

      <section id="section-3" className="h-screen relative flex flex-col justify-between">
        <div className="bg-h-line bg-contain h-40 flex items-center justify-center">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="h-[120px]"
          />
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-3">
            <div className="bg-blue w-72 h-20 hover:bg-bluer transition-all duration-300  flex items-center gap-3 text-xl px-5 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-10 w-10"
              >
                <path
                  fill="currentColor"
                  d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z"
                ></path>
              </svg>
              Score Board
            </div>
            <div className="bg-orange w-72 h-20 hover:bg-oranger transition-all duration-300  flex items-center gap-3 text-xl px-5 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="20"
                viewBox="0 0 640 512"
                className="w-10 h-10"
              >
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
              </svg>
              Download Section
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-yellow w-72 h-20 hover:bg-yellower transition-all duration-300  flex items-center gap-3 text-xl px-5 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="18"
                viewBox="0 0 576 512"
                className="h-10 w-10"
              >
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
              </svg>
              Candidate Points
            </div>
            <div className="bg-pink w-72 h-20 hover:bg-pinker transition-all duration-300  flex items-center gap-3 text-xl px-5 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
                className="h-10 w-10"
              >
                <path d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8H32c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9V104l4.4-1.6L240.1 4.2zM64 224h64V416h40V224h64V416h48V224h64V416h40V224h64V420.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512H32c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1V224z" />
              </svg>
              Institution Login
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-h-line bg-contain h-40 items-end">
         <a href="#section-1"> <button className="bg-yellow hover:bg-yellower transition-colors duration-300 ml-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
            explore
          </button></a>
          <img
            src="/img/logo/flowers/orange.svg"
            alt="orange flower"
            className="h-80 z-50 animate-spin-slow absolute -bottom-32 -right-32"
          />
        </div>
      </section>
      
      <div id="section-4" className="flex flex-col text-center items-center lg:text-left lg:items-start lg:flex-row justify-between px-16 py-5">
        <div className="flex items-center my-auto">
          <img src="/img/logo/logo.svg" alt="logo" className="h-36" />
        </div>
        <div className="w-full px-4">
          <div className="flex flex-wrap sm:flex-nowrap items-top my-10 justify-center lg:justify-end xl:mr-32 gap-10">
            <div className="px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                Features
              </span>
              <ul className="list-unstyled opacity-80">
                <li>
                  <Link
                    className="font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Sheets
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Organizations
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Docs
                  </Link>
                </li>
                {/* <li>
                <Link
                  className="font-semibold block pb-2 text-sm"
                  href="/tea-stall"
                >
                  Tea Stall
                </Link>
              </li> */}
              </ul>
            </div>
            <div className="px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                Resources
              </span>
              <ul className="list-unstyled opacity-80 ">
                <li>
                  <Link
                    className="font-semibold block pb-2 text-sm"
                    href="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
