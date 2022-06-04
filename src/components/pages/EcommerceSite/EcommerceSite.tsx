import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeProfile,
  saveProfile,
} from "../../../store/ProfileSlice/ProfileSlice";
import Header from "../../parts/header/header";

const EcommerceSite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/identification", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data }) => {
        dispatch(saveProfile({ profile: data }));
        setConnected(true);
      })
      .catch((e) => {
        setConnected(false);
        dispatch(removeProfile());
      });
  }, []);

  const refresh = () => {
    setConnected(!connected);
  };

  return <Header connected={connected} refresh={refresh} />;
};

export default EcommerceSite;
