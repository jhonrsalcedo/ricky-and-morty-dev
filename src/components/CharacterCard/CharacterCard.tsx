import { CharacterCardProps } from '../../type'

function CharacterCard({ character, isModal = false }: CharacterCardProps) {
  const { image, name, status, species, gender, origin } = character
  const imageClasses = isModal
    ? 'w-full h-64 object-scale-down rounded-t-lg'
    : 'w-full h-48 object-scale-down rounded-t-lg'

  const contentClasses = isModal ? 'p-6' : 'p-4'

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        isModal ? 'flex flex-col md:flex-row' : ''
      }`}
    >
      <div className='w-full h-full'>
        <img src={image} alt={name} className={imageClasses} />
      </div>
      <div className={contentClasses}>
        <h2 className='text-xl font-semibold mb-2'>{name}</h2>
        <p className='text-gray-600'>Status: {status}</p>
        <p className='text-gray-600'>Species: {species}</p>
        <p className='text-gray-600'>Gender: {gender}</p>
        <p className='text-gray-600'>Origin: {origin.name}</p>
      </div>
    </div>
  )
}

export default CharacterCard
