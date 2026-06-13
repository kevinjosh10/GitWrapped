import { useWrappedStore } from './store/useWrappedStore';
import { LandingPage } from './features/landing/LandingPage';
import { CinematicIntro } from './features/intro/CinematicIntro';
import { WrappedStory } from './features/wrapped/WrappedStory';
import { Dashboard } from './features/dashboard/Dashboard';
import { RepositoryGalaxy } from './features/galaxy/RepositoryGalaxy';

function App() {
  const stage = useWrappedStore((state) => state.stage);

  return (
    <>
      {(stage === 'landing' || stage === 'analyzing') && <LandingPage />}
      {stage === 'intro' && <CinematicIntro />}
      {stage === 'story' && <WrappedStory />}
      {stage === 'dashboard' && <Dashboard />}
      {stage === 'galaxy' && <RepositoryGalaxy />}
    </>
  );
}

export default App;
