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
};

export type NavProps = {
  push(arg0: SCREEN_NAMES.PROFILE, arg1: RootStackParams['Profile']): unknown;
  push(commentsScreen: string, arg1: {user: null; title: any}): unknown;
};
