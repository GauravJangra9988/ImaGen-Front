import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/credits", {
        headers: { token },
      });
      console.log("Credits response", data); // helpful debug
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (err) {}
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendURL,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logOut,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
