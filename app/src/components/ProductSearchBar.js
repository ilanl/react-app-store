import React, { Component } from "react";
import debounce from "lodash/debounce";

export default class ProductSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pattern: ""
    };

    this.changed = debounce(pattern => props.onSearch(pattern), 200);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pattern: nextProps.pattern
    });
  }

  handleChange = e => {
    const val = e.target.value;
    this.setState({ pattern: val }, () => {
      this.changed(val);
    });
  };

  render() {
    return (
      <input
        style={{ margin: "20px", padding: "10px", minWidth: "100%" }}
        type="text"
        name="pattern"
        value={this.state.pattern}
        onChange={this.handleChange}
        placeholder="pattern"
      />
    );
  }
}
