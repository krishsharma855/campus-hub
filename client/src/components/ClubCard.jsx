function ClubCard({ club }) {
    return (
        <div>
            <h2>{club.name}</h2>
            <p>{club.description}</p>

            {club.creator && (
                <p>Created by: {club.creator}</p>
            )}
        </div>
    );
}

export default ClubCard;
