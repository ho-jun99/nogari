import React from 'react';
import MainNavigator from "../components/common/MainNavigator";

import UserInfo from "../firebase/members"

export default function MainView() {
  return (
    <>
      <div>
          게임 메인 페이지
          <UserInfo/>
      </div>
    </>
  );
}
