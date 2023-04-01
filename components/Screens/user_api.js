import ApiManager from './ApiManger';

export const user_login = async data => {
try {
    const result = await ApiManager( {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};