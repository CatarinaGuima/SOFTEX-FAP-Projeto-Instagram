 // Implementar o botão de FOLLOW/UNFOLLOW
document.addEventListener("DOMContentLoaded", () => {
 
  const followButton = document.getElementById("menu-more-button");
  let isFollowing = false;

  followButton?.addEventListener("click", () => {
    // Alterna o conteúdo do botão e o estado de Follow
    if (isFollowing) {
      followButton.innerHTML = "Follow";
    } else {
      followButton.innerHTML = "Unfollow";
    }
    // Alterna o estado de Follow
    isFollowing = !isFollowing;
  });

  
});
