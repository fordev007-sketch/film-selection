import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, CheckCircle2, X, Play } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [playingMovie, setPlayingMovie] = useState<number | null>(null);
  const [pendingMovie, setPendingMovie] = useState<number | null>(null);

  const movies = [
    {
      id: 1,
      title: "Luca",
      description: "Une aventure estivale en Italie",
      image: "https://cle.ens-lyon.fr/italien/images/locandina-luca/image_preview",
      color: "from-blue-400 to-teal-500",
      driveLink: "https://drive.google.com/file/d/1KMBEGaiTreosn7qaQPf1blZSxofSzJr2/preview"
    },
    {
      id: 2,
      title: "Vivo",
      description: "Une comédie musicale colorée",
      image: "https://media.senscritique.com/media/000020173832/0/vivo.jpg",
      color: "from-orange-500 to-yellow-600",
      driveLink: "https://drive.google.com/file/d/1AjkMhCS9HlU9UMSALjyuVcBErLoiKj4k/preview"
    },
    {
      id: 3,
      title: "Raya et le Dernier Dragon",
      description: "Une quête épique et magique",
      image: "https://fr.web.img6.acsta.net/pictures/21/05/11/10/35/1825655.jpg",
      color: "from-purple-500 to-blue-600",
      driveLink: "https://drive.google.com/file/d/1cTP8h9ilaF0ILjXJKyvZlSHLOk0F9Peq/preview"
    },
    {
      id: 4,
      title: "Encanto",
      description: "La magie de la famille Madrigal",
      image: "https://fr.web.img5.acsta.net/c_310_420/pictures/21/09/29/10/15/0378531.jpg",
      color: "from-pink-500 to-purple-600",
      driveLink: "https://drive.google.com/file/d/1kYKbmLWrVFo4qwCeuf9NrykNpQogUpMr/preview"
    }
  ];

  const handleSelection = (id: number) => {
    setPendingMovie(id);
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    if (pendingMovie) {
      setSelectedMovie(pendingMovie);
      setPlayingMovie(pendingMovie);
      setShowConfirmDialog(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setPendingMovie(null);
  };

  const handleClosePlayer = () => {
    setPlayingMovie(null);
  };

  // Fermer le lecteur avec la touche Échap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (playingMovie) {
          handleClosePlayer();
        } else if (showConfirmDialog) {
          handleCancel();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [playingMovie, showConfirmDialog]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="text-pink-500" size={40} fill="currentColor" />
          <h1 className="text-5xl md:text-6xl text-gray-800">
            Choisis Notre Film
          </h1>
          <Heart className="text-pink-500" size={40} fill="currentColor" />
        </div>
        <p className="text-xl md:text-2xl text-gray-600">
          Quel dessin animé regardons-nous ce soir ? 💕
        </p>
      </motion.div>

      {/* Movie Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative"
            >
              <motion.button
                onClick={() => handleSelection(movie.id)}
                className="relative w-full group cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  {/* Image */}
                  <div className="relative h-96 overflow-hidden">
                    <ImageWithFallback
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${movie.color} opacity-40 group-hover:opacity-30 transition-opacity duration-300`} />
                    
                    {/* Selected Indicator */}
                    {selectedMovie === movie.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg"
                      >
                        <CheckCircle2 className="text-green-500" size={32} />
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                    <h3 className="text-3xl text-white mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-lg text-gray-200">
                      {movie.description}
                    </p>
                  </div>

                  {/* Hover Effect - Sparkles */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ 
                          x: Math.random() * 100 + '%',
                          y: Math.random() * 100 + '%',
                          scale: 0,
                          opacity: 0
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          rotate: 360
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      >
                        <Sparkles className="text-yellow-300" size={24} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Border Effect when Selected */}
                {selectedMovie === movie.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl -z-10"
                  />
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && pendingMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-full p-4">
                    <Play className="text-white" size={48} fill="currentColor" />
                  </div>
                </div>
                <h2 className="text-3xl text-gray-800 mb-3">
                  {movies.find(m => m.id === pendingMovie)?.title}
                </h2>
                <p className="text-xl text-gray-600">
                  On regarde ce film ensemble ? 💕
                </p>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 px-6 rounded-2xl text-lg font-medium transition-colors"
                >
                  Non, je préfère un autre
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 px-6 rounded-2xl text-lg font-medium transition-colors shadow-lg"
                >
                  Oui, c'est parti ! 🎬
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player */}
      <AnimatePresence>
        {playingMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleClosePlayer}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>

            {/* Movie Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full"
            >
              <p className="text-xl flex items-center gap-2">
                <Heart size={20} fill="currentColor" className="text-pink-400" />
                {movies.find(m => m.id === playingMovie)?.title}
              </p>
            </motion.div>

            {/* Video Player */}
            <div className="flex-1 flex items-center justify-center p-4">
              <motion.iframe
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                src={movies.find(m => m.id === playingMovie)?.driveLink}
                className="w-full h-full max-w-7xl rounded-lg shadow-2xl"
                allow="autoplay"
                allowFullScreen
              />
            </div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center text-white/70 pb-4 text-sm"
            >
              Appuyez sur Échap ou cliquez sur ✕ pour revenir au menu
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0
            }}
            animate={{
              y: -100,
              opacity: [0, 0.3, 0],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <Heart
              className="text-pink-300"
              size={Math.random() * 15 + 10}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}