import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AdminContext } from "../../Context/AdminContext";

const BackDrop = () => {
  const { isLoading } = useContext(AdminContext);
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
