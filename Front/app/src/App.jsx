import "./App.css";
import Nav from "./Components/Nav";
import Fetch from "./Components/fetch";

function App() {
  return (
    <>
        <Nav />
        <Fetch/>
    </>
  );
}

export default App;

{
  /* <BrowserRouter>
  <Nav />
  <Routes>
    <Route index element={<Fetch />} />
    <Route path="blogs" element={<Blogs />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<NoPage />} />
  </Routes>
</BrowserRouter> */
}
