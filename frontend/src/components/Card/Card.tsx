import './Card.css'

function Card({channelName, picURL, link}) {
    return (
        <a href={link} target="_blank">
            <div className="card-container">
                <img className="channel-img" src={picURL} alt="channel image" width="100px" height="100px"/>
                <h2 className="channel-name">{channelName}</h2>                
            </div>
        </a>
    )
}

export default Card;