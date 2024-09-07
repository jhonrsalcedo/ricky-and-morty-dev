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
}

function CharacterCard({ character }: CharacterCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={character.image} alt={character.name} className="w-full h-48 object-cover" />
            <div className="p-4">
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