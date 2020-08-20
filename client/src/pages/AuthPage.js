import React, {useContext, useState, useEffect} from 'react';
import {StyledButton} from './../components/styles/StyledButton';
import {
    StyledAuthPage, 
    Wrapper,
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
const storageName = 'userData';
export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', 
        password: '',
        name: '',
    });
    const [activeTab, setActiveTab] = useState(0);

    const handleClickActiveTab = (e) => {
     const target = e.target;
     target.name === 'LogIn' ? setActiveTab(0) : setActiveTab(1);
    };

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
         if(data && data.token) localStorage.setItem(storageName, JSON.stringify({
            userId: data.userId,
            token: data.token,
            score: data.currScore,
            rows:  data.currRows,
            level: data.currLevel,
            maxScore: data.maxScore,
            userName:  data.userName,
        }));
          auth.login(data.token, data.userId, data.currScore, data.currRows, data.currLevel, data.maxScore, data.userName);
         // auth.restorescore(data.currScore, data.currLevel);
         
      } catch(e){}
  };
// console.log(form);
    return (
    <StyledAuthPage>
      <Wrapper>
        <Title>Tetris</Title>
        <Card>

          <CardAction>
            <StyledButton name={'LogIn'} onClick={handleClickActiveTab}>LogIn</StyledButton>
            <StyledButton name={'Sign Up'} onClick={handleClickActiveTab}>Sign Up</StyledButton>
          </CardAction>
      
          <CardContent>
            {!activeTab ? (
              <div>
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
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    placeholder="Введите пароль"
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={changeHandler}               
                  />
                  </InputField>

                <StyledButton style={{margin:'10px'}} onClick={loginHandler} disabled={loading}>
                  Войти
                </StyledButton>
              </div>
            ) : (
              <div>
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
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    placeholder="Введите пароль"
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={changeHandler}               
                  />
                </InputField>
                <InputField>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      placeholder="Введите ваше имя"
                      id="name"
                      type="text"
                      name="name"
                      onChange={changeHandler}
                    />
                </InputField>

              <StyledButton style={{margin: '10px'}} onClick={registerHandler} disabled={loading}>
                Регистрация
              </StyledButton>
            </div>
            )}
          </CardContent> 
        </Card>
      </Wrapper>
    </StyledAuthPage>
    )
};