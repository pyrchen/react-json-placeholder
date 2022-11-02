import {PostCard} from './shared/Post.card';
import {UserCard} from './shared/User.card';
import {AlbumCard} from './shared/Album.card';
import {PhotoCard} from './shared/Photo,card';
import {CommentCard} from './shared/Comment.card';
import {TodoCard} from './shared/Todo.card';

export const CardWrapper = ({ id, item, ...props }) => {
  switch (id) {
    case 'posts' : return <PostCard item={item} {...props} />;
    case 'users' : return <UserCard item={item} {...props} />;
    case 'albums' : return <AlbumCard item={item} {...props} />;
    case 'photos' : return <PhotoCard item={item} {...props} />;
    case 'comments' : return <CommentCard item={item} {...props} />;
    case 'todos' : return <TodoCard item={item} {...props} />;
  }
};