interface Character {
    id: number;
    image: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    };
}

interface CharacterCardProps {
    character: Character;
    isModal?: boolean;
}

function CharacterCard({ character, isModal = false }: CharacterCardProps) {
    const imageClasses = isModal
        ? "w-full h-64 object-scale-down rounded-t-lg"
        : "w-full h-48 object-scale-down rounded-t-lg";

    const contentClasses = isModal
        ? "p-6"
        : "p-4";

    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isModal ? 'flex flex-col md:flex-row' : ''}`}>
            <img src={character.image} alt={character.name} className={imageClasses} />
            <div className={contentClasses}>
                <h2 className="text-xl font-semibold mb-2">{character.name}</h2>
                <p className="text-gray-600">Status: {character.status}</p>
                <p className="text-gray-600">Species: {character.species}</p>
                <p className="text-gray-600">Gender: {character.gender}</p>
                <p className="text-gray-600">Origin: {character.origin.name}</p>
            </div>
        </div>
    )
}

export default CharacterCard;