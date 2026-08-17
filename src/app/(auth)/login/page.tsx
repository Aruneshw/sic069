"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { getAssetUrl } from "@/lib/trips";
import { Compass, Loader2, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";

/* ── 1. Sliding Hero Background ── */
const CardBackground = ({ activeView }: { activeView: string }) => (
  <div
    className={`card-bg ${activeView === "login" ? "login" : ""}`}
    aria-hidden="true"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 via-navy-950/40 to-teal-900/60 mix-blend-overlay" />
  </div>
);

/* ── 2. Social SSO Buttons ── */
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

/* ── 3. Sliding Hero Panel Component ── */
const HeroPanel = ({
  type,
  activeView,
  title,
  text,
  buttonText,
  onToggle,
}: {
  type: "login" | "register";
  activeView: string;
  title: string;
  text: string;
  buttonText: string;
  onToggle: () => void;
}) => (
  <div className={`hero ${type} ${activeView === type ? "active" : ""}`}>
    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(45,212,191,0.3)]">
      <Compass size={24} className="text-teal-300" />
    </div>
    <h2>{title}</h2>
    <p>{text}</p>
    <button type="button" onClick={onToggle}>
      {buttonText}
    </button>
  </div>
);

/* ── 4. Register Form Component ── */
const RegisterForm = ({
  activeView,
  onGoogleLogin,
  onToggle,
}: {
  activeView: string;
  onGoogleLogin: () => void;
  onToggle: () => void;
}) => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) throw error;

      toast.success("Account created! Check your email to verify or log in.");
      onToggle();
    } catch (err: any) {
      toast.error(err.message || "Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`auth-form-panel register ${
        activeView === "register" ? "active" : ""
      }`}
    >
      <h2>Create Account</h2>
      <SocialButtons onGoogleLogin={onGoogleLogin} loading={loading} />
      <p className="subtext">Or use your email to register</p>
      
      <form onSubmit={handleRegister} className="auth-form-content">
        <div className="auth-input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <div className="auth-input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <div className="auth-input-group">
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
            minLength={6}
          />
        </div>
        <button type="submit" disabled={loading} className="auth-submit-btn">
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Sign Up <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      {/* Mobile toggle helper */}
      <button
        type="button"
        onClick={onToggle}
        className="mobile-toggle-btn md:hidden"
      >
        Already have an account? Sign In
      </button>
    </div>
  );
};

/* ── 5. Login Form Component ── */
const LoginForm = ({
  activeView,
  onGoogleLogin,
  onToggle,
}: {
  activeView: string;
  onGoogleLogin: () => void;
  onToggle: () => void;
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please provide both email and password.");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      toast.success("Welcome back!");

      // Route admin vs user
      if (email.trim().toLowerCase() === "aruneshownsty1@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`auth-form-panel login ${
        activeView === "login" ? "active" : ""
      }`}
    >
      <h2>Sign In</h2>
      <SocialButtons onGoogleLogin={onGoogleLogin} loading={loading} />
      <p className="subtext">Or use your email credentials</p>

      <form onSubmit={handleLogin} className="auth-form-content">
        <div className="auth-input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <div className="auth-input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button type="submit" disabled={loading} className="auth-submit-btn">
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Sign In <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      {/* Mobile toggle helper */}
      <button
        type="button"
        onClick={onToggle}
        className="mobile-toggle-btn md:hidden"
      >
        Don&apos;t have an account? Sign Up
      </button>
    </div>
  );
};

/* ── 6. Main Export Component ── */
export default function LoginPage() {
  const [activeView, setActiveView] = useState<"login" | "register">("login");
  const [oauthLoading, setOauthLoading] = useState(false);

  const toggleView = () => {
    setActiveView((prev) => (prev === "login" ? "register" : "login"));
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

      {/* Sliding Glassmorphic Card Container */}
      <div className="auth-card relative z-10">
        <CardBackground activeView={activeView} />

        {/* Register Side Hero (Shown when activeView === 'register') */}
        <HeroPanel
          type="register"
          activeView={activeView}
          title="Welcome Back"
          text="Sign in to track your small-group regional expeditions and transparent itineraries."
          buttonText="Sign In"
          onToggle={toggleView}
        />

        {/* Register Form (Shown on the right when activeView === 'register') */}
        <RegisterForm
          activeView={activeView}
          onGoogleLogin={handleGoogleLogin}
          onToggle={toggleView}
        />

        {/* Login Side Hero (Shown when activeView === 'login') */}
        <HeroPanel
          type="login"
          activeView={activeView}
          title="Hello Explorer"
          text="Enter your credentials and start planning your bespoke zero-gravity journey."
          buttonText="Sign Up"
          onToggle={toggleView}
        />

        {/* Login Form (Shown on the left when activeView === 'login') */}
        <LoginForm
          activeView={activeView}
          onGoogleLogin={handleGoogleLogin}
          onToggle={toggleView}
        />
      </div>
    </div>
  );
}
