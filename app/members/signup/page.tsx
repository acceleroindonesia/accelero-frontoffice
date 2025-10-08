import Link from "next/link";
import { type Metadata } from "next";
import Form from "./components/Form";
import "../../styles/auth.css";

const Page: React.FC = () => (
  <div className="auth-page">
    <Link href="/" className="auth-logo-link">
      <div className="auth-logo">
        <span className="logo-icon">🎓</span>
        <span className="logo-text">Accelero Foundation</span>
      </div>
    </Link>

    <div className="auth-container">
      <div className="auth-header">
        <h1>Create Account</h1>
        <p>
          Join Accelero Foundation and start making a difference in education.
        </p>
      </div>

      <Form />

      <div className="auth-footer">
        <p>
          Already have an account?{" "}
          <Link href="/members/signin">Sign in here</Link>
        </p>
      </div>
    </div>

    <div className="auth-back-home">
      <Link href="/">← Back to Home</Link>
    </div>
  </div>
);

const title = "Sign Up - Accelero Foundation";
const canonical = "https://accelero.vercel.app/members/signup";
const description =
  "Create your Accelero Foundation account and join us in transforming education across Indonesia";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "sign up, register, accelero foundation, education, volunteer, donate",
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    siteName: "Accelero Foundation",
    images: "/logo192.png",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo192.png"],
  },
};

export default Page;