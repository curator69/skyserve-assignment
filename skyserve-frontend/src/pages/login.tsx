import { useRouter } from "next/router";
import { authService } from "@/services/api";
import useStore from "@/store/useStore";
import toast from "react-hot-toast";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  const router = useRouter();
  const { setAuth } = useStore();

  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("token", response.token);
      setAuth(true, response.user);
      router.push("/dashboard");
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm onSubmit={handleSubmit} />
        <div className="text-center">
          <Link
            href="/register"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
