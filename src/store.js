import PageObserver from "./observer"

class Store {
  observers = [];
  state = {
    page: {},
    data: {}
  };
  bindData = {};
  PageCacheData = {}
  bind(Page, key, pageKey) {
    const pageId = Page.route;
    if (!pageKey) pageKey = key;
    if (!this.bindData[key]) this.bindData[key] = []
    this.bindData[key].push({
      pageId,
      pageKey
    });
  }
  connect(Page, PageCache = false) {
    Page.$store = this;
    this.PageCacheData[Page.route] = PageCache;
    Page.setPageState = (dataObj) => {
      Object.keys(dataObj).forEach((key) => {
        this._setPageState(Page.route, key, dataObj[key]);
      });
    };
    Page.getPageState = (key) => {
      return this.getPageState(Page.route, key);
    };
    Object.keys(Page.data).forEach((key) => {
      let value = this.getPageState(Page.route, key)
      if (!value) {
        value = Page.data[key]
        this._setPageState(Page.route, key, value);
      }
      if (!this.observers[Page.route])
        this.observers[Page.route] = [];
      this.observers[Page.route][key] = new PageObserver(Page, key);
      this.observers[Page.route][key].notify(value)
    });
  }
  disconnect(Page) {
    if (this.observers[Page.route])
      delete this.observers[Page.route];

    if (!this.PageCacheData[Page.route])
      if (this.state.page[Page.route])
        this.state.page[Page.route] = undefined;
  }
  setState(key, value) {
    let oldval = this.state.data[key];
    if (value != oldval) {
      this.state.data[key] = value;
      if (this.bindData[key])
        this.bindData[key].forEach(({
          pageId,
          pageKey
        }) => {
          this._setPageState(pageId, pageKey, value);
        });
    }
  }
  _setPageState(pageId, key, value) {

    if (!this.state.page[pageId]) {
      this.state.page[pageId] = {}
    }
    const oldval = this.state.page[pageId][key];
    if (value != oldval) {
      this.state.page[pageId][key] = value;
      if (this.observers[pageId]) {
        const observer = this.observers[pageId][key];
        if (observer)
          observer.notify(value);
      }
    }


  }

  getPageState(page, key) {
    if (this.state.page[page])
      return this.state.page[page][key];
  }
  /**
   * 写入特定域的数据到本地存储
   * @throws
   */
  writeToLocalStorage(field, value) {
    //return wx.setStorageSync(field, value);
  }

  /**
   * 从本地存储读出特定数据域的值
   * @throws
   */
  readFromLocalStorage(field) {
    //return wx.getStorageSync(field) || {};
  }
}
export default Store