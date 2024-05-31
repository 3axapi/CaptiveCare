import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPrisonersComponent(props) {

    const { onClick } = props;

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [pesel, setPesel] = useState("");
    const [reason, setReason] = useState("");
    const [explanation, setExplanation] = useState("");

    async function addPrisoner(event) {
        event.preventDefault();

        try {
            await axios.post("/api/prisoners", {
                firstName: name,
                lastName: surname,
                pesel: pesel,
                reason: reason,
                explanation: explanation
            });

            onClick();
        } catch (error) {
            console.log("There was a problem with deleting the prisoner " + error.message);
        }
    }

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            try {
                user = JSON.parse(user);
                if (user.isAuth) return;
                else navigate("/");
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    return (
        <form style={{ display: "flex", alignItems: "stretch", flexDirection: "column", marginLeft: 12, marginRight: 12, marginBottom: 12 }}>
            <div>
                <label>IMIĘ</label>
                <input onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label>NAZWISKO</label>
                <input onChange={e => setSurname(e.target.value)} />
            </div>
            <div>
                <label>PESEL</label>
                <input onChange={e => setPesel(e.target.value)} />
            </div>
            <div>
                <div>
                    <label>PRZYCZYNA</label>
                    <input onChange={e => setReason(e.target.value)} />
                </div>
                <div>
                    <label>WYJAŚNIENIE</label>
                    <textarea onChange={e => setExplanation(e.target.value)}></textarea>
                </div>
            </div>
            <input onClick={addPrisoner} type="button" value="DODAĆ" />
        </form>
    );
}

export default AddPrisonersComponent;