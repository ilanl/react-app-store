import React, { Component } from "react";

export default class DropDown extends Component {
  state = {
    value: "sort by"
  };

  change = e => {
    let sortby = e.target.value;
    this.setState({ value: sortby });
    this.props.onSortChanged(sortby);
  };

  render() {
    return (
      <div>
        <select
          id="sortby"
          className="form-control"
          onChange={this.change}
          value={this.state.value}
        >
          <option value="sort by">sort by</option>
          <option value="price">price</option>
          <option value="name">name</option>
        </select>
      </div>
    );
  }
}
