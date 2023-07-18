import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://one-server.onrender.com/post");
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error({ message: error.message });
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    axios
      .post("https://one-server.onrender.com/post", { title, content, likes })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
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
      <form onSubmit={handlePost}>
        <input
          type="text"
          placeholder="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Post..."
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="Number"
          placeholder="Likes"
          name="likes"
          onChange={(e) => setLikes(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
