import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getAchievements, getAchievementStats, unlockAchievement, resetAchievements, type Achievement } from '../utils/achievements';

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState({ unlocked: 0, total: 0, percentage: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Unlock the achievement hunter achievement
    unlockAchievement('achievement_hunter');
    loadAchievements();

    // Listen for achievement unlocks
    const handleUnlock = () => loadAchievements();
    window.addEventListener('achievementUnlocked', handleUnlock);
    window.addEventListener('achievementsReset', handleUnlock);

    return () => {
      window.removeEventListener('achievementUnlocked', handleUnlock);
      window.removeEventListener('achievementsReset', handleUnlock);
    };
  }, []);

  const loadAchievements = () => {
    const loadedAchievements = getAchievements();
    setAchievements(loadedAchievements);
    setStats(getAchievementStats());
    
    // Show confetti if all achievements unlocked
    if (loadedAchievements.every(a => a.unlocked)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all achievements? This cannot be undone.')) {
      resetAchievements();
      loadAchievements();
    }
  };

  return (
    <>
      <Helmet>
        <title>Achievements - Chase Roohms</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen py-12">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="confetti-container">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    backgroundColor: ['#ff6200', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 6)],
                    width: `${5 + Math.random() * 10}px`,
                    height: `${5 + Math.random() * 10}px`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}

        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-yellow-400 to-primary-400 bg-clip-text text-transparent">
              🏆 Achievements
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Discover hidden secrets and unlock achievements
            </p>

            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-primary-400 font-bold">
                  {stats.unlocked} / {stats.total} ({stats.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-400 to-yellow-400 h-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {achievements.map((achievement) => (
              <article
                key={achievement.id}
                className={`bg-gray-900 border rounded-lg p-6 transition-all group relative overflow-hidden ${
                  achievement.unlocked
                    ? 'border-primary-500 hover:bg-gray-850 shadow-lg shadow-primary-400/10'
                    : 'border-gray-800 hover:border-gray-700 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Glow effect for unlocked */}
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 to-transparent pointer-events-none"></div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-5xl mb-4 transform transition-transform group-hover:scale-110">
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 ${
                    achievement.unlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {achievement.unlocked ? achievement.title : '???'}
                  </h3>

                  {/* Description or Hint */}
                  <p className={`text-sm mb-4 min-h-[3rem] leading-relaxed ${
                    achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {achievement.unlocked ? achievement.description : achievement.hint}
                  </p>

                  {/* Unlock Date */}
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="text-xs text-gray-500 pt-3 border-t border-gray-800 mt-auto">
                      Unlocked: {formatDate(achievement.unlockedAt)}
                    </div>
                  )}

                  {/* Locked Badge */}
                  {!achievement.unlocked && (
                    <div className="inline-block px-3 py-1 bg-gray-800 text-gray-500 text-xs rounded-full border border-gray-700 mt-2">
                      Locked
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Completion Message */}
          {stats.percentage === 100 && (
            <div className="bg-gray-900 border border-yellow-400 rounded-lg p-8 shadow-lg shadow-yellow-400/20 text-center max-w-2xl mx-auto mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2 text-yellow-400">
                Congratulations!
              </h2>
              <p className="text-gray-300 text-lg">
                You've unlocked all achievements! You're a true explorer.
              </p>
            </div>
          )}

          {/* Reset Button */}
          <div className="text-center">
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors underline"
            >
              Reset All Achievements
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
