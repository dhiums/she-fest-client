import Links from "@/components/Headers/Links";
import Navs from "@/components/Headers/Navs";
import Link from "next/link"; 
export default function Page() {
  return (
    <div className="w-screen overflow-x-hidden">
      <section
        id="section-1"
        className="min-h-screen justify-between flex flex-col"
      >
        <div className="flex justify-between bg-h-line bg-contain h-40 items-center px-8">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="md:h-28 h-24 cursor-pointer"
          />
         <Navs/>
          <a href="#section-3" className="lg:hidden">
            <div className="bg-yellow inline-flex gap-1 items-center hover:bg-yellower transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-lg font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg> Menu
            </div>
          </a>
        </div>
        <div className="flex flex-col items-center">
        <img
            src="/img/logo/flowers/orange.svg"
            alt="orange flower"
            className="md:h-80 h-32 z-50 animate-spin-slow md:absolute md:-top-32 md:right-[35vw]"
          />
        <p className="px-12 md:px-20 text-4xl md:text-[6vw] md:leading-[6vw] font-bold text-center">
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
        <img
            src="/img/logo/flowers/blue.svg"
            alt="blue flower"
            className="md:block hidden md:h-80  z-50 animate-spin-slow md:absolute md:-bottom-32 md:-right-32"
          />
        </div>
        <div className="flex justify-center md:justify-start bg-h-line bg-contain h-40 items-end">
          <a href="#section-2">
            <button className="bg-yellow hover:bg-yellower transition-colors duration-300 md:ml-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
              next
            </button>
          </a>

        </div>
      </section>

      <section
        id="section-2"
        className="h-screen relative flex flex-col justify-between"
      >
        <div className="bg-h-line bg-contain h-40 flex items-center justify-center">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="h-[120px]"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-16 items-center">
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/alpha.svg"
              alt="one of three parts of the logo"
              className="h-28 md:h-40"
            />
            <div className="text-center mr-4">
              <p className="font-black leading-9 md:font-bold md:text-[70px] md:leading-[50px] text-5xl">
              3.5K+
              </p>
              <p className="font-semibold text-lg">Candidates</p>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/beta.svg"
              alt="one of three parts of the logo"
              className="h-28 md:h-40"
            />
            <div className="text-center mr-4">
              <p className="font-black leading-9 md:font-bold md:text-[70px] md:leading-[50px] text-5xl">
                60+
              </p>
              <p className="font-semibold text-lg">Institutions</p>
            </div>
          </div>

          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/gamma.svg"
              alt="one of three parts of the logo"
              className="h-28 md:h-40"
            />
            <div className="text-center mr-4">
              <p className="font-black leading-9 md:font-bold md:text-[70px] md:leading-[50px] text-5xl">
                45+
              </p>
              <p className="font-semibold text-lg">Programs</p>
            </div>
          </div>
        </div>

        <div className="bg-h-line bg-contain h-40 flex items-end justify-center md:justify-end">
          <a href="#section-3">
            {" "}
            <button className="bg-yellow hover:bg-yellower transition-colors duration-300 md:mr-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
              next
            </button>
          </a>
        </div>
        <img
          src="/img/logo/flowers/yellow.svg"
          alt="yellow flower"
          className="h-80 hidden md:block z-50 animate-spin-slow absolute -bottom-32 -left-32"
        />
      </section>

      <section
        id="section-3"
        className="h-screen relative flex flex-col justify-between"
      >
        <div className="bg-h-line bg-contain h-40 flex items-center justify-center">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="h-[120px]"
          />
        </div>

        <Links/>

        <div className="flex justify-center md:justify-between bg-h-line bg-contain h-40 items-end">
          <a href="#section-1">
            {" "}
            <button className="bg-yellow hover:bg-yellower transition-colors duration-300 md:ml-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>
              top
            </button>
          </a>
          <img
            src="/img/logo/flowers/orange.svg"
            alt="orange flower"
            className="h-80 hidden md:block z-50 animate-spin-slow absolute -bottom-32 -right-32"
          />
        </div>
      </section>

      <div
        id="section-4"
        className="flex flex-col text-center items-center lg:text-left lg:items-start lg:flex-row justify-between px-16 py-5"
      >
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
                  <Link className="font-semibold block pb-2 text-sm" href="/">
                    Sheets
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold block pb-2 text-sm" href="/">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold block pb-2 text-sm" href="/">
                    Organizations
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold block pb-2 text-sm" href="/">
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
                  <Link className="font-semibold block pb-2 text-sm" href="/">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold block pb-2 text-sm" href="/">
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
