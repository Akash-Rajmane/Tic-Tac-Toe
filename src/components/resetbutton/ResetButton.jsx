import "./resetbtn.css";

const ResetButton = ({ onClick, btnText }) => {
  return (
    <button onClick={onClick} className={"reset__btn"}>
      {btnText}
    </button>
  );
};

export default ResetButton;
