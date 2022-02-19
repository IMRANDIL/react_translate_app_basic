import { useEffect, useState } from 'react'
import './App.css';

const axios = require('axios')



function App() {

  const [options, setOptions] = useState([])
  const [to, setTo] = useState('af');
  const [from, setFrom] = useState('af');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('')



  useEffect(() => {


    axios.get(`https://translation.googleapis.com/language/translate/v2/languages?key=`).then((data) => setOptions(data.data.data.languages)).catch((err) => console.log(err));


  }, [])



  const translate = async () => {


    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    // params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')


    try {
      const postInput = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=`, params,
      );



      setOutput(postInput.data.data.translations[0].translatedText)
    } catch (error) {
      console.log(error);
    }



  }


  const handleInput = () => {
    setInput('');
    setOutput('')
  }


  //curl -X POST "https://libretranslate.com/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hey&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"



  return (
    <div className="App">
      <div>
        From ({from}):
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.language}>{option.language}</option>
            )
          })}

        </select>
        To ({to}):
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.language}>{option.language}</option>
            )
          })}

        </select>
      </div>

      <div>
        <textarea cols="50" rows="8" value={input} onInput={(e) => setInput(e.target.value)}></textarea>
      </div>


      <div>
        <textarea cols="50" rows="8" defaultValue={output} />
      </div>

      <div>
        <button onClick={(e) => translate()}>Translate</button>
        <button onClick={(e) => handleInput()}>Clear</button>
      </div>

    </div>
  );
}

export default App;
