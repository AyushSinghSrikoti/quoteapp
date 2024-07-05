import { useEffect, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";

function Home() {
  const [quote, setQuote] = useState('');
  const [quotesList, setQuotesList] = useState([]);

  useEffect(() => {
    // Load saved quotes from local storage
    const savedQuotes = JSON.parse(localStorage.getItem('quotesList')) || [];
    setQuotesList(savedQuotes);
  }, []);

  const fetchQuotes = async () => {
    const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);

    setQuote(data[0]);
  };

  const addToQuotesList = () => {
    const newQuotesList = [...quotesList, quote];
    setQuotesList(newQuotesList);
    localStorage.setItem('quotesList', JSON.stringify(newQuotesList));
  };

  const removeFromQuotesList = (index) => {
    const newQuotesList = quotesList.filter((_, i) => i !== index);
    setQuotesList(newQuotesList);
    localStorage.setItem('quotesList', JSON.stringify(newQuotesList));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Ron Swanson Quote</h2>
        <div className="h-32 flex items-center justify-center mb-4">
          <p className="text-gray-700 text-lg italic">{quote}</p>
        </div>
      </div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={fetchQuotes}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Generate Next Quote
        </button>
        <button
          onClick={addToQuotesList}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add to List
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Saved Quotes</h2>
        <ul typeof="disc" className="text-left">
          {quotesList.map((quote, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <p className="text-gray-700 italic">{quote}</p>
              </div>
              <button onClick={() => removeFromQuotesList(index)} className="ml-2">
                <IoIosRemoveCircle
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  style={{ fontSize: '24px' }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
