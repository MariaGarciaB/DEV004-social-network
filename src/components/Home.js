import { onNavigate } from '../router/index';
import { loginUser, loginGoogle } from '../lib/autenticar';
import logoM from '../img/Logo.png';

export const Home = () => {
  const HomeDiv = document.createElement('section');
  HomeDiv.classList.add('container');
  const buttonRegister = document.createElement('button');
  const buttonLogin = document.createElement('button');
  const buttonLoginGoogle = document.createElement('button');

  buttonRegister.textContent = 'Registrate';
  buttonRegister.classList.add('custom-button');
  buttonLogin.textContent = 'Inicia Sesión';
  buttonLogin.classList.add('custom-button');
  buttonLogin.setAttribute('id', 'idLogin');
  buttonLoginGoogle.textContent = 'Continua con Google';
  buttonLoginGoogle.classList.add('google-button');
  buttonLoginGoogle.setAttribute('id', 'idGoogle');
  const header = document.createElement('header');
  const img = document.createElement('img');
  img.setAttribute('src', logoM);
  img.setAttribute('alt', 'Logo Mom to Mom');
  img.id = 'logoEncabezado';
  header.appendChild(img);
  HomeDiv.appendChild(header);

  const main = document.createElement('main');
  const article = document.createElement('article');
  const h1 = document.createElement('h1');
  h1.classList.add('page-title');
  h1.textContent = 'Para Continuar, Inicia Sesión';
  /* const inputGoogle = document.createElement('input');
  inputGoogle.placeholder = 'Continua con Google';
  inputGoogle.setAttribute('type', 'email'); */
  // buttonLoginGoogle.addEventListener('click', () => onNavigate('/feed'));

  // INTERACCIÓN BOTON GOOGLE
  buttonLoginGoogle.addEventListener('click', () => {
    // llamar a la funcion logincongoogle
    loginGoogle()
      .then((credential) => {
        const user = credential.user;
        // const user = credential.user.uid;
        console.log(user);
        if (user !== undefined) {
          onNavigate('/feed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Ingresa tu Correo';
  inputEmail.setAttribute('type', 'email');
  inputEmail.classList.add('custom-input');
  const inputPassword = document.createElement('input');
  inputPassword.placeholder = 'Ingresa tu Contraseña';
  inputPassword.setAttribute('type', 'password');
  inputPassword.classList.add('custom-input');
  /* img.setAttribute('alt', 'Logo de la marca MaMá Genial');
  img.id = 'logoEncabezado'; */
  article.append(h1, inputEmail, inputPassword, buttonLogin, buttonRegister, buttonLoginGoogle);
  main.appendChild(article);
  HomeDiv.appendChild(main);

  // DIRECCIONA REGISTER
  buttonRegister.addEventListener('click', () => onNavigate('/register'));

  // INTERACCION LOGIN (alertas, ver valores en consola )
  buttonLogin.addEventListener('click', () => {
    if (inputEmail.value === '' || inputPassword.value === '') {
      swal({
        title: '¡Verifica tus datos!',
        text: 'la contraseña debe ser mayor a 6 digitos',
        icon: 'info',
        dangerMode: true,
      });
    } else {
      console.log(inputEmail.value, inputPassword.value);
      loginUser(inputEmail.value, inputPassword.value)
        .then((res) => { // then para promesa cumplida
        // enviarlo al muro
          console.log(res);

          // REDIRECCIONA EL LOGIN (pone alertas en usuarios no reistrados)
          onNavigate('/feed');
        })
        .catch((error) => { // para promesa fallida
          console.log(error.message);
          swal({
            title: '¡Usuario no registrado!',
            text: 'Crea una cuenta',
            icon: 'info',
            dangerMode: true,
          });
          // quisa aqui ponemos el borrar campos
        });
    }
  });

  return HomeDiv;
};
