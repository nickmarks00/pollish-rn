import authStorage from '../auth/storage'
import {BASE_URL} from '@env';

const base = BASE_URL;

const CheckVote = async ({pid}) => {
    const res = await authStorage.getTokens();
    const access = JSON.parse(res).access;
    const url = `http://${base}/pollish/polls/${pid}/`;
    var id = 0;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${access}`,
        },
    }

    const response = await fetch(url, options)
    .then(d => d.json())
    .then(data => {
        console.log('uvote ' + data.user_vote);
        id = data.user_vote;
    })

    return id;
}

const CommentAPI = async ({uid, pid, text}) => {

    const url = `http://${base}/core/users/${uid}/polls/${pid}/comments/`;
    const user = await authStorage.getUser();
    const voteId = await CheckVote({pid: pid})
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            choice_id: voteId ? voteId : 1,
            comment_text: text,
            user_id: user.id,
        })
    }

    const response = await fetch(url, options);
};

const PostPoll = async ({text, ch, m}) => {
    const tokens = await authStorage.getTokens();
    const access = JSON.parse(tokens).access;

    var content = JSON.stringify({
        "question_text": text,
        "choices": ch
    });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${access}`,
        },
        body: content
    }

    var id = -1;
    const response = await fetch(`http://${base}/pollish/polls/me/`, options)
        .then(response => response.json())
        .then(response => {
            id = response.id
        })

    if(id !== -1){
        if (m.m1) Post_Image({m: m.m1, id: id, access: access})
        if (m.m2) Post_Image({m: m.m2, id: id, access: access})
        if (m.m3) Post_Image({m: m.m3, id: id, access: access})
        if (m.m4) Post_Image({m: m.m4, id: id, access: access})
    }
}

const Post_Image = async ({m, id, access}) =>{
    const data = new FormData();
    data.append("image", {uri: m, name: 'image.jpg', type: 'image/jpg'});

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; ',
            Authorization: `JWT ${access}`,
        },
        body: data
    }

    const response = await fetch(`http://${base}/pollish/polls/${id}/images/`, options)
}

const RegisterVote = async ({id, cid}) => {

    const res = await authStorage.getTokens();
    const access = JSON.parse(res).access;

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };
    
    const response = await fetch(`http://${base}/pollish/polls/${id}/choices/${cid}/me/`, requestOptions);
  };

export {CommentAPI, PostPoll, RegisterVote};