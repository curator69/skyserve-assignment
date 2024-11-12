import { useRouter } from "next/router";
import { authService } from "@/services/api";
import useStore from "@/store/useStore";
import toast from "react-hot-toast";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";

export default function Register() {
  const router = useRouter();
  const { setAuth } = useStore();

  const handleSubmit = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await authService.register(name, email, password);
      localStorage.setItem("token", response.token);
      setAuth(true, response.user);
      router.push("/dashboard");
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <RegisterForm onSubmit={handleSubmit} />
        <div className="text-center">
          <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
