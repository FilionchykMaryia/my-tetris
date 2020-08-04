import React, {useContext, useState, useEffect} from 'react';
import {StyledButton} from './../components/styles/StyledButton';
import {
    StyledAuthPage, 
    AuthWrapper,
    Title,
    Card,
    CardContent,
    CardTitle,
    InputField, 
    Input,
    Label,
    CardAction
} from './../pages/styles/StyledAuthPage';
import {useHttp} from './../hooks/http.hook';
import {useMessage} from './../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', 
        password: '',
        name: '',
    });

    useEffect(() => {
      console.log('Error', error);
      message(error);
      clearError();
    }, [error, message, clearError]);


    const changeHandler = event => {
       setForm({ ...form, [event.target.name]: event.target.value }); 
    };

    const registerHandler = async () => {
        try{ 
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            console.log('Data', data);
        } catch(e){}
    };

    const loginHandler = async () => {
      try{
          const data = await request('/api/auth/login', 'POST', {...form});
          console.log('From loginHandler Data=', data);
          auth.login(data.token, data.userId, data.currScore, data.currLevel);
         // auth.restorescore(data.currScore, data.currLevel);
         
      } catch(e){}
  }



    return (
    <StyledAuthPage>
      <AuthWrapper>
        <Title>Tetris</Title>
        <Card>
          <CardContent>
            <CardTitle>Авторизация</CardTitle>
            <div>

            <InputField>
                <Label htmlFor="email">Имя</Label>
                <Input
                  placeholder="Введите ваше имя"
                  id="name"
                  type="text"
                  name="name"
                  onChange={changeHandler}
                />
              </InputField>

              <InputField>
                <Label htmlFor="email">Email</Label>
                <Input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
              </InputField>

              <InputField>
                <Label htmlFor="email">Пароль</Label>
                <Input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}               
                />
              </InputField>

            </div>
          </CardContent>

          <CardAction>
            <StyledButton 
                onClick={loginHandler}
                disabled={loading}
            >
              Войти
            </StyledButton>

            <StyledButton 
                onClick={registerHandler}
                disabled={loading}
            >
              Регистрация
            </StyledButton>
          </CardAction>
        </Card>
      </AuthWrapper>
    </StyledAuthPage>
    )
};