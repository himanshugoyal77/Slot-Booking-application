import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigator = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;

  useEffect(() => {
    if (user) {
      navigator("/dashboard");
    } else {
      navigator("/login");
    }
  }, [user]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
