const BASE_URL = 'https://www.jabareen.app/api/';

export default {

  async signup(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

};
