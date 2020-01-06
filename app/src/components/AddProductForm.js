import EditProductForm from "./EditProductForm";

const initialState = {
  id: undefined,
  name: "",
  description: "",
  price: ""
};

export default class AddProductForm extends EditProductForm {
  state = initialState;

  componentWillMount() {
    this.setState(initialState);
  }

  componentWillReceiveProps() {
    this.setState(initialState);
  }
}
