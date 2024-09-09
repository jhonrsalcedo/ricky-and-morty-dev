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
      } hover:shadow-lg transition-shadow duration-300 hover:shadow-green-500`}
      tabIndex={0}
      aria-label={`Character Card for ${name}`}
    >
      <div className='w-full h-full'>
        <img src={image} alt={name} className={imageClasses} />
      </div>
      <div className={contentClasses}>
        <h2 className='font-delius text-xl font-semibold mb-2'>{name}</h2>
        <p className='text-gray-500 font-medium'>
          Status:
          <span
            className={`ml-1 ${
              status === 'Alive'
                ? 'text-green-500'
                : status === 'Dead'
                ? 'text-red-500'
                : 'text-blue-500'
            }`}
          >
            {status}
          </span>
        </p>
        <p className='text-gray-500 font-medium'>Species: {species}</p>
        <p className='text-gray-500 font-medium'>Gender: {gender}</p>
        <p className='text-gray-500 font-medium'>Origin: {origin.name}</p>
      </div>
    </div>
  )
}

export default CharacterCard
