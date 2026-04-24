import React from "react";

const ProfileId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <h1>Profile</h1>
      {/* <p>{id}</p> */}
    </div>
  );
};

export default ProfileId;
