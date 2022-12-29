import {PostCard} from './Post.card';
import {UserCard} from './User.card';
import {AlbumCard} from './Album.card';
import {PhotoCard} from './Photo,card';
import {CommentCard} from './Comment.card';
import {TodoCard} from './Todo.card';

export const CardSwitcher = ({ id, item, ...props }) => {
  // console.log(item);
  switch (id) {
    case 'posts' : return <PostCard item={item} {...props} />;
    case 'users' : return <UserCard item={item} {...props} />;
    case 'albums' : return <AlbumCard item={item} {...props} />;
    case 'photos' : return <PhotoCard item={item} {...props} />;
    case 'comments' : return <CommentCard item={item} {...props} />;
    case 'todos' : return <TodoCard item={item} {...props} />;
  }
};