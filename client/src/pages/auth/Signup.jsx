import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validationSchemas/schema";
import { AuthContext } from "../../context/AuthContext";
import { Button, LinkButton } from "../../shared/ui/Button";
import FormField from "../../shared/ui/FormField";

const Signup = () => {
    const { signup, error } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(signupSchema) });

    const onSubmit = async (data) => {
        await signup(data);
    };

    return (
        <div className="px-8 xs:px-0 flex overflow-x-auto min-h-screen bg-[url('/bg-image.png')] bg-cover bg-center bg-slate-700/90 bg-blend-multiply items-center xs:justify-center">
            <div className='w-full max-w-md px-6 sm:px-8 py-4 bg-white border border-gray-200 shadow-xl rounded-2xl backdrop-blur-2xl min-w-xs sm:max-w-lg'>
                <div className='mb-4 text-center'>
                    <h1 className='mb-2 text-2xl font-bold capitalize'>Create Account</h1>
                    <p className='text-sm text-gray-500'>Signup to start shopping</p>
                </div>
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-4'>
                    <FormField
                        name='name'
                        label='Name'
                        placeholder='Enter your fullname'
                        register={register("name")}
                        error={errors.name}
                        required={true}
                    />
                    <FormField
                        name='email'
                        label='Email'
                        type='email'
                        placeholder='Enter your email'
                        register={register("email")}
                        error={errors.email}
                        required={true}
                    />
                    <FormField
                        name='password'
                        label='Password'
                        type='password'
                        placeholder='********'
                        register={register("password")}
                        error={errors.password}
                        className='placeholder:tracking-widest'
                        required={true}
                    />
                    <FormField
                        name='phone'
                        label='Mobile Number'
                        placeholder='Enter mobile number'
                        register={register("phone")}
                        error={errors.phone}
                        required={true}
                    />
                    {error && <p className='text-xs font-semibold text-red-500'>{error}</p>}
                    <Button
                        size='lg'
                        variant='primary'
                        type='submit'
                        disabled={isSubmitting}
                        className={`w-full ${isSubmitting && "bg-green-700"}`}>
                        {isSubmitting ? (
                            <>
                                <Loader className='animate-spin' /> <span className='font-bold tracking-widest'>Creating....</span>
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                    <p className='text-sm text-center text-gray-500'>
                        Already have an account?
                        <LinkButton
                            to={"/login"}
                            className='text-green-600 hover:underline'>
                            Login
                        </LinkButton>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
