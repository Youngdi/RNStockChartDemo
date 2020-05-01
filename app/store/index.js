import { Alert } from "react-native";
import {
  types,
  getParent,
  getSnapshot,
  applySnapshot,
  flow,
  onSnapshot
} from "mobx-state-tree";
import { AppApi, AppApiNoAuth, AppRemoveToken } from "../services/Api";
import User from "./models/user";
let api;

const fakeDelay = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });

const appStore = types
  .model("appStore", {
    user: types.optional(User, {}),
    card: types.optional(Card, {}),
    loading: false,
    error: false,
    save: true,
    record: types.optional(Record, {}),
    historyList: types.array(
      types.model(
        "historyItem",
        {
          placeName: types.string,
          placeId: types.string,
          placeDistinct: types.string,
          timeStamp: types.string
        },
        {}
      )
    )
  })
  .views(self => {
    function getHistoryList() {
      return self.historyList;
    }
    return {
      getHistoryList
    };
  })
  .actions(self => {
    function setHistoryList(list) {
      applySnapshot(self.historyList, list);
    }
    function setSave(flag) {
      self.save = flag;
    }
    function setLoading(flag) {
      self.loading = flag;
    }
    function setError(flag) {
      self.error = flag;
    }
    const askPassCode = flow(function* ({ navigation }) {
      self.loading = true;
      try {
        const data = yield AppApiNoAuth.askPassCode({
          phone_number: self.user.phoneNumber
        });
        self.error = !data.ok;
        self.loading = false;
        if (data.ok) navigation.push("LoginVerifyCode");
      } catch (error) {
        self.loading = false;
        Alert.alert("無法連上網路", "請檢查網路連線，並再試一次");
        console.error(error);
      }
    });
    const verifyCode = flow(function* (code) {
      try {
        const { ok, data } = yield AppApiNoAuth.login({
          phoneNumber: self.user.phoneNumber,
          passCode: code
        });
        ok &&
          global.storage.save({ key: "@config", data: { token: data.token } });
        return ok;
      } catch (error) {
        console.error(error);
        return false;
      }
    });
    const retryPassCode = flow(function* () {
      self.error = false;
      try {
        const { ok } = yield AppApiNoAuth.askPassCode({
          phone_number: self.user.phoneNumber
        });
        self.error = !ok;
      } catch (error) {
        self.error = true;
        Alert.alert("無法連上網路", "請檢查網路連線，並再試一次");
        console.error(error);
      }
    });
    const logout = flow(function* () {
      self.loading = true;
      try {
        AppRemoveToken();
        yield fakeDelay();
        self.loading = false;
        return true;
      } catch (error) {
        self.loading = false;
        Alert.alert("登出失敗，請再試一次", "");
        console.error(error);
      }
    });

    return {
      setHistoryList,
      retryPassCode,
      askPassCode,
      verifyCode,
      logout,
      setLoading,
      setError,
      setSave
    };
  })
  .create({});

export default appStore;
