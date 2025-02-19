import "./Home.css"
import Card from "../../components/Card/Card"

//import { CHANNELS } from "../../dummy-data/data"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase/init"
import Modal from 'react-modal';

/*
Color Palette

#E5E5E5 - platinum
#FFFFFF - white
#0A3200
darkseagreen
darkgreen
whitesmoke
*/

function Home() {
    const [channels, setChannels] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [channelAdded, setChannelAdded] = useState(false);

    async function getChannels() {
        const querySnapshot = await getDocs(collection(db, "channels"));
        const c = [];
        querySnapshot.forEach((doc) => {
            c.push({ id: doc.id, name: doc.data().name, logo: doc.data().logo, link: doc.data().link });
            //console.log(`${doc.id} => ${doc.data()}`);
        });
        setChannels(c);
    }

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setChannelAdded(false);
    }

    async function addChannel() {
        try {
            const docRef = await addDoc(collection(db, "channels"), {
                name: name,
                logo: "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg", //default logo
                link: link
            });
            console.log("Document written with ID: ", docRef.id);
            setChannelAdded(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setName("");
        setLink("");
    }

    useEffect(() => {
        getChannels();
    }, [channelAdded]);

    return (
        <div className="background">
            <div className="banner">Dey TV</div>
            <div className="home-container">
                {channels ? channels.map((channel) => <Card key={channel.id} channelName={channel.name} picURL={channel.logo} link={channel.link}/>) : <p>Loading</p>}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <h2>Add Channel</h2>
                    <form>
                        <label>Name: </label><input type="text" value={name} onChange={(e) => setName(e.target.value)}/> 
                        <br/>
                        <label>Link: </label><input type="text" value={link} onChange={(e) => setLink(e.target.value)}/>
                        <br/>
                        <br/>
                        <div className="modal-btn" onClick={addChannel}>Click here to ADD the channel</div>
                        <br/>
                        <div className="modal-btn" onClick={closeModal}>Click here to GO BACK to channels</div>
                    </form>
                </Modal>
            </div>
            <div onClick={openModal} className="add-channel">+</div>
        </div>
    )
}

export default Home;