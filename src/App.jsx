
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import "./styles/global.scss";
import { Home } from "./components/Pages/Home/Home";
import { Catalogg } from "./components/Pages/Catalogg/Catalogg";
import { NotFound } from "./components/Pages/NotFound/NotFound";
import { Product } from "./components/Pages/Product/Product";
import { MyBooks } from "./components/Pages/MyBooks/MyBook";
import { About } from "./components/Pages/About/About";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/catalogg" element={<Catalogg/>} />
        <Route path="/mybooks" element={<MyBooks/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
