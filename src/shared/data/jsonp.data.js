import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import BurstModeOutlinedIcon from '@mui/icons-material/BurstModeOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';

class JsonPItem {
  constructor(title, route, icon) {
    this.title = title;
    this.route = route;
    this.icon = icon;
  };
}

const JsonPItems = [
  new JsonPItem('Posts', '/posts', <DynamicFeedOutlinedIcon />),
  new JsonPItem('Comments', '/comments', <QuestionAnswerOutlinedIcon />),
  new JsonPItem('Albums', '/albums', <BurstModeOutlinedIcon />),
  new JsonPItem('Photos', '/photos', <AccountBoxOutlinedIcon />),
  new JsonPItem('Todos', '/todos', <FormatListBulletedOutlinedIcon />),
  new JsonPItem('Users', '/users', <GroupOutlinedIcon />),
];

export { JsonPItems };