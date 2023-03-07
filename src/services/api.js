import instance from "./axios-instance";

class Api {
  login(login, password) {
    return instance.post("auth/login", { login, password });
  }

  makeOrder(orders) {
    return instance.post("orders/make", { orders });
  }

  getUser() {
    return instance.get("users/me");
  }

  getProducts(params) {
    return instance.get(`products${params}`);
  }

  createProduct(productData) {
    return instance.post('products/add', productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  addProductCategory(productData) {
    return instance.post('products/add_to_category', productData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  getCategories() {
    return instance.get("categories");
  }
}

export const $api = new Api();