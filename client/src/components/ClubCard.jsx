function ClubCard({ club, onViewDetails }) {
    return (
        <div>
            <h2>{club.name}</h2>
            <p>{club.description}</p>

            {club.creator && (
                <p>Created by: {club.creator}</p>
            )}

            {onViewDetails && (
                <button
                    type="button"
                    onClick={() => onViewDetails(club.id)}
                >
                    View Details
                </button>
            )}
        </div>
    );
}

export default ClubCard;

