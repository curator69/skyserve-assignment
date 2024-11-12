import { useRouter } from "next/router";
import useStore from "@/store/useStore";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, logout } = useStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">SkyServe</h1>
          </div>
          {isAuthenticated && (
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
