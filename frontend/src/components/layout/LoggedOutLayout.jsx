import { useNavigate } from "react-router-dom";

const LoggedOutLayout = ({ 
  children, 
  title, 
  subtitle, 
  buttonText, 
  isLogin,
  showNameField = false,
  showConfirmPassword = false,
  alternativeText = "-- Lub --",
  googleButtonText = "Kontynuuj z Google",
  showRedirectButton = true
}) => {

    const navigate = useNavigate();

    const handleAlternativeRedirect = () => {
        if (isLogin) {
            navigate('/register');
        } else {
            navigate('/login');
        }
        };


  return (
    <div 
      className={`
        flex min-h-screen 
        bg-[url('/src/assets/bg.png')] 
        bg-cover bg-center bg-no-repeat
      `}
    >
      <main className="flex justify-center border border-solid border-white/20 rounded-xl bg-bg/60 overflow-hidden mx-auto my-auto 
      w-[90vw] max-w-[1000px] h-[80vh] max-h-[700px] min-h-[500px]">
        
        <div className="flex-1 relative overflow-hidden">
          <img 
            src="/src/assets/man-login.png" 
            alt="Login" 
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute top-4 right-4">
            <img src="/src/assets/logo.png" alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="absolute bottom-0 left-0 text-white/80 text-sm font-light bg-black/30 w-full">
            <span className="p-4 block">tekst</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white/5">
          <div className="w-full max-w-sm">
            {children || (
              <>
                <h2 className="text-4xl font-bold mb-2 text-center text-white/80">
                  {title}
                </h2>
                <p className="text-white/60 text-center mb-6">
                  {subtitle}
                </p>
                
                <form className="space-y-4">
                    {showNameField && (
                    <input 
                        type="text" 
                        placeholder="Imię i nazwisko" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    />
                    )}

                    <input 
                    type="email" 
                    placeholder="Adres email" 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    />

                    {!isLogin && (
                    <input 
                        type="text" 
                        placeholder="Nazwa użytkownika" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    />
                    )}
                    <input 
                    type="password" 
                    placeholder="Hasło" 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    />

                    {showConfirmPassword && (
                    <input 
                        type="password" 
                        placeholder="Potwierdź hasło" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    />
                    )}

                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold">
                    {buttonText}
                    </button>
                  
                    <div className="flex items-center gap-4 text-white/60">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-sm whitespace-nowrap">Lub</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>
                  
                    <button className="w-full bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition font-semibold border border-white/20">
                        {googleButtonText}
                    </button>
                  

                    {showRedirectButton && (
                    <button
                    type="button"
                    className="w-full bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition font-semibold border border-white/20 mt-2"
                    onClick={handleAlternativeRedirect}
                    >
                    {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
                    </button>
                    )}

                </form>
              </>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default LoggedOutLayout;