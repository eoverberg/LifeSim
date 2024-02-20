//used to store info to a clients local storage

import { useLocalStorage } from "./useLocaleStorage";

const Form1 = () => {
  const [name, setName] = useLocalStorage("name", "");
  return (
    <form>
      <input 
      type="text" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      placeholder="Full name" 
      aria-label="fullname"
      />
      <input type="submit" value="Submit"></input>
    </form>
  );
};

export default Form1;