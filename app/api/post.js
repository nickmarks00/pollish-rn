import authStorage from '../auth/storage'

const CommentAPI = async ({uid, pid, text}) => {

    const url = `http://192.168.1.140:8000/core/users/${uid}/polls/${pid}/comments/`;
    const user = await authStorage.getUser();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            choice_id: 1,
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
    const response = await fetch('http://192.168.1.140:8000/pollish/polls/me/', options)
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

    const response = await fetch(`http://192.168.1.140:8000/pollish/polls/${id}/images/`, options)
}

export {CommentAPI, PostPoll};