import App from './components/app/app';

const app = new App({
  el: document.querySelector('.chat'),
  title: document.title,
});
app.render();
