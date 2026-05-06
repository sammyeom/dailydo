import React from 'react';
import { useInitialSearchParams } from '@granite-js/react-native';
import AppNavigator from '../src/App';

export default function IndexPage() {
  const initialParams = useInitialSearchParams();
  return <AppNavigator initialParams={initialParams} />;
}
