import Main from './components/Main';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShorModal] = useState(false);

  function handleToggleModal() {
    setShorModal(!showModal);
  }

  useEffect(() => {
    async function fetchApiData(params) {
      const NASA_KEY = import.meta.env.VITE_NSA_API_KEY;
      const url =
        'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log('Fetched from cache today');
        return;
      }
      localStorage.clear();

      try {
        const response = await fetch(url);
        const apiData = await response.json();
        setData(apiData);
        localStorage.setItem(localKey, JSON.stringify(apiData));
        console.log('Fetched from API today!!!');
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchApiData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className='loadingState'>
          <i className='fa-solid fa-gear'></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer
          data={data}
          showModal={showModal}
          handleToggleModal={handleToggleModal}
        />
      )}
    </>
  );
}

export default App;
