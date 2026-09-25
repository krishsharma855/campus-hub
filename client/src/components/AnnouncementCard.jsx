function AnnouncementCard({ announcement }) {
    return (
        <div>
            <h2>{announcement.title}</h2>
            <p>{announcement.content}</p>
            <p>
                {new Date(announcement.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
            </p>
        </div>
    );
}

export default AnnouncementCard;
