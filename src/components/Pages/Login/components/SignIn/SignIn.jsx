import styles from "./SignIn.module.scss";

export function SignIn({ setHasAccount }) {
  console.log("тут signIn");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Вход</h1>
      <input name="email" type="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />

      <button type="button" onClick={() => setHasAccount(false)}>
        Нет аккаунта? Зарегестрироваться
      </button>
      <button type="submit" className={styles.saveBtn}>
        Войти
      </button>
    </form>
  );
}
