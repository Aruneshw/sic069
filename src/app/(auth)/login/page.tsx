"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { getAssetUrl } from "@/lib/trips";
import { Compass, Loader2, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";

/* ── Social SSO Buttons ── */
const SocialButtons = ({ onGoogleLogin, loading }: { onGoogleLogin: () => void; loading: boolean }) => (
  <div className="sso">
    <button
      type="button"
      onClick={onGoogleLogin}
      disabled={loading}
      className="sso-btn"
      title="Continue with Google"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    </button>
    <button
      type="button"
      onClick={onGoogleLogin}
      disabled={loading}
      className="sso-btn"
      title="Continue with Explorer ID"
    >
      <Compass size={18} />
    </button>
  </div>
);

/* ── Main Export Component ── */
export default function LoginPage() {
  const router = useRouter();
  const [isSignupActive, setIsSignupActive] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const toggleView = () => {
    setIsSignupActive((prev) => !prev);
  };

  const handleGoogleLogin = async () => {
    try {
      setOauthLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate Google Login.");
      setOauthLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.error("Please provide both email and password.");
      return;
    }
    try {
      setLoginLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      if (error) throw error;

      toast.success("Welcome back!");
      if (loginEmail.trim().toLowerCase() === "aruneshownsty1@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Invalid login credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim() || !regPassword.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      setRegLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: regEmail.trim(),
        password: regPassword,
        options: {
          data: {
            full_name: regName.trim(),
          },
        },
      });
      if (error) throw error;
      toast.success("Account created! Check your email to verify or log in.");
      toggleView();
    } catch (err: any) {
      toast.error(err.message || "Failed to sign up.");
    } finally {
      setRegLoading(false);
    }
  };

  const activeClass = isSignupActive ? "signup" : "";

  return (
    <div className="auth-container">
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* Ambient background video & glow */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        >
          <source
            src={getAssetUrl("/videos/login_background.mp4")}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/70 to-teal-950/85 backdrop-blur-[4px]" />
      </div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Sliding Glassmorphic Diagonal Card */}
      <div className="card">
        {/* Diagonal Sliding Backgrounds */}
        <div className={`card-bg card-bg-1 ${activeClass}`}></div>
        <div className={`card-bg card-bg-2 ${activeClass}`}></div>

        {/* Logos (Icons in this case) */}
        <div className={`logo logo-1 ${activeClass}`}>
          <Compass size={32} className="text-[#F7B538]" />
        </div>
        <div className={`logo logo-2 ${activeClass}`}>
          <Compass size={32} className="text-[#F7B538]" />
        </div>

        {/* --- SIGN IN FORM (Left Side) --- */}
        <div className={`form signin ${activeClass}`}>
          <div className="form-content">
            <h2>Sign In</h2>
            <SocialButtons onGoogleLogin={handleGoogleLogin} loading={oauthLoading || loginLoading} />
            <p className="subtext">Or use your email credentials</p>
            
            <form onSubmit={handleLogin}>
              <div className="auth-input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
              <div className="auth-input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>

              <a
                onClick={() => toast("Password reset link will be sent to your email.")}
                className="forgot-link"
              >
                Forgot password?
              </a>

              <button type="submit" disabled={loginLoading} className="auth-submit-btn">
                {loginLoading ? <Loader2 size={16} className="animate-spin" /> : (
                  <>Sign In <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <a onClick={toggleView} className="toggle-link">
              Don't have an account?
              <em>Sign Up</em>
            </a>
          </div>
        </div>

        {/* --- SIGN UP FORM (Right Side) --- */}
        <div className={`form signup ${activeClass}`}>
          <div className="form-content">
            <h2>Register</h2>
            <SocialButtons onGoogleLogin={handleGoogleLogin} loading={oauthLoading || regLoading} />
            <p className="subtext">Or use your email to register</p>
            
            <form onSubmit={handleRegister}>
              <div className="auth-input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
              <div className="auth-input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
              <div className="auth-input-group">
                <input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="auth-input"
                  required
                  minLength={6}
                />
              </div>

              <button type="submit" disabled={regLoading} className="auth-submit-btn">
                {regLoading ? <Loader2 size={16} className="animate-spin" /> : (
                  <>Sign Up <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <a onClick={toggleView} className="toggle-link">
              Already have an account?
              <em>Sign In</em>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
