const domain = "http://localhost:8080";

const handleResponseStatus = (response, errMsg) => {
  const { status, ok } = response;

  if (status === 401) {
    localStorage.removeItem("authToken"); // web storage
    window.location.reload();
    return;
  }

  if (!ok) {
    throw Error(errMsg);
  }
};

export const login = (credential) => {
  const url = `${domain}/signin`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("Fail to log in");
      }

      return response.text();
    })
    .then((token) => {
      localStorage.setItem("authToken", token);
    });
};

export const register = (credential) => {
  const url = `${domain}/signup`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    handleResponseStatus(response, "Fail to register");
  });
};

export const getShippingOptions = (data) => {
  const url = `${domain}/recommend`;

  const {
    shipper,
    fromAddress,
    fromZipCode,
    fromCity,
    // FromState,
    fromPhone,
    fromEmail,
    consignee,
    toAddress,
    toZipCode,
    toCity,
    // ToState,
    toPhone,
    toEmail,
    totalWeight,
  } = data;

  const formData = new FormData();
  formData.append("shipper", shipper);
  formData.append("from_address", fromAddress);
  formData.append("from_zip_code", fromZipCode);
  formData.append("from_city", fromCity);
  // formData.append("from_state", FromState);
  formData.append("from_phone", fromPhone);
  formData.append("from_email", fromEmail);
  formData.append("consignee", consignee);
  formData.append("to_address", toAddress);
  formData.append("to_zip_code", toZipCode);
  formData.append("to_city", toCity);
  // formData.append("to_state", ToState);
  formData.append("to_phone", toPhone);
  formData.append("to_email", toEmail);
  formData.append("total_weight", totalWeight);

  console.log(data);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  return fetch(url, {
    method: "POST",
    body: formData,
  }).then((response) => {
    handleResponseStatus(response, "Fail to get recommendation");
    return response.json();
  });
};

export const createOrder = (optionId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/upload?option_id=${optionId}`;
  console.log(url);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    handleResponseStatus(response, "Fail to upload app");
    return response.text();
  });
};

export const searchOrder = (orderID) => {
  const url = new URL(`${domain}/search`);
  url.searchParams.append("order_id", orderID);

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    handleResponseStatus(response, "Fail to search order");
    return response.json();
  });
};

export const getOrderHistory = () => {
  const authToken = localStorage.getItem("authToken");
  const url = new URL(`${domain}/orderhistory`);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    handleResponseStatus(response, "Fail to get order history");

    return response.json();
  });
};

export const checkout = (orderId) => {
  const url = `${domain}/checkout?orderID=${orderId}`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      handleResponseStatus(response, "Fail to checkout");
      return response.text();
    })
    .then((redirectUrl) => {
      window.location = redirectUrl;
    });
};
