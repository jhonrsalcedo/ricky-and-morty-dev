function Spinner() {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="relative w-40 h-40">
                {/* Círculo exterior */}
                <div className="absolute inset-0 border-8 border-green-400 rounded-full animate-spin"></div>

                {/* Círculo intermedio */}
                <div className="absolute inset-4 border-8 border-blue-500 rounded-full animate-spin-slow"></div>

                {/* Círculo interior */}
                <div className="absolute inset-8 border-8 border-purple-600 rounded-full animate-spin-slower"></div>

                {/* Centro del portal */}
                <div className="absolute inset-12 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>

                {/* Texto "Loading" */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg animate-bounce">Loading</span>
                </div>
            </div>
        </div>
    );
}

export default Spinner;