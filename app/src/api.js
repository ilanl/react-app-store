import shortid from "shortid";
import array from "lodash/array";

const KEY_PRODUCT_STORE = "KEY_PRODUCT_STORE";

let store = {
  products: [
    { id: "2", name: "drone 2", description: "description 2", price: 200 },
    { id: "1", name: "drone 1", description: "description 1", price: 100 },
    { id: "3", name: "drone 3", description: "description 3", price: 300 }
  ]
};

// Save Products to Disk (Local Storage)
const persist = () => {
  return new Promise(function(resolve, reject) {
    try {
      localStorage.setItem(KEY_PRODUCT_STORE, JSON.stringify(store));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

// Loads Products from Disk (Local Storage)
const load = () => {
  return new Promise(function(resolve, reject) {
    try {
      let serializedStore = localStorage.getItem(KEY_PRODUCT_STORE);
      if (serializedStore) {
        store = JSON.parse(serializedStore);
      }
      console.log("loading from local storage", [...store.products]);
      resolve(store.products);
    } catch (error) {
      reject(error);
    }
  });
};

// Filter and Sort Products
const filter = (keywords, sortedBy = "name") => {
  return new Promise(function(resolve, reject) {
    const sortBy = (a, b) => {
      if (a[sortedBy] < b[sortedBy]) return -1;
      if (a[sortedBy] > b[sortedBy]) return 1;
      return 0;
    };

    if (!keywords) {
      resolve(store.products.sort(sortBy) || []);
    }
    let filtered = (store.products || []).filter(item => {
      let intersection = array.intersection(
        [
          ...item.name.toLowerCase().split(" "),
          ...item.description.toLowerCase().split(" ")
        ],
        keywords.toLowerCase().split(" ")
      );
      return intersection.length > 0;
    });
    console.log("found", filtered.length);
    resolve(filtered.sort(sortBy));
  });
};

// Add/ Insert Product
const save = product => {
  return new Promise(function(resolve, reject) {
    if (product.id) {
      let item = store.products.find(i => i.id === product.id);
      if (item) {
        Object.assign(item, { ...product });
        console.log("product", item.id, "was saved");
      }
    } else {
      let id = shortid.generate();
      product.id = id;
      store.products.push(product);
      console.log("product", id, "was created");
    }
    persist();
    console.log({ ...store });
    resolve(store.products);
  });
};

// Delete Product
const remove = ({ id }) => {
  return new Promise(function(resolve, reject) {
    let itemToDelete = store.products.find(i => i.id === id);
    if (!itemToDelete) {
      reject(new Error("could not find product item", itemToDelete));
    }
    store.products = store.products.filter(p => p.id !== itemToDelete.id);
    console.log("product", id, "was deleted");
    persist();
    resolve(store.products);
  });
};

const api = {
  load,
  filter,
  save,
  remove
};

export default api;
