import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("https://one-server.onrender.com/post");
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error({ message: error.message });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.value]: e.target.value });
  };

  /*const sendData = async (formData) => {
    try {
      axios.post("https://one-server.onrender.com/post", formData);
      const response = response.data;
    } catch (error) {
      console.error({ message: error.message });
    }
  };*/

  function sendData(formData) {
    axios
      .post("https://one-server.onrender.com/post", formData)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData(formData);
  };

  useEffect(() => {
    fetchData();
    sendData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {data.map(({ _id, title, content, likes }) => (
          <div key={_id}>
            <h2>{title}</h2>
            <div>{content}</div>
            <div>Likes: {likes}</div>
          </div>
        ))}
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Post..."
          name="content"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
