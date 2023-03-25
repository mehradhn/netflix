import React, { useState, useCallback } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import { ChangeEvent } from "react";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("SIGN IN");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "SIGN IN" ? "SIGN UP" : "SIGN IN"
    );
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full min-h-screen lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" width={123} height={50} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "SIGN IN" ? "SIGN IN" : "SIGN UP"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "SIGN UP" && (
                <Input
                  label="Username"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  id="username"
                  type="string"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                id="email"
                type="string"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                id="password"
                type="string"
                value={password}
              />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "SIGN IN" ? "SIGN IN" : "SIGN UP"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "SIGN UP"
                ? "Already have an account?"
                : "First time using NetFlix? "}
              <span
                onClick={toggleVariant}
                className="text-white ml-3 hover:underline cursor-pointer"
              >
                {variant === "SIGN UP" ? "Log In" : "Create an account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
