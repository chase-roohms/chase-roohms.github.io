export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  hint: string;
  unlocked: boolean;
  unlockedAt?: number;
}

const ACHIEVEMENTS_KEY = 'portfolio_achievements';

export const ACHIEVEMENT_LIST: Achievement[] = [
  {
    id: 'konami_code',
    title: 'Code Master',
    description: 'Entered the legendary Konami Code!',
    icon: '🎮',
    hint: 'A classic cheat code...',
    unlocked: false,
  },
  {
    id: 'automation_word',
    title: 'Automation Enthusiast',
    description: "Discovered the power of 'automation'!",
    icon: '🤖',
    hint: 'Type a keyword related to efficiency...',
    unlocked: false,
  },
  {
    id: 'logo_clicker',
    title: 'Persistent Clicker',
    description: 'Clicked the logo 20 times in rapid succession!',
    icon: '⚡',
    hint: 'Frustratedly click a certain logo...',
    unlocked: false,
  },
  {
    id: 'console_explorer',
    title: 'Console Explorer',
    description: "'Explored' the developer console!",
    icon: '🔍',
    hint: "'Explore' the developer console...",
    unlocked: false,
  },
  {
    id: 'achievement_hunter',
    title: 'Achievement Hunter',
    description: 'Found the secret achievements page!',
    icon: '🏆',
    hint: 'There might be a hidden page...',
    unlocked: false,
  },
  {
    id: 'networker',
    title: 'Networker',
    description: 'Reached out via the contact form!',
    icon: '📨',
    hint: 'Hit me up...',
    unlocked: false,
  },
];

export function getAchievements(): Achievement[] {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!stored) {
      return [...ACHIEVEMENT_LIST];
    }
    
    const savedAchievements: Achievement[] = JSON.parse(stored);
    
    // Merge with default list to update descriptions and add any new achievements
    return ACHIEVEMENT_LIST.map(defaultAchievement => {
      const saved = savedAchievements.find(a => a.id === defaultAchievement.id);
      if (saved) {
        // Keep unlocked status and timestamp, but update other properties
        return {
          ...defaultAchievement,
          unlocked: saved.unlocked,
          unlockedAt: saved.unlockedAt,
        };
      }
      return defaultAchievement;
    });
  } catch (error) {
    console.error('Error loading achievements:', error);
    return [...ACHIEVEMENT_LIST];
  }
}

export function saveAchievements(achievements: Achievement[]): void {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  } catch (error) {
    console.error('Error saving achievements:', error);
  }
}

export function unlockAchievement(achievementId: string): boolean {
  const achievements = getAchievements();
  const achievement = achievements.find(a => a.id === achievementId);
  
  if (!achievement) {
    console.warn(`Achievement not found: ${achievementId}`);
    return false;
  }
  
  if (achievement.unlocked) {
    return false; // Already unlocked
  }
  
  achievement.unlocked = true;
  achievement.unlockedAt = Date.now();
  saveAchievements(achievements);
  
  // Dispatch custom event for UI updates
  window.dispatchEvent(new CustomEvent('achievementUnlocked', {
    detail: achievement
  }));
  
  return true;
}

export function getAchievementStats(): { unlocked: number; total: number; percentage: number } {
  const achievements = getAchievements();
  const unlocked = achievements.filter(a => a.unlocked).length;
  const total = achievements.length;
  const percentage = Math.round((unlocked / total) * 100);
  
  return { unlocked, total, percentage };
}

export function resetAchievements(): void {
  localStorage.removeItem(ACHIEVEMENTS_KEY);
  window.dispatchEvent(new CustomEvent('achievementsReset'));
}
