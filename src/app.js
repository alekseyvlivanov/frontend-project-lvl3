// import axios from 'axios';
import { object, string } from 'yup';

import { elements, initView } from './view';

// const parseUrl = (url) => {
//   console.log(url);
// };

const schema = object().shape({
  url: string().url(),
});

const validate = (fields) => schema.validate(fields, { abortEarly: false });

const app = () => {
  const state = {
    articles: [],
    feeds: [],
    form: {
      processState: 'filling',
      processError: null,
      url: '',
      error: null,
    },
    lang: 'en',
  };

  const watched = initView(state);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    // watched.form.processState = 'sending';
  });

  elements.url.addEventListener('input', (e) => {
    watched.form.url = e.target.value.trim();
    validate(watched.form)
      .then(() => {
        watched.form.error = null;
      })
      .catch(() => {
        watched.form.error = 'notValidUrl';
      });
  });

  ['en', 'ru'].forEach((button) => {
    elements[button].addEventListener('click', (e) => {
      watched.lang = e.target.id;
      elements.url.focus();
    });
  });
};

export default app;
