import React, { useState, useCallback } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import { ChangeEvent } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isvisible, setIsVisible] = useState(false);

  const [variant, setVariant] = useState("SIGN IN");
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "SIGN IN" ? "SIGN UP" : "SIGN IN"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log("hoyyy", error);
    }
  }, [email, name, password, login]);

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
              <div className="relative">
                <Input
                  label="Password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  id="password"
                  type={isvisible === true ? "string" : "password"}
                  value={password}
                />
                {isvisible === true ? (
                  <AiOutlineEye
                    size={27}
                    className=" absolute top-0 h-full right-2"
                    onClick={() => setIsVisible(!isvisible)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={27}
                    className=" absolute top-0 h-full right-2"
                    onClick={() => setIsVisible(!isvisible)}
                  />
                )}
              </div>
            </div>
            <button
              onClick={variant === "SIGN IN" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "SIGN IN" ? "SIGN IN" : "SIGN UP"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>
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
