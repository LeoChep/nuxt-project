import { defineStore } from "pinia";
// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useIndexDbStore = definePiniaStore("indexDbStore", {
  // a function that returns a fresh state
  state: () => ({
    isOpen: false,
    db: {} as IDBDatabase,
  }),
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
    },
    open() {
      const openDb = (dbName: string, version = 1) => {
        return new Promise((resolve, reject) => {
          //  兼容浏览器
          var indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
          let db: IDBDatabase;
          // 打开数据库，若没有则会创建
          const request = indexedDB.open(dbName, version);
          // 数据库打开成功回调
          request.onsuccess = (event:any) => {
            db = event.target.result; // 数据库对象
            console.log("数据库打开成功");
            this.isOpen = true;
            this.db = db;
            resolve(db);
          };
          // 数据库打开失败的回调
          request.onerror = function (event) {
            console.log("数据库打开报错");
          };
          // 数据库有更新时候的回调
          request.onupgradeneeded = function (event:any) {
            // 数据库创建或升级的时候会触发
            console.log("onupgradeneeded");
            db = event.target.result; // 数据库对象
            var objectStore;
            // 创建存储库
            objectStore = db.createObjectStore("signalChat", {
              keyPath: "sequenceId", // 这是主键
              autoIncrement: true, // 实现自增
            });
            // 创建索引，在后面查询数据的时候可以根据索引查
          };
        });
      };
      return openDb("chatDb",1);
    },
    putMessage(message: any) {
      console.log("数据添加", message);
      var store = this.db
        .transaction(["signalChat"], "readwrite")
        .objectStore("signalChat");
      var request = store.add(message);
      /*
       *添加成功
       */
      request.onsuccess = function (event) {
        console.log("数据添加成功", event);
        console.log(message)
      };

      /*
       *添加失败
       */
      request.onerror = function (event) {
        console.log("数据添加失败", event);
      };
    },
    getMessages() {
      /*
       *新建事务
       *@params 数据仓库的数组
       */
      var store = this.db.transaction(["signalChat"]).objectStore("signalChat");

      /*
       *openCursor方法获取指针对象
       *get方法获取数据
       *@params 数据的索引
       */
      var request = store.openCursor();
      return new  Promise((resolve, reject) => {
              /*
       *指针对象打开成功
       */
      let messages=[] as any[]
      request.onsuccess = function (event :any) {
        var cursor = event?.target?.result;
        if (cursor) {
          console.log("数据遍历", cursor.value);
          messages.push( cursor.value)
          cursor.continue();
        } else {
          console.log("没有更多数据了");
          resolve(messages)
        }
      };

      /*
       *指针对象打开失败
       */
      request.onerror = function () {
        console.log("数据遍历失败");
      };
      })

    },
  },
});
