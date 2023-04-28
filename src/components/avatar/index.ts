import { AvatarTpl } from './AvatarTpl';
import { Block } from '../../utils/Block';
import './avatar.scss';
import { withStore } from '../../utils/store';

interface ProfileAvatarProps{
  avatarSrc: string | null;
  className?:string;
  type?:string;
  name:string;
  events?: {
    click: ()=> void;
  }
}

class ProfileAvatarBase extends Block<ProfileAvatarProps> {
  constructor(props: ProfileAvatarProps) {
    super(props, 'div');
  }

  init() {
    if (this.props.className) { this.element.classList.add(this.props.className); }
  }

  render() {
    return this.compile(AvatarTpl, this.props);
  }
}

const withUser = withStore((state) => ({ user: { ...state.user } }));

export const ProfileAvatar = withUser(ProfileAvatarBase as unknown as typeof Block);
