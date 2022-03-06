import style from "../../../../styles/Admin.module.css";
export const Card = ({ children, model }) => {
  return (
    <div
      className={`${style.card} ${
        model == "small"
          ? style.card_sm :
          model == "small-2"
          ? style.card_sm2
          : model == "medium"
          ? style.card_md
          : model == "big"
          ? style.card_lg
          : ""
      }`}
    >
      {children}
    </div>
  );
};
