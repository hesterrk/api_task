import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [userData, setUserData] = useState(initialState);
  const history = useHistory();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  var config = {
    method: "post",
    url: "https://edocsapi.azurewebsites.net/Auth/api/Login",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        'Digest username="{{appToken}}" realm="_root_" password=""',
    },
    data: userData,
  };

  const onLogin = (e) => {
    e.preventDefault();
    axios(config)
      .then((res) => {
        const getToken = JSON.stringify(res.data.Result.auth.token);

        localStorage.setItem("token", getToken);
        setUserData(initialState);
        history.push("/result-list");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Div>
      <Form onSubmit={onLogin}>
        <Label>
          Username:
          <Input
            type="text"
            name="username"
            placeholder="Please enter username"
            onChange={handleChange}
            value={userData.username}
          />
        </Label>

        <Label>
          Password:
          <Input
            type="password"
            name="password"
            placeholder="Please enter password"
            onChange={handleChange}
            value={userData.password}
          />
        </Label>

        <Button>Log In</Button>
      </Form>
    </Div>
  );
}

const initialState = {
  username: "",
  password: "",
};

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 350px;
`;

const Div = styled.div`
  background: lavender;
  padding: 20px 0px 20px 0px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  box-shadow: 5px 5px rgba(230, 230, 250, 0.7),
    10px 10px rgba(240, 240, 260, 0.5);
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  border-color: black;
`;

const Label = styled.label`
  font-size: 20px;
`;

const Button = styled.button`
  min-height: 40px;
  min-width: 120;
  width: 100%;
  max-width: 120px;
  border-radius: 10px;
  border-color: black;
`;
