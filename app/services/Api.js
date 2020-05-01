/** @module Api */

import apisauce from "apisauce";
const DOMAIN = "http://test.com";
const PORT = "7777";
let APItoken = null;

export const endpoints = {
  uspace: `${DOMAIN}:${PORT}/api/v1`,
  workAroundUSpace: `${DOMAIN}:${PORT}/admin`
};

const create = ({ token }) => baseURL => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    timeout: 30000 //api timeout 時間
  });

  return {
    /**
     * 1.1 POST-Verify Token - 驗證 Token
     * @param {String} token the token
     * @returns {Object} success:{ "code": "200", "message": "OK" } </br> fail: { "code": "XXX", "message": "expired" }
     */
    verifyToken: () => api.get("/VerifyToken"),
    /**
     * 1.4 Logout - 登出
     * @returns {Object} success:{ "code": "200", "message": "OK" } </br> fail: { "code": "XXX", "message": "代碼錯誤" }
     */
    logout: () => api.get(`/VerifyToken`)
  };
};

export const AppApi = async (workAround = false) => {
  try {
    if (APItoken) {
      console.log(APItoken);
      return create({ token: APItoken })(
        workAround ? endpoints.workAroundUSpace : endpoints.uspace
      );
    } else {
      const config = await global.storage.load({ key: "@config" });
      APItoken = config.token;
      console.log(APItoken);
      return create({ token: APItoken })(
        workAround ? endpoints.workAroundUSpace : endpoints.uspace
      );
    }
  } catch (error) {
    await global.storage.save({ key: "@config", data: { token: null } });
    return create({ token: "" })(endpoints.uspace);
  }
};

export const AppRemoveToken = () => {
  global.storage.save({ key: "@config", data: { token: null } });
  APItoken = null;
};
export const AppApiNoAuth = (function () {
  const api = apisauce.create({
    baseURL: endpoints.uspace,
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json"
    },
    timeout: 30000 //api timeout 時間
  });
  return {
    /**
     * 1.2 POST-Request PassCode - 請求驗證碼
     * @param {String} PhoneNumber the phone number of the user
     * @returns {Object} success:{ "code": "200", "message": "OK" } </br> fail: { "code": "XXX", "message": "XXX" }
     */
    askPassCode: ({ phone_number }) =>
      api.post("/RequestPassCode", { phone_number }),
    /**
     * 1.3 POST-Login - 登入
     * @param {String} phone_number the phone number of the user
     * @param {String} passCode the pass code
     * @returns {Object} success:{ "code": "200", "message": "OK" } </br> fail: { "code": "XXX", "message": "代碼錯誤" }
     */
    login: ({ phoneNumber, passCode }) =>
      api.post("/login", { phone_number: phoneNumber, pass_code: passCode })
  };
})();


