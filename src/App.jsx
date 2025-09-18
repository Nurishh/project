import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import "./styles/global.scss";
import { NotFound } from "./components/Pages/NotFound/NotFound";
import { Product } from "./components/Pages/Product/Product";
import {MyBooks} from "./components/Pages/MyBooks/MyBook";
import { About } from "./components/Pages/About/About";
import { Catalog } from "./components/Catalog/Catalog";
import { Admin } from "./components/Pages/Admin/Admin";
import AuthorPage from "./components/Pages/Admin/AdminAddBooks/Author/AuthorPaje";
import { HomePaje } from "./components/Pages/HomePaje/HomePaje";
import { PublicRoute } from "./components/Pages/Routes/PablicRoutes";
import { Login } from "./components/Pages/Login/Loginn";
import { PrivateRoute } from "./components/Pages/Routes/PrivateRoutes";
import { MainLayout } from "./Layouts/MainLayout";
import { Favorite } from "./components/Pages/MyBooks/components/Favorite/Favorite";
import { Always } from "./components/Pages/MyBooks/components/always/Always";
import BookList from "./components/Catalog/BookList";
import BookID from "./components/Pages/Reading/BookID";
import AuthorProfile from "./components/Pages/Author/AuthorProfile";
import Reading from "./components/Pages/MyBooks/components/reading/Reading";
import Finished from "./components/Pages/MyBooks/components/finished/Finished";
import Wantread from "./components/Pages/MyBooks/components/wantread/Wantread";
import Dropped from "./components/Pages/MyBooks/components/dropped/Dropped";
import Authors from "./components/Pages/MyBooks/components/authors/Authors";
import Other from "./components/Pages/MyBooks/components/other/Other";
// import { SearchPage } from "./components/Header/Search/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<PrivateRoute allowedRoles={["user", "admin"]} />}>
            <Route path="/" element={<HomePaje />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalogg" element={<Catalog />} />
            {/* <Route path="/search" element={<SearchPage />} /> */}
            <Route path="/mybooks" element={<MyBooks />}>
              <Route path="always" element={<Always />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="reading" element={<Reading />} />
              <Route path="finished" element={<Finished />} />
              <Route path="wantread" element={<Wantread />} />
              <Route path="dropped" element={<Dropped />} />
              <Route path="authors" element={<Authors />} />
              <Route path="other" element={<Other />} />
            </Route>

            <Route path="/product" element={<Product />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/book/:id" element={<BookID />} />
            <Route path="/author" element={<AuthorPage />} />
            <Route path="/author/:id" element={<AuthorProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
