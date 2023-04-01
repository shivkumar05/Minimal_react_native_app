const Ex = () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  fetch(
    // 'http://35.88.83.10/blog_view/',
    'http://10.0.2.2:8000/blog_view/',
    requestOptions,
  ).then(resp => {
    resp.json().then(resp => {
      console.log(resp);
      //   setBlog(resp);
    });
  });
};
export default Ex;