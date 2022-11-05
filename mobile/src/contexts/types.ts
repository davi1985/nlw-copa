export type User = {
  name: string;
  avatarUrl: string;
};

export interface AuthContextDataProps {
  user: User;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}
