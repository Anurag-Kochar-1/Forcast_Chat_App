import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import { supabase } from "../../setup/supabase/client";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import HamBurgerMenu from "../HamBurgerMenu/HamBurgerMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useContext(AppContext);
  const [authType, setAuthType] = useState<string>("signUp");
  const {
    userDetails,
    setUserDetails,
    isHamBurgerMenuVisible,
    setIsHamBurgerMenuVisible,
  } = useContext(AppContext);

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

  const getUser = async () => {
    const data = await supabase.auth.getUser();
    console.log(data);
  };

  const signUp = async (userData: any) => {
    const res = await supabase.from("users").insert({
      email: userData?.email,
      password: userData?.password,
      username: userData?.username,
    });

    if (res.status === 409) {
      alert("Username already exits");
    }

    if (res.status === 201) {
      const { data, error } = await supabase.auth.signUp({
        email: userData?.email,
        password: userData?.password,
        options: {
          data: {
            username: userData?.username,
          },
        },
      });
    }

    console.log(res);
  };

  const signIn = async (userData: any) => {
    console.log(`getUser is running`);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData?.email,
      password: userData?.password,
    });
    console.log(data);
    console.log(error);
  };

  const signOut = async () => {
    const data = await supabase.auth.signOut();
    if (data.error === null) setUserDetails(null);
  };

  const onSubmit = async (data: FormData) => {
    // console.log(data);
    if (authType === "signUp") signUp(data);
    else if (authType === "signIn") signIn(data);
  };

  return (
    <header className="sticky top-0 left-0 w-full h-20 bg-brand text-white flex items-center justify-between z-10 px-5 md:px-10">
      <div className="flex justify-center items-center space-x-4">
        {!isHamBurgerMenuVisible ? (
          <RxHamburgerMenu
            className="md:hidden w-6 h-6 text-Dark hover:cursor-pointer"
            onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)}
          />
        ) : (
          <RxCross1
            className="md:hidden w-6 h-6 text-Dark hover:cursor-pointer"
            onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)}
          />
        )}

        <Link
          to={`/`}
          className="text-xl font-semibold text-white"
          onClick={() => {
            console.log(userDetails);
          }}
        >
          Anurag Kochar
        </Link>
      </div>

      <div className="flex justify-center items-center space-x-3">
        {userDetails === null && (
          <Button
            variant="SECONDARY"
            onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
          >
            Sign Up
          </Button>
        )}

        {userDetails !== null && (
          <Button variant="SECONDARY" onClick={signOut}>
            {" "}
            Sign out{" "}
          </Button>
        )}
      </div>

      <Modal isModalOpen={isAuthModalOpen} setIsModalOpen={setIsAuthModalOpen}>
        <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[20vw] bg-white text-black font-bold text-lg flex flex-col justify-start items-center px-4 py-6 overflow-x-hidden overflow-y-auto">
          <h4 className="text-3xl font-medium text-black my-5">
            {authType == "signUp"
              ? "Create an Account"
              : "Sign in your account"}{" "}
          </h4>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-start space-y-2 py-5"
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
            className="text-base font-medium hover:cursor-pointer"
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
