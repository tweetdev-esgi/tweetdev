
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
        profileImageUrl: "https://cdn.hero.page/0afb509c-1859-4ed9-a529-6c8ea2711b51-aesthetic-anime-and-manga-pfp-from-jujutsu-kaisen-chapter-233-page-3-pfp-3",
        backgroundImageUrl:"https://ca-times.brightspotcdn.com/dims4/default/7f5e489/2147483647/strip/true/crop/1645x740+0+0/resize/1200x540!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5c%2Fc3%2Fc6a1006b4b7bb5fbb498ee182b4d%2Fjujutsukaisen02.jpg",
        aboutMe: "Développeur passionné par les technologies web, spécialisé en React et Node.js. J'aime partager mes connaissances et collaborer sur des projets open source.",
        joinDate: new Date()
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
