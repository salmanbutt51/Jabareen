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

  async login(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'login', {
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

  // async logout(data) {
  //   try {
  //     let response = await fetch(BASE_URL + 'logout', {
  //         method: 'POST',
  //         body: JSON.stringify(data),
  //         headers: new Headers({
  //           'Content-Type': 'application/json',
  //         })
  //     });
  //     let responseJson = await response.json();
  //     return responseJson;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },

  async category(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'category_list', {
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
  }
}
