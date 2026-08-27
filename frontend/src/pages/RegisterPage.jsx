import LoggedOutLayout from "../components/layout/LoggedOutLayout";

const RegisterPage = () => {
  return (
    <LoggedOutLayout 
      title="Dołącz do Saldoo :)"
      subtitle="Załóż konto"
      buttonText="Zarejestruj się"
      isLogin={false}
      showNameField={true}
      showConfirmPassword={true}
    />
  );
};

export default RegisterPage;