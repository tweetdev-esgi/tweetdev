import { useState } from "react";
import "../styles/AuthForm.css";

function AuthForm({ title, buttonText, onSubmit }: { title: string, buttonText: string, onSubmit: (formData: any) => void }) {
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="auth-title">{title}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="auth-label">Identifiant</label>
            <input
              className="auth-input"
              type="text"
              autoComplete="identifiant"
              name="login"
              value={formData.login}
              onChange={handleChange}
              required
            />
            <br />
            <br/>
          </div>

          <div>
            <label className="auth-label">Mot de passe</label>
            <input
              className="auth-input"
              type="password"
              autoComplete="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
          </div>

          <div>
            <button type="submit" className="auth-button">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
