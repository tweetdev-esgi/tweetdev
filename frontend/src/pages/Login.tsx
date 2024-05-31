import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm.tsx';
import { login } from '../api/auth.ts';
import toast from 'react-hot-toast';
import { useAuth } from '../provider/AuthProvider';

function Login() {
  const navigate = useNavigate();
  const { loginAndSetToken } = useAuth(); 

  const handleLoginSubmit = async (formData: any) => {
    try {
      const token = await login(formData);
      if (token) {
        loginAndSetToken(token); 
        navigate('/');
      }
      toast.success("Logged in !", {duration: 4000});


   
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      toast.error('Bad credentials.', {duration: 4000});

    }
  };
  return (
    <div>
      <AuthForm
          title="Connectez-vous"
          buttonText="Connexion"
          onSubmit={(formData: any) => handleLoginSubmit(formData)}
      />
      </div>
  );
}

export default Login;


