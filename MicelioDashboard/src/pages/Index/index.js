import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './style.css';

import Api from '../../services/Api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FormCard from '../../components/FormCard';
import FormFooter from '../../components/FormFooter';
import {useAuth} from "../../context/AuthContext";

function Index() {
  const history = useHistory();
  const {setAuth} = useAuth()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = async (formEvent) => {
    formEvent.preventDefault()

    try{
      const loginResponse = await Api.post('/user/login', { username, password })

      const { user_id } = loginResponse.data
      localStorage.setItem('@micelio/user', user_id)

      setAuth(true)
      history.push('/home')
    }catch (e) {
      console.log(e.response.data)
    }
  }

  return (
    <div className={'content-body'}>
      <Header title="Micelio"/>

      <div className={'container'}>
        <FormCard title="Faça Login">
          <form onSubmit={doLogin}>
            <input className={'primary'} type="text" name={'username'} placeholder={'Username'}
                   value={username}
                   onChange={e => {
                     setUsername(e.target.value)
                   }}/>
            <input className={'primary'} type="password" name={'password'} placeholder={'Senha'}
                   value={password}
                   onChange={e => {
                     setPassword(e.target.value)
                   }}/>
            <button className={'primary'}>Entrar</button>
          </form>
          <FormFooter beginingText='Não possui conta?' linkText='Cadastre-se' url='/sign'/>
        </FormCard>
      </div>
      <Footer/>
    </div>
  )
}

export default Index;
