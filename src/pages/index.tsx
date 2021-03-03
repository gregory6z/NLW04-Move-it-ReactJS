import styles from '../styles/pages/Login.module.css'
import { FiGithub, FiLogIn } from 'react-icons/fi';


function Login() {
  return (

<div className={styles.Container}>
<img src="icons/devTime.svg" alt="devtime" />
    <div className={styles.Content}>
     <h1>devTime</h1> 
    <strong>Bem-vindo</strong>

<div className={styles.title}>
  <FiGithub size={36} />
  <span>Faça login com seu GitHub para iniciar.</span>
</div>

<form >
  <input
    type="text"
    placeholder="Digite seu username"
   
  />
  <button type="submit">
    <FiLogIn size={24} />
  </button>
</form>
</div>
</div>
);




 
}

export default Login;
