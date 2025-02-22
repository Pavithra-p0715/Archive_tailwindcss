export interface SignUpProps {
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  error: string | null;
  setError: (error: string | null) => void;
  message: string;
  setMessage: (message: string) => void;
  handleRegister: (
    event: React.FormEvent,
    formData: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    setError: (error: string | null) => void,
    setMessage: (message: string) => void,
    setShowSignUp: (show: boolean) => void
  ) => void;
  setShowSignUp: (show: boolean) => void;
}
