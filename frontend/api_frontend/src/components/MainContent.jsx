import CardsList from './Tasks/CardsList';
import StatsSection from './SidesSections/StatsSection';

const MainContent = () => {


  return (
    <div className="grid grid-cols-1 grid-rows-2 ld:grid-cols-12 lg:grid-rows-2 gap-4 p-4">
      <CardsList />
      <StatsSection />
    </div>
  );
};

export default MainContent;
