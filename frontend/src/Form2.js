
//used to store info to a clients local storage
import { useLocalStorage } from "./useLocaleStorage";

const Form2 = () => {
    const [name, setName] = useLocalStorage("name2", "");
    const [checked, setChecked] = useLocalStorage("checked", false);

    return (
        <form>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                aria-label="fullname"
            />
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />{" "}
                Instructor?
            </label>
            <input type="submit" value="Submit"></input>
        </form>    
    );
};

export default Form2;
