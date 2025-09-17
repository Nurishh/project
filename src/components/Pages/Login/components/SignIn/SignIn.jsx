import { useDispatch, useSelector } from "react-redux";
import styles from "./SignIn.module.scss";
import { signIn } from "../../../../store/actions/action";

export function SignIn({ setHasAccount }) {
  const dispatch = useDispatch();
  const { isAuthLoading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    dispatch(signIn(data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Вход</h1>
      <input name="email" type="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />

      <button onClick={() => setHasAccount(false)}>
        Нет аккаунта? Зарегестрироваться
      </button>
      <button className={styles.saveBtn}>
        {isAuthLoading ? "Загрузка..." : "Войти"}
      </button>
    </form>
  );
}
