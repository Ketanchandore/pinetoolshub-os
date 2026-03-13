import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectPageProps {
  to: string;
}

const RedirectPage = ({ to }: RedirectPageProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
};

export default RedirectPage;
