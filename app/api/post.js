import authStorage from '../auth/storage';
import {REACT_APP_BASE_URL} from '@env';

const PostPoll = async ({text, ch, m}) => {
  const tokens = await authStorage.getTokens();
  const access = JSON.parse(tokens).access;

  var content = JSON.stringify({
    question_text: text,
    choices: ch,
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${access}`,
    },
    body: content,
  };

  var id = -1;
  const response = await fetch(`${REACT_APP_BASE_URL}/pollish/polls/me/`, options)
    .then(response => response.json())
    .then(response => {
      id = response.id;
      console.log(response)
    });

  console.log('id is ' + id)

  if (id !== -1) {
    if (m.m1) await Post_Image({m: m.m1, id: id, access: access});
    if (m.m2) await Post_Image({m: m.m2, id: id, access: access});
    if (m.m3) await Post_Image({m: m.m3, id: id, access: access});
    if (m.m4) await Post_Image({m: m.m4, id: id, access: access});
  }

  console.log(id)
  return id;
};

const Post_Image = async ({m, id, access}) => {
  const data = new FormData();
  data.append('image', {uri: m, name: 'image.jpg', type: 'image/jpg'});

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data; ',
      Authorization: `JWT ${access}`,
    },
    body: data,
  };

  const response = await fetch(
    `${REACT_APP_BASE_URL}/pollish/polls/${id}/images/`,
    options,
  );
};

export { PostPoll };
