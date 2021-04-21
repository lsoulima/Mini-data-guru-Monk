import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

const LabelImage = styled.label`
  cursor: pointer;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  input {
    display: none;
  }
  img {
    border-radius: 100%;
    width: 150px;
    height: 150px;
  }
`;

export default function Workflow() {
  // const handleChange = (event, newValue) => {
  //   setTab(newValue);
  // };

  // const onFileChange = async (e) => {
  //   const res = await ImgUpAction(state.token, e);
  //   if (res.success) {
  //     setImg(res.data);
  //   }
  // };

  return (
    <div style={{ height: "100%" }}>
      <Typography
        component="h1"
        variant="h5"
        style={{
          fontSize: "20px",
          fontWeight: 600,
          padding: "20px",
        }}
      >
        Status 1
      </Typography>
      <form
      // onSubmit={handleSubmit(onSubmit)}
      >
        <div
          style={{
            height: "20vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LabelImage type="file">
            <Avatar>
              <PhotoLibraryIcon />
            </Avatar>
            <input
              type="file"
              accept="image/*"
              // onChange={(e) => onFileChange(e.target.files[0])}
            />
          </LabelImage>
        </div>
      </form>
    </div>
  );
}
