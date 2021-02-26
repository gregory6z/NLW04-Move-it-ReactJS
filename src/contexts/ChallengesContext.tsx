import {
  ReactNode, createContext, useState, useEffect,
} from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type:'body' | 'eye';
  description:string;
  amount:number;

}

interface ChallengesContextData{
  level:number;
  challengesCompleted:number;
  currentExperience: number;
  experienceToNextLevel:number;
  activeChallenge:Challenge;
  levelUp: () => void;
  startNewChallenge: ()=> void;
  resetChallenge: () => void;
  completeChallenge:() => void;
  closeLevelUpModal:() => void;
}

interface ChallengesProviderProps{
  children:ReactNode;
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children, ...rest
}:ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    // eslint-disable-next-line no-new
    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification('Novo desafio 🎉', {
        body: `valendo ${challenge.amount}xp!`,
      });
    }
  }
  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    const { amount } = activeChallenge;

    // eslint-disable-next-line prefer-const
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }
  return (
    <ChallengesContext.Provider value={{
      startNewChallenge,
      level,
      levelUp,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal,
    }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  );
}
