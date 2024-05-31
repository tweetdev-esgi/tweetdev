
import { useNavigate } from 'react-router-dom';
import AuthForm from "../components/AuthForm.tsx";
import { subscribe } from '../api/auth.ts';
import toast from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();

  const handleSignupSubmit = async (formData: any) => {
    try {
      await subscribe({
        login: formData.login,
        password: formData.password,
        username:"test",
        image: "https://example.com/profile.jpg",
        aboutMe: "Développeur passionné par les technologies web, spécialisé en React et Node.js. J'aime partager mes connaissances et collaborer sur des projets open source.",
        joinDate: new Date("2022-01-15")
      });
      toast.success("Account created !", {duration: 4000});
      navigate('/login');
    } catch (error) {
      toast.error('Bad credentials.', {duration: 4000});
    }
  };

  return (
      <AuthForm
          title="Inscrivez-vous"
          buttonText="Inscription"
          onSubmit={handleSignupSubmit}
      />
  );
}

export default Signup;
