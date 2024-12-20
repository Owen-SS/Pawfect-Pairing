// Page.js
import React from 'react';
import DogFact from '../components/DogFact';
import SwipeableContainer from '../components/SwipeableContainer';
import { useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();

  const navigateToMain = () => {
    router.push('/main');
  };

  return (
    <SwipeableContainer navigateToMain={navigateToMain}>
      <DogFact />
    </SwipeableContainer>
  );
}
