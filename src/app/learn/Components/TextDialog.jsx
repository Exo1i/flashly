const TextDialog = ({text, isExpanded, setIsExpanded, maxHeight, role}) => (
    <div
        className={`mb-4 ${role === 'assistant' ? 'bg-blue-100 text-left' : 'bg-gray-100 text-right'} rounded-lg p-4 transition-all duration-300 ease-in-out`}>
        <p className={`text-gray-800 ${isExpanded ? '' : 'truncate'}`}>
            {text}
        </p>
        {text.length > 100 && (
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 hover:text-blue-700 mt-2 flex items-center"
            >
                {isExpanded ? 'Show less' : 'Show more'}
            </button>
        )}
    </div>
);

export default TextDialog;