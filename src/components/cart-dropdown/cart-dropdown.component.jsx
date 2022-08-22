import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <CustomButton className="custom-button">Add to bag</CustomButton>
    </div>
  );
};

export default CartDropdown;
