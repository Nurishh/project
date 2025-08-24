import { useState } from "react";
import styles from "./Login.module.scss";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";

export function Login() {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className={styles.authPage}>
      {hasAccount ? (
        <SignIn setHasAccount={setHasAccount} />
      ) : (
        <SignUp setHasAccount={setHasAccount} />
      )}
    </div>
  );
}
