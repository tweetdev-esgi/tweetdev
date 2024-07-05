import { ApplePodcastsLogo } from "@phosphor-icons/react";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import CustomButtonBig from "./CustomButtonBig";
import { createHub } from "../../api/hub";
import { getSession } from "../../services/sessionService";
import toast from "react-hot-toast";

function CreateHubButton(props) {
  const [isCreateHubModalOpen, setIsCreateHubModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("ORE WA STRIKA DA");
  const [profileImageUrl, setProfileImageUrl] = useState(
    "https://styles.redditmedia.com/t5_mm79h/styles/communityIcon_hn20mowlrmxc1.png"
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    "https://styles.redditmedia.com/t5_mm79h/styles/bannerBackgroundImage_n6ncpyyb2fx81.png"
  );

  const toggleCreateHubModal = () => {
    setIsCreateHubModalOpen((prevState) => !prevState);
  };

  const handleSubmit = async () => {
    const hubData = {
      name,
      description,
      profileImageUrl,
      coverImageUrl,
    };
    try {
      const sessionToken = getSession();
      const create = await createHub(sessionToken, hubData);
      toast.success("hub created successfully");
    } catch (error) {
      toast.error("error while creating hub");
    }
    console.log(hubData);
    setName("");
    setDescription("");
    setProfileImageUrl("");
    setCoverImageUrl("");
    toggleCreateHubModal();
  };

  return (
    <div>
      <div
        className="flex gap-3 hover:bg-componentBgHover p-1 rounded cursor-pointer items-center"
        onClick={toggleCreateHubModal}
      >
        <Plus color="#c7c9ce" size={32} />
        <p className="text-secondaryColor font-medium text-sm select-none">
          Create Hub
        </p>
      </div>

      {isCreateHubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleCreateHubModal}
          ></div>

          {/* Modal */}
          <div className="bg-bodyBg p-4 rounded shadow-lg relative z-10 w-8/12 h-3/5">
            <div className="flex justify-end">
              <button
                className="text-secondaryColor font-medium text-sm"
                onClick={toggleCreateHubModal}
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-[60fr_40fr]">
              <div className="p-2 -mt-5 flex flex-col gap-3">
                <div className="flex gap-3 items-center ml-[3px]">
                  <ApplePodcastsLogo weight="bold" size={36} />
                  <h2 className="text-lg font-semibold">Create a Hub</h2>
                </div>
                <p className="text-secondaryColor">
                  Give your hub a name and invite others.
                </p>
                {/* Modal content */}
                <div className="flex flex-col gap-1">
                  <p>Hub name</p>
                  <input
                    className="rounded py-2 px-4 focus:outline-blue-600 outline-none bg-componentBg"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Description</p>
                  <input
                    className="rounded py-2 px-4 focus:outline-blue-600 outline-none bg-componentBg"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Icon URL</p>
                  <input
                    className="rounded py-2 px-4 focus:outline-blue-600 outline-none bg-componentBg"
                    type="text"
                    value={profileImageUrl}
                    onChange={(e) => setProfileImageUrl(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Banner URL</p>
                  <input
                    className="rounded py-2 px-4 focus:outline-blue-600 outline-none bg-componentBg"
                    type="text"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <div className="flex gap-2 ml-auto">
                  <div
                    className="border-2 rounded-lg border-componentBorder"
                    onClick={toggleCreateHubModal}
                  >
                    <CustomButtonBig text={"Cancel"} color={""} />
                  </div>
                  <div onClick={handleSubmit}>
                    <CustomButtonBig text={"Create Hub"} color={"blue"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateHubButton;
