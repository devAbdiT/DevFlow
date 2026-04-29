export const sidebarLinks = [
  {
    imageURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imageURL: "/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imageURL: "/icons/star.svg",
    route: "/collection",
    label: "Collection",
  },
  {
    imageURL: "/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imageURL: "/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imageURL: "/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imageURL: "/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];
const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  COLLECTION: "/collection",
  COMMUNITY: "/community",
  TAGS: "/tags",
  JOBS: "/jobs",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  TAG: (id: string) => `/tags/${id}`,
  SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
};
export default ROUTES;
