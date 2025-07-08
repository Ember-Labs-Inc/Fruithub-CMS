
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login by default
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">Fruithub CMS</h1>
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
