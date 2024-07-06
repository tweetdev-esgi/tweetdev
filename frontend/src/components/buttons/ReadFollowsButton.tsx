import { ApplePodcastsLogo, Users } from "@phosphor-icons/react";
import { Pencil, Plus, X } from "lucide-react";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import CustomButtonBig from "./CustomButtonBig";
import { createHub } from "../../api/hub";
import { getSession } from "../../services/sessionService";
import toast from "react-hot-toast";
import { updateUser } from "../../api/user";
import ModalFollowers from "../ModalFollowers";

export default function ReadFollowsButton({
  followingCount,
  followersCount,
  followersText,
}) {
  const [isCreateHubModalOpen, setIsCreateHubModalOpen] = useState(false);
  const toggleCreateHubModal = () => {
    setIsCreateHubModalOpen((prevState) => !prevState);
  };

  const handleSubmit = async () => {
    const hubData = {
      username,
      description,
      profileImageUrl,
      coverImageUrl,
    };
    try {
      const sessionToken = getSession();
      const update = await updateUser(sessionToken, hubData);
      toast.success("profile updated successfully");
      window.location.href = "";
    } catch (error) {
      toast.error("error while updating profile");
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-3" onClick={toggleCreateHubModal}>
        <ModalFollowers
          followersCount={followingCount}
          followersText={"Following"}
        ></ModalFollowers>
        <ModalFollowers
          followersCount={followersCount}
          followersText={followersText}
        ></ModalFollowers>
      </div>

      {isCreateHubModalOpen && (
        <div className="fixed -top-36 inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleCreateHubModal}
          ></div>

          {/* Modal */}
          <div className="bg-bodyBg p-4 rounded shadow-lg relative z-10 w-8/12 h-3/6">
            <div className="flex justify-end">
              <button
                className="text-secondaryColor font-medium text-sm"
                onClick={toggleCreateHubModal}
              >
                <X />
              </button>
            </div>
            <div className="">
              <div className="p-2 -mt-5 flex flex-col gap-3">
                <div className="flex gap-3 items-center ml-[3px]">
                  <ApplePodcastsLogo weight="bold" size={36} />
                  <h2 className="text-lg font-semibold">Followers</h2>
                </div>
                <p className="text-secondaryColor">
                  Explore your connections and discover your network!
                </p>

                <p>following </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
