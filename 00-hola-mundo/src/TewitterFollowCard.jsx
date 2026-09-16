import { useState } from "react"

export function TwitterFollowCard({ userName, name }) {

    const [isFollowing, setIsFollowing] = useState(false)

    const texto = isFollowing ? "Siguiendo" : "Seguir"

    const buttonClassName = isFollowing
        ? "button buttonFollowing"
        : "button"

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className="tw-followCard">

            <header className="tw-followCard-header">

                <img
                    className="tw-followCard-avatar"
                    src={`https://unavatar.io/twitter/${userName}`}
                    alt={`Avatar de ${userName}`}
                />

                <div className="tw-followCard-info">

                    <strong>{name}</strong>

                    <span className="tw-followCard-infoUserName">
                        @{userName}
                    </span>

                </div>

            </header>

            <aside>

                <button
                    className={buttonClassName}
                    onClick={handleClick}
                >

                    <span className="followCard-text">
                        {texto}
                    </span>

                    <span className="followCard-stopFollow">
                        Dejar de seguir
                    </span>

                </button>

            </aside>

        </article>
    )
}

