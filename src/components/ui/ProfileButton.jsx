import { UserButton } from "@clerk/nextjs";

const ProfileButton = () => {
  return (
    <div className="relative">
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: "w-10 h-10 rounded-full"
          }
        }}
      />
    </div>
  );
};

export default ProfileButton;
