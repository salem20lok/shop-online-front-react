import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveProfile } from "../../../store/ProfileSlice/ProfileSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/identification", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data }) => {
        dispatch(saveProfile({ profile: data }));
      })
      .catch((e) => {
        navigate("/login");
        console.log(e.response.data.message);
      });
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
