import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className=" w-full min-w-[320px] max-w-[425px] min-h-screen flex items-center justify-center p-4 bg-gray-800 backdrop-blur-xl border rounded-2xl border-gray-600 shadow-2xl">
      <div className=" w-full min-w-[320px] max-w-[425px] p-8">
        {/* HEADING TEXT */}
        <div className="text-center mb-8">
          <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h2 className="text-2xl font-bold text-slate-200 mb-2">
            Create Account
          </h2>
          <p className="text-slate-400">Sign up for a new account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* FULL NAME */}
          <div>
            <label className="auth-input-label">Username</label>
            <div className="relative">
              <UserIcon className="auth-input-icon" />

              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="input"
                placeholder="Your Name"
              />
            </div>
          </div>

          {/* EMAIL INPUT */}
          <div>
            <label className="auth-input-label">Email</label>
            <div className="relative">
              <MailIcon className="auth-input-icon" />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input"
                placeholder="youremail@gmail.com"
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label className="auth-input-label">Password</label>
            <div className="relative">
              <LockIcon className="auth-input-icon" />

              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button className="auth-btn" type="submit" disabled={isSigningUp}>
            {isSigningUp ? (
              <LoaderIcon className="w-full h-5 animate-spin text-center" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="auth-link">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;