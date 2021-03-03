/* eslint-disable react/destructuring-assignment */
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallanges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile/index';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import Sidebar from '../components/Sidebar';

interface HomeProps {
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}

export default function Home(props:HomeProps) {
  return (

    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      
    <div className={styles.container}>
    <Sidebar />
      <Head>
        <title>Início | DevTime </title>
      </Head>

      
      
      <div className={styles.content}> 
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>

        </CountdownProvider>
      </div>
    </div>
    </ChallengesProvider>
  );
}
export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
