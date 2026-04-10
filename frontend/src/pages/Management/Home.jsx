import React, {useEffect} from 'react';
import NoticeBox from '../../components/NoticeBox';
import NotificationBox from '../../components/NotificationBox';

// management
function Home() {
  useEffect(() => {
    document.title = 'CPMS | Management Dashboard';
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
        <NotificationBox />
        <NoticeBox />
      </div>
    </>
  )
}

export default Home
