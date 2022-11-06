// Names associated with each screen
export enum SCREEN_NAMES {
  COMMUNITY_HOME = 'CommunityHome',
  PROFILE = 'Profile',
  POLL_LIST = 'PollList',
  FOLLOW = 'Follow',
  FOCUS_LIST = 'FocusList',
  COMMUNITY = 'Community',
  POLL = 'Poll',
  COMMENTS = 'Comments',
  SEARCH_HOME = 'SearchHome',
  VOTE_LIST = 'Vote',
  FEED = 'Feed',
  SETTINGS = 'Settings',
  NOTIFICATIONS = 'Notifications',
}

//
export type RootStackParams = {
  Profile: {
    user: string;
    show: boolean;
    title: string;
  };
  Followers: {
    id: number;
    title: string;
  };
  PollsScreen: {
    id: number;
  };
  UserFocus: {
    id: number;
  };
  Community: {
    comm: any;
  };
  FocusList: {
    id: number;
  };
  PollList: {
    id: number;
  };
  Poll: {
    id: number;
  };
};

export type NavProps = {
  push(arg0: SCREEN_NAMES.SETTINGS): unknown;
  push(
    arg0: SCREEN_NAMES.FOCUS_LIST,
    arg1: RootStackParams['FocusList'],
  ): unknown;
  push(arg0: SCREEN_NAMES.FOLLOW, arg1: RootStackParams['Followers']): unknown;
  push(
    arg0: SCREEN_NAMES.POLL_LIST,
    arg1: RootStackParams['PollList'],
  ): unknown;
  push(arg0: SCREEN_NAMES.PROFILE, arg1: RootStackParams['Profile']): unknown;
  push(arg0: SCREEN_NAMES.POLL, arg1: RootStackParams['PollsScreen']): unknown;
  push(arg0: SCREEN_NAMES.NOTIFICATIONS): unknown;
  push(
    arg0: SCREEN_NAMES.COMMUNITY,
    arg1: RootStackParams['Community'],
  ): unknown;
};
