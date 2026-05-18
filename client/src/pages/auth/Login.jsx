import { useContext } from "react";
import { Loader, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validationSchemas/schema";
import { AuthContext } from "../../context/AuthContext";
import { Button, LinkButton } from "../../shared/ui/Button";
import FormField from "../../shared/ui/FormField";

const Login = () => {
    const { login, error } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(loginSchema) });

    const onSubmit = async (data) => {
        const res = await login(data);
        if (res) reset();
    };
    return (
        <>
            <div className="px-8 xs:px-0 flex overflow-x-auto min-h-screen bg-[url('/bg-image-2.png')] bg-cover bg-center bg-slate-700/90 bg-blend-multiply items-center xs:justify-center">
                <div className='w-full max-w-md px-6 sm:px-8 py-4 bg-white border border-gray-200 shadow-xl rounded-2xl backdrop-blur-2xl min-w-xs sm:max-w-lg'>
                    <div className='mb-6 text-center'>
                        <h1 className='mb-2 text-2xl font-bold capitalize'>Welcome Back</h1>
                        <p className='text-sm text-gray-500'>Login to continue shopping</p>
                    </div>
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className='space-y-4'>
                        <FormField
                            label='Email'
                            type='email'
                            placeholder='Enter your email'
                            register={register("email")}
                            error={errors.email}
                            required={true}
                            icon={Mail}
                            splitIcon
                        />
                        <FormField
                            label='Password'
                            type='password'
                            placeholder='********'
                            register={register("password")}
                            error={errors.password}
                            className='placeholder:tracking-widest'
                            required={true}
                            icon={Lock}
                            splitIcon
                        />
                        {error && <p className='text-xs font-semibold text-red-500'>{error}</p>}
                        <Button
                            size='lg'
                            type='submit'
                            variant='primary'
                            disabled={isSubmitting}
                            className={`w-full ${isSubmitting && "bg-green-700"}`}>
                            {isSubmitting ? (
                                <>
                                    <Loader className='animate-spin' /> <span className='font-bold tracking-widest'>Logging In....</span>
                                </>
                            ) : (
                                "Log In"
                            )}
                        </Button>
                        <p className='text-sm text-center text-gray-500'>
                            Don't have an account?
                            <LinkButton
                                variant='plain'
                                to={"/signup"}
                                className='text-green-600 hover:underline'>
                                Create Account
                            </LinkButton>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
