import React from "react";

const ProductList = props => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th></th>
        <th>Product</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {props.products.length > 0 ? (
        props.products.map(product => (
          <tr
            key={product.id}
            onClick={() => {
              props.onSelect(product);
            }}
          >
            <td>
              <img
                src={require("../resources/photo.jpg")}
                style={{ width: "100px", height: "auto" }}
                alt={"product alt"}
              />
            </td>
            <td>
              <div>{product.name}</div>
              <div>{product.description}</div>
            </td>
            <td>{product.price}</td>
            <td>
              <button
                onClick={() => props.onDelete(product)}
                className="btn btn-secondary"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No products</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default ProductList;
