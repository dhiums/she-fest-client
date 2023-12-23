"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  OperationResult,
  cacheExchange,
  fetchExchange,
  useMutation,
} from "urql";
import { withUrqlClient } from "next-urql";
import {
  LoginUserDocument,
  LoginUserMutation,
  LoginUserMutationVariables,
} from "@/gql/graphql";
import { SERVER_URL } from "@/lib/urql";
import { useGlobalContext } from "@/context/context";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [state, LoginMutation] = useMutation(LoginUserDocument);

  const { data, setData } = useGlobalContext();

  const HandleLogin = async (data: any) => {
    const datas: OperationResult<
      LoginUserMutation,
      LoginUserMutationVariables
    > = await LoginMutation(data);

    if (!datas.data?.login) {
      console.log(datas);

      setError("Invalid username or password");
    } else {
      console.log(datas);
      setError("");
      setData(datas.data.login.admin);
      // location.reload();
      router.push("/admin");
    }

  };

  return (
    <div className="flex h-screen justify-between gap-10">
      <div className="bg-v-line bg-cover w-48"></div>
      <div className="flex flex-col justify-center gap-8">
        <div className="mx-auto">
          <img
            src="/img/logo/icon.svg"
            alt="logo"
            className="h-40 lg:h-56 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            HandleLogin({
              username: username,
              password: password,
            });
          }}
        >
          <label className="flex gap-1 justify-center cursor-pointer">
            <div className="bg-yellow rounded-full w-10 h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
                className="m-auto mt-3 "
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </div>

            <input
              type="text"
              className="rounded-full px-3 h-10
               border-yellow border-dashed border-2"
              placeholder="Username"
              onChange={(e: any) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="flex justify-center gap-1 cursor-pointer">
            <div className="bg-yellow rounded-full w-10 h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
                className="m-auto mt-3 "
              >
                <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
              </svg>
            </div>

            <input
              type="password"
              className="rounded-full px-3 h-10
            border-yellow border-dashed border-2"
              placeholder="Password"
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
          </label>
          <p className="text-center text-sm">{error && <span>{error}</span>}</p>

          <button
            type="submit"
            className="bg-brown  rounded-full w-20 transition-colors duration-300 text-white border-brown border hover:bg-yellow m-auto mt-2 h-10"
          >
            {
              state.fetching ? <>
                {/* loading bar with ring */}
                <svg className="animate-spin m-auto -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>

              </> : "Login"
            }
          </button>
        </form>
      </div>
      <div className="bg-v-line bg-cover w-48"></div>
    </div>
  );
}

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [fetchExchange, cacheExchange] as any,
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(Login);
