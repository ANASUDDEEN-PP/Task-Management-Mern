import { useState } from "react";
import { motion } from "framer-motion";
import "./auth.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <h2 className="title">{isLogin ? "Login" : "Sign Up"}</h2>
          <div className="card-content">
            <form className="form">
              {!isLogin && <input type="text" placeholder="Full Name" className="input" />}
              <input type="email" placeholder="Email" className="input" />
              <input type="password" placeholder="Password" className="input" />
              {!isLogin && <input type="password" placeholder="Confirm Password" className="input" />}
              <button className="button">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"} 
              <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
