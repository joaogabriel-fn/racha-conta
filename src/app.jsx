import { useReducer } from 'react';
import { Logo } from './components/logo';
import { ButtonAddFriend } from './components/button-add-friend';
import { FormAddFriend } from './components/form-add-friend';
import { FormSplitBill } from './components/form-split-bill';
import { ListOfFriends } from './components/ListOfFriends';

const initialFriends = [
  {
    id: crypto.randomUUID(),
    name: 'Antonio',
    avatar: '/imgs/friends/antonio-48.jpg',
    balance: -7,
  },
  {
    id: crypto.randomUUID(),
    name: 'Henrique',
    avatar: '/imgs/friends/henrique-48.jpg',
    balance: +20,
  },
  {
    id: crypto.randomUUID(),
    name: 'Renata',
    avatar: '/imgs/friends/renata-48.jpg',
    balance: +0,
  },
];

const reducer = (state, action) =>
  ({
    submitted_share_bill: {
      ...state,
      selectedFriend: null,
      friends: state.friends.map((p) =>
        action.friend?.id === p.id ? action.friend : p,
      ),
    },
    selected_friend: {
      ...state,
      selectedFriend:
        state.selectedFriend?.id === action.friend?.id ? null : action.friend,
    },
    submitted_new_friend: {
      ...state,
      toggleAddFriend: false,
      friends: [...state.friends, action.newFriend],
    },
    clicked_to_add_new_friend: {
      ...state,
      toggleAddFriend: !state.toggleAddFriend,
    },
  })[action.type] || state;

const initialState = {
  friends: initialFriends,
  selectedFriend: null,
  toggleAddFriend: false,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClickAddFriend = () =>
    dispatch({ type: 'clicked_to_add_new_friend' });
  const handleClickFriend = (friend) =>
    dispatch({ type: 'selected_friend', friend });
  const handleSubmitShareBill = (friend) =>
    dispatch({ type: 'submitted_share_bill', friend });

  const handleSubmitAddFriend = (newFriend) =>
    dispatch({ type: 'submitted_new_friend', newFriend });

  return (
    <>
      <Logo />

      <main className="app">
        <aside className="sidebar">
          <ListOfFriends
            friends={state.friends}
            selectedFriend={state.selectedFriend}
            onClickFriend={handleClickFriend}
          />

          {state.toggleAddFriend && (
            <FormAddFriend onSubmitAddFriend={handleSubmitAddFriend} />
          )}

          <ButtonAddFriend
            toggleAddFriend={state.toggleAddFriend}
            onClickAddFriend={handleClickAddFriend}
          />
        </aside>

        {state.selectedFriend && (
          <FormSplitBill
            selectedFriend={state.selectedFriend}
            onSubmitShareBill={handleSubmitShareBill}
          />
        )}
      </main>
    </>
  );
};

export { App };
