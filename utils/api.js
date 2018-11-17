import { SQLite } from "expo";
const db = SQLite.openDatabase("database11.db");

export async function getList(callBack) {
   await db.transaction( tx => {
     tx.executeSql(
      "select * from list",
      [],
       (_, { rows }) => {
        callBack(rows._array)
      } 
    );
  });
}

export function initDB() {
  return db.transaction(tx => {
    tx.executeSql(
      "create table if not exists list (id integer primary key autoincrement, name, price, quantity, isBought integer);"
    );
  });
}

export async function addItem({ name, price, quantity }) {
  return db.transaction(tx => {
    tx.executeSql(
      "insert into list (name, price, quantity, isBought) values (?, ?, ?, 0)",
      [name, price, quantity]
    );
  });
}

export async function removeItem(id) {
  return db.transaction(function(tx) {
    tx.executeSql("DELETE FROM list WHERE id = ?", [id]);
  });
}

export async function updateItem({ name, price, quantity, newValue, id }) {
  return db.transaction(function(tx) {
    tx.executeSql(
      "update list set name=?, price=?, quantity=?, isBought=? where id=?",
      [name, price, quantity, newValue, id]
    );
  });
}
