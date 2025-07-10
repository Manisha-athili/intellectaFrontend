export default function LoadingSpinner() {
    return(
        <div className="flex flex-col items-center justify-center h-96 text-purple-400">
            <div className="relative w-10 h-10 mb-4">
                <span className="absolute animate-ping w-full h-full rounded-full bg-purple-600 opacity-75"></span>
                <span className="absolute w-full h-full rounded-full bg-purple-600"></span>
            </div>

            <p className="text-lg font-medium">Loading amazing prompts...</p>
        </div>
    )
}