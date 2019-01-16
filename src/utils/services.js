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

  async logout(data) {
    try {
      let response = await fetch(BASE_URL + 'logout', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json',
          })
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

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
  },

  async addToCart(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'add_to_cart', {
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

  async cartList(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'cart_list', {
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

  async subCategory(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'sub_category_list' + '?page=1', {
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

  async categoryWiseProductList(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'category_wise_product_list', {
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

  async companyTeamList(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'company_team_list', {
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

  async sendRfm(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'send_rfm', {
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

  async sendRfq(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'send_rfq', {
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

  async rfqHistory(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'rfq_history', {
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

  async rfqHistoryDetail(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'rfq_history_details', {
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

  async changeRfqStatus(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'change_rfq_status', {
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

  async advertiseList(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'advertise_list', {
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

  async rfmHistory(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'rfm_history', {
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

  async changeRfmStatus(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'change_rfm_status', {
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

  async whoWeAre(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'who_we_are', {
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

  async contactUs(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'contact_us', {
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

  async evaluate(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'evaluate', {
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

  async AccountRequest(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'account_request', {
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

  async sendComplaints(data) {
    console.log('data: ', data);
    try {
      let response = await fetch(BASE_URL + 'send_complaints_proposal', {
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
};
