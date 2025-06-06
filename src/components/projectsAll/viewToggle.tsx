import { useRouter } from 'next/navigation';

const ViewToggle = ({ currentView }: { currentView: 'my' | 'saved' }) => {
    const router = useRouter();

    return (
        <div className="flex items-center gap-4 text-sm">
            <button
                className={`transition-colors ${
                    currentView === 'my'
                        ? 'text-[#da5249] font-medium'
                        : 'text-gray-500 hover:text-[#da5249]'
                }`}
                onClick={() => router.push('/projects/all?view=my')}
            >
                My Projects
            </button>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <button
                className={`transition-colors ${
                    currentView === 'saved'
                        ? 'text-[#da5249] font-medium'
                        : 'text-gray-500 hover:text-[#da5249]'
                }`}
                onClick={() => router.push('/projects/all?view=saved')}
            >
                Saved Projects
            </button>
        </div>
    );
};

export default ViewToggle;
