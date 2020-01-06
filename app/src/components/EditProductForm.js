import React, { Component } from "react";
import InputValidator from "./controls/InputValidator";

export default class EditProductForm extends Component {
  state = {
    id: undefined,
    name: "",
    description: "",
    price: ""
  };

  componentWillMount() {
    let { id, name, description, price } = this.props.product;
    this.setState({
      id,
      name,
      description,
      price
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      let { id, name, description, price } = nextProps.product;
      this.setState({
        id,
        name,
        description,
        price
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      errors: {}
    });
  };

  onSave = e => {
    e.preventDefault();

    const isEmpty = value =>
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0);

    let { id, name, description, price } = this.state;

    // Validation should move closer to repository
    let errors = {};
    if (isEmpty(name)) {
      errors.name = "name is required";
    }
    if (isEmpty(description)) {
      errors.description = "description is required";
    }
    if (isEmpty(price) || isNaN(price)) {
      errors.price = "price must be a number greater than zero";
    }

    if (isEmpty(errors)) {
      this.props.onSave({ id, name, description, price });
    } else {
      this.setState({
        errors
      });
    }
  };

  render() {
    let { name, description, price, errors } = this.state;
    return (
      <form onSubmit={this.onSave}>
        <div className="form-group">
          <img
            src={require("../resources/photo.jpg")}
            style={{ width: "100px", height: "auto" }}
            alt={"product alt"}
          />
        </div>
        <div className="form-group">
          <InputValidator name="name" errors={errors}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="Enter Name"
              onChange={this.onChange}
            />
          </InputValidator>
        </div>
        <div className="form-group">
          <InputValidator name="description" errors={errors}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              placeholder="Enter Description"
              onChange={this.onChange}
            />
          </InputValidator>
        </div>
        <div className="form-group">
          <InputValidator name="price" errors={errors}>
            <label htmlFor="price">Price $</label>
            <input
              type="number"
              min="0"
              step="any"
              className="form-control"
              value={price}
              id="price"
              placeholder="Enter Price"
              onChange={this.onChange}
            />
          </InputValidator>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}
