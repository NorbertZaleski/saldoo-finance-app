const LoggedOutLayout = () => {
  return (
    <div 
      className={`
        flex min-h-screen 
        bg-[url('/src/assets/bg.png')] 
        bg-cover bg-center bg-no-repeat
      `}
    >

        <main className="flex justify-center border border-solid border-white/20 rounded-xl bg-bg/60 overflow-hidden mx-auto my-auto">
        
            <div className="flex-1 relative overflow-hidden">
                <img 
                src="/src/assets/man-login.png" 
                alt="Login" 
                className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                <img src="/src/assets/logo.png" alt="Logo" className="h-10 w-auto" />
                </div>
                <div className="absolute bottom-4 left-4 text-white/80 text-sm font-light">
                tekst
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white/5">
                <div className="w-full max-w-sm">                
                        <h2 className="text-4xl font-bold mb-2 text-center text-white/80">Witaj w Saldoo :)</h2>
                        <p className="text-white/60 text-center mb-6">Zaloguj się do swojego konta</p>
                    
                    <form className="space-y-4">
                        <input 
                        type="email" 
                        placeholder="Adres email lub telefon" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <input 
                        type="password" 
                        placeholder="Hasło" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold">
                            Zaloguj się
                        </button>
                        <div>
                            <span className="text-white/60">-- Lub -- </span>
                        </div>
                        <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold">
                            Kontynuuj z Google
                        </button>
                    </form>
                </div>
            </div>
        </main>
    </div>
  );
};

export default LoggedOutLayout;