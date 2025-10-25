import { Avatar } from "./Avatar";

export const UserMenu = () => {
  return (
    <div className="user-menu">
      <div className="user-menu-item">
        <Avatar
          name="김개발"
          alt="User Avatar"
          size={32}
          className="user-menu-item-avatar"
        />
        {/* <span className="user-menu-item-label">Logout</span> */}
      </div>
    </div>
  );
};
