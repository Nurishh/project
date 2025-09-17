import { useDispatch, useSelector } from "react-redux";
import styles from "./SignUp.module.scss";
import { signUp } from "../../../../store/actions/action";

export function SignUp({ setHasAccount }) {
  const disptch = useDispatch();
  const { isAuthLoading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    disptch(signUp(data));
    e.target.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Регистрация</h1>
      <input name="name" type="text" placeholder="name" />
      <input name="lastName" type="text" placeholder="last name" />
      <input name="age" type="number" placeholder="age" />
      <input name="phoneNumber" type="text" placeholder="phone number" />
      <input name="email" type="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />

      <button onClick={() => setHasAccount(true)}>
        Уже есть аккаунт? Войти
      </button>
      <button className={styles.saveBtn}>
        {isAuthLoading ? "Сохранение..." : "Сохранить"}
      </button>
    </form>
  );
}
