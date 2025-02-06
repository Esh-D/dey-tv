import "./Home.css"
import Card from "../../components/Card/Card";

import { CHANNELS } from "../../dummy-data/data";

function Home() {
    return (
        <>
            <div className="banner">Dey TV</div>
            <div className="home-container">
                {CHANNELS.map((channel) => <Card key={channel.id} channelName={channel.channelName} picURL={channel.picURL} link={channel.link}/>)}
            </div>
        </>
    )
}

export default Home;