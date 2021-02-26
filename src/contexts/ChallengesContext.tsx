import {
  ReactNode, createContext, useState, useEffect,
} from 'react';
import challenges from '../../challenges.json';

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

}

interface ChallengesProviderProps{
  children:ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }:ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
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
    }}
    >
      {children}

    </ChallengesContext.Provider>
  );
}
