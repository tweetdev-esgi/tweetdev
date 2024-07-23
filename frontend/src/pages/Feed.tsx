import React, { useEffect, useState } from "react";
import "../styles/Feed.css";
import { getSession } from "../services/sessionService";
import { fetchPosts } from "../api/post";
import { IPost } from "../interfaces";
import Post from "../components/Post";
import Favorites from "../components/Favorites";
import Portal from "../interfaces/Portal";
import { Users } from "@phosphor-icons/react";
import { PortalSample } from "../interfaces/PortalSample";
import { fetchHubs } from "../api/hub";
import { IHub } from "../interfaces/IHub";
import { useNavigate } from "react-router-dom";
import FeaturedHubItem from "../components/FeaturedHubItem";
import { executeProgram } from "../api/programs";

function Feed() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [portals, setPortals] = useState<IHub[]>([]);

  const [fileUrl, setFileUrl] = useState("");
  const [message, setMessage] = useState("");
  // const fetchFileUrl = async () => {
  //   try {
  //     // Envoyer une requête GET pour récupérer le fichier
  //     const body = {
  //       program: "print('Hello World')",
  //       input: "Hello World",
  //       outputFileType:""
  //     }
  //     const response = await executeProgram();

  //     if (!response.ok) {
  //       throw new Error("Erreur lors de la récupération du fichier");
  //     }

  //     // Générer une URL pour le fichier
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     setFileUrl(url);
  //     setMessage("Le fichier est prêt à être téléchargé.");
  //   } catch (error) {
  //     console.error("Erreur:", error);
  //     setMessage("Erreur lors de la récupération du fichier.");
  //   }
  // };
  // const downloadFile = () => {
  //   if (fileUrl) {
  //     // Créer un lien temporaire pour déclencher le téléchargement
  //     const link = document.createElement("a");
  //     link.href = fileUrl;
  //     link.download = "file.txt"; // Nom du fichier à télécharger (ce nom peut être changé)
  //     document.body.appendChild(link); // Ajouter le lien au DOM
  //     link.click(); // Simuler un clic sur le lien pour commencer le téléchargement
  //     document.body.removeChild(link); // Supprimer le lien après le clic
  //     window.URL.revokeObjectURL(fileUrl); // Révoquer l'URL après le téléchargement
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken) {
          const postsData = await fetchPosts(sessionToken, true);
          setPosts(postsData);
        } else {
          console.error("Error fetching posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    const fetchHubsData = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken) {
          const hubsData = await fetchHubs(sessionToken);
          setPortals(hubsData);
        } else {
          console.error("Error fetching posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
    fetchHubsData();
  }, []);

  return (
    <div className="feed-container grid grid-cols-[1fr_2.5fr_1.5fr] gap-4 p-12 mt-6">
      <div className="hidden sm:block">
        <Favorites></Favorites>
      </div>
      <div className="flex flex-col gap-4 col-span-2  sm:col-span-2  lg:col-span-1 ">
        {/* <div>
          <button onClick={fetchFileUrl}>Préparer le fichier</button>
          {message && <p>{message}</p>}
          {fileUrl && (
            <div
              onClick={downloadFile}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Cliquez ici pour télécharger le fichier
            </div>
          )}
        </div> */}
        {posts.map((post, index) => (
          <Post postInfo={post} key={index} />
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="pt-4 px-6 text-lg font-medium flex flex-col gap-3  shrink-0  ">
          Featured Hubs
          {portals.map((hub, index) => (
            <FeaturedHubItem hub={hub}></FeaturedHubItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
