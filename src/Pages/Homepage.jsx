import { useEffect, useState, lazy, Suspense } from 'react';
import SearchBar from '../Components/Searchbar';
import FilterBar from '../Components/FilterBar';
import { getAllPrompts } from '../services/PromptService';
import { useDarkMode } from '../Components/CommonUI/DarkModeContext';

const HeroSection = lazy(() => import('../Components/HeroSection'));
const PromptGrid = lazy(() => import('../Features/Prompts/PromptGrid'));
const LoadingSpinner = lazy(() => import('../Components/LoadingSpinner'));

export default function HomePage() {
  const [prompts, setPrompts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('Highest Rated');
  const [selectedCategory, setSelectedCategory] = useState('All Prompts');
  const [loading, setLoading] = useState(true);
  const { darkMode } = useDarkMode();



  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const queryParams = {};
        if (searchTerm) queryParams.searchWord = searchTerm;
        if (selectedCategory) queryParams.categories = selectedCategory;
        if (selectedOption) queryParams.sort = selectedOption;

        const res = await getAllPrompts(queryParams, token);
        setPrompts(res.data);
      } catch (error) {
        console.error('Error in fetching prompts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [searchTerm, selectedCategory, selectedOption]);

  return (
    <div
      className={`relative overflow-hidden mx-auto pt-24 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <Suspense fallback={<div className="text-center py-20">Loading hero...</div>}>
        <HeroSection />
      </Suspense>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <div className="mt-4">
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="mt-8">
          <Suspense fallback={<div className="text-center py-20">Loading prompts...</div>}>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <LoadingSpinner />
              </div>
            ) : (
              <PromptGrid prompts={prompts} />
            )}
          </Suspense>
        </div>
      </section>
    </div>
  );
}
