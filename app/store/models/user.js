import { types, applySnapshot, flow } from "mobx-state-tree";
import { AppApi, AppApiNoAuth } from "../../services/Api";

const user = types
  .model(
    "user",
    {
      phoneNumber: types.maybe(types.string),
      phone: types.maybe(types.string),
      car_type: types.maybe(types.string),
      email: types.maybe(types.string),
      car_number: types.maybe(types.string),
      fullname: types.maybe(types.string),
      invoice: types.optional(
        types.model("invoice", {
          info_1: types.maybe(types.string),
          info_2: types.maybe(types.string),
          type: types.maybe(types.string)
        }),
        {}
      ),
      profile: types.optional(
        types.model("profile", {
          city: types.maybe(types.string),
          img_back: types.maybe(types.string),
          img_front: types.maybe(types.string),
          name: types.maybe(types.string),
          number: types.maybe(types.string),
          road: types.maybe(types.string),
          type: types.maybe(types.string),
          verify: types.maybe(types.string),
          zone: types.maybe(types.string)
        }),
        {}
      ),
      bank: types.optional(
        types.model("bank", {
          account: types.maybe(types.string),
          code: types.maybe(types.string),
          img_cover: types.maybe(types.string),
          verify: types.maybe(types.string),
        }),
        {}
      ),
    },
    {}
  )
  .actions(self => {
    function setPhoneNumber(phoneNumber) {
      self.phoneNumber = phoneNumber;
    }
    const getUserInfo = flow(function* () {
      try {
        const api = yield AppApi();
        const { ok, data } = yield api.getMemberInfo();
        ok &&
          applySnapshot(self, {
            ...data.content,
            phoneNumber: self.phoneNumber
          });
        return ok;
      } catch (error) {
        console.error(error);
        return false;
      }
    });
    const updateUserInfo = flow(function* (data) {
      try {
        const api = yield AppApi();
        const { ok } = yield api.updateMemberInfo(data);
        return ok;
      } catch (error) {
        console.error(error);
        return false;
      }
    });

    const updateProfile = flow(function* (data) {
      try {
        const api = yield AppApi();
        const { ok } = yield api.updateProfile(data);
        return ok;
      } catch (error) {
        console.error(error);
        return false;
      }
    });
    const updateBank = flow(function* (data) {
      try {
        const api = yield AppApi();
        const { ok } = yield api.updateBank(data);
        return ok;
      } catch (error) {
        console.error(error);
        return false;
      }
    });
    return {
      getUserInfo,
      setPhoneNumber,
      updateUserInfo,
      updateProfile,
      updateBank
    };
  });

export default user;
