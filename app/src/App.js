import React, { Component } from "react";
import ProductSearchBar from "./components/ProductSearchBar";
import ProductList from "./components/ProductList";
import EditProductForm from "./components/EditProductForm";
import AddProductForm from "./components/AddProductForm";
import DropDown from "./components/controls/DropDown";

import api from "./api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pattern: "",
      products: [],
      product: undefined
    };
  }

  componentWillMount() {
    api.load().then(products => {
      this.setState({
        products,
        product: products.length > 0 ? products[0] : undefined
      });
    });
  }

  onSelect = product => {
    if (product) {
      this.setState({
        product
      });
    }
  };

  onSearch = pattern => {
    this.setState({
      pattern
    });
    api.filter(pattern).then(products => {
      this.setState({
        products,
        product: undefined
      });
    });
  };

  onSave = product => {
    this.setState({
      pattern: ""
    });
    api.save(product).then(products => {
      this.setState({
        products,
        product: undefined
      });
    });
  };

  onDelete = product => {
    api
      .remove(product)
      .then(products => {
        this.setState({
          products,
          product: undefined
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  onAdd = () => {
    this.setState({
      product: undefined
    });
  };

  onSortChanged = sortby => {
    api.filter(undefined, sortby).then(products => {
      this.setState({
        products
      });
    });
  };

  render() {
    let { products, product, pattern } = this.state;
    return (
      <div className="container-fluid">
        <h1>Store</h1>
        <div className="row">
          <div className="col-md-6">
            <ProductSearchBar pattern={pattern} onSearch={this.onSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              onClick={this.onAdd}
              style={{ margin: "0px 0px 15px 0px" }}
            >
              Add
            </button>
          </div>
          <div className="col-md-2">
            <DropDown onSortChanged={this.onSortChanged} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <ProductList
              onSelect={this.onSelect}
              products={products}
              onAdd={this.onAdd}
              onDelete={this.onDelete}
            />
          </div>
          <div className="col-md-6">
            {product ? (
              <EditProductForm product={product} onSave={this.onSave} />
            ) : (
              <AddProductForm product={null} onSave={this.onSave} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
