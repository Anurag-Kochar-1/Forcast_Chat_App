import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import { supabase } from "../../setup/supabase/client";

const Header = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useContext(AppContext);
  const [authType, setAuthType] = useState<string>("signUp");

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(4)
      .max(15)
      .required("Username is required please"),
    email: yup.string().email().required("Enter a valid Email"),
    password: yup
      .string()
      .min(4)
      .max(15)
      .required("Password > 4 && Password < 15 "),
  });

  const signInSchema = yup.object().shape({
    email: yup.string().email().required("Enter a valid Email"),
    password: yup
      .string()
      .min(4)
      .max(15)
      .required("Password > 4 && Password < 15 "),
  });

  type FormData = yup.InferType<typeof schema>;
  type FormData_2 = yup.InferType<typeof signInSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(authType == "signUp" ? schema : signInSchema),
  });

  const signUp = async (userData: any) => {
    console.log(`createUser is running`)
    const { data, error } = await supabase.auth.signUp({
      email: userData?.email,
      password: userData?.password,
      options: {
        data: {
          username: userData?.username,
        },
      },
    });

    console.log(data)
    console.log(error)
  };

  const signIn = async (userData: any) => {
    console.log(`getUser is running`)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData?.email,
      password: userData?.password,
    })
    console.log(data)
    console.log(error)
  }

  const onSubmit = async (data: FormData) => {
    console.log(data);
    if(authType === 'signUp') signUp(data);
    else if (authType === 'signIn') signIn(data)
  };

  return (
    <header className="sticky top-0 left-0 w-full h-20 bg-brand text-white flex items-center justify-between z-10 px-10">
      <h1 className="text-2xl">My App</h1>

      <div className="flex justify-center items-center space-x-3">
        <button onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}>
          Sign Up
        </button>
      </div>

      <Modal isModalOpen={isAuthModalOpen} setIsModalOpen={setIsAuthModalOpen}>
        <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[20vw] bg-white text-black font-bold text-lg flex flex-col justify-start items-center p-4">
          <h4>
            {" "}
            {authType == "signUp"
              ? "Create an Account"
              : "Sign in your account"}{" "}
          </h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-start space-y-2"
          >
            {authType === "signUp" && (
              <TextField
                type="text"
                placeholder=""
                label="Username"
                name="username"
                registerRef={register}
                error={errors?.username?.message}
              />
            )}
            <TextField
              type="email"
              placeholder=""
              label="Email"
              name="email"
              registerRef={register}
              error={errors?.email?.message}
            />
            <TextField
              type="password"
              placeholder=""
              label="Password"
              name="password"
              registerRef={register}
              error={errors?.password?.message}
            />

            <Button type="submit">
              {" "}
              {authType === "signUp" ? "Sign In" : "Sign Up"}{" "}
            </Button>
          </form>
          <span
            onClick={() =>
              setAuthType(authType === "signUp" ? "signIn" : "signUp")
            }
          >
            {authType === "signUp"
              ? "Already an User? Sign in"
              : "New User? Sign Up"}
          </span>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
