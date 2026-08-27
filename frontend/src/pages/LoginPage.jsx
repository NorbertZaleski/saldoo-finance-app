import LoggedOutLayout from "../components/layout/LoggedOutLayout";

const LoginPage = () => {
  return (
    <LoggedOutLayout 
      title="Witaj w Saldoo :)"
      subtitle="Zaloguj się do swojego konta"
      buttonText="Zaloguj się"
      isLogin={true}
    />
  );
};

export default LoginPage;