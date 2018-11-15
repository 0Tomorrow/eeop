import reqwest from 'reqwest';

export default function fetch(url, body) {
  reqwest({
    url: 'http://localhost:9003',
    method: 'post',
    data: JSON.stringify(body),
    contentType: 'application/json;charset=utf-8',
    type: 'json',
  })
    .then((data) => {
      if (data.code !== 0) {
        alert(data.msg);
      } else {
        return data.data;
      }
    });
}
