// Importações necessárias
import { v4 as randomUUID } from "uuid";
import { faker } from "@faker-js/faker";

// Classe do POST
class Post {
  private _id: string = randomUUID();
  private _userName: string;
  private _avatarUrl: string;
  private _imageUrl: string;
  private _description: string;
  private _isLiked: boolean = false;
  private _numberOfLikes: number = 0;
  private _createAt: Date = new Date();

  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string
  ) {
    this._userName = userName;
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl;
    this._description = description;
  }

  // Implementar o botão de LIKE/LIKED para todos os posts
  like() {
    const post = document.getElementById(this._id);
    const btnLike = post?.querySelector(
      ".post-icons .btn .fa-heart, .post-icons .btn .fa-heart-o"
    );

    if (!btnLike) return;

    this._isLiked = !this._isLiked;
    const likesElement = post?.querySelector("#hearts");

    //Remove o coração preenchido, adiciona o coração vazio e incrementa o número de likes
    if (this._isLiked) {
      this._numberOfLikes++;
      btnLike.classList.replace("fa-heart-o", "fa-heart");
      btnLike.classList.add("liked");
    } else {
      //Volta o coração vazio e decrementa o número de likes
      this._numberOfLikes--;
      btnLike.classList.replace("fa-heart", "fa-heart-o");
      btnLike.classList.remove("liked");
    }

    // Adiciona a classe de animação
    btnLike.classList.add("animate-like");

    // Remove a classe de animação após 300ms (igual ao tempo da animação no CSS)
    setTimeout(() => {
      btnLike.classList.remove("animate-like");
    }, 400);

    if (likesElement) {
      likesElement.textContent = `${this._numberOfLikes} likes`;
    }
  }

  follow() {
    // Implementar o botão de FOLLOW/UNFOLLOW
    const followButton = document.getElementById("menu-more-btn");
    let isFollowing = false;
    if (!followButton) return;
    followButton.id = this._id;

    followButton?.addEventListener("click", () => {
      // Alterna o conteúdo do botão e o estado de Follow
      if (isFollowing) {
        followButton.textContent = "Follow";
        followButton.classList.add("menu-more-button");
      } else {
        followButton.textContent = "Unfollow";
      }
      // Alterna o estado de Follow
      isFollowing = !isFollowing;
    });
  }

  // Função para renderizar os posts no HTML
  renderOnHTML() {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    postContainer.id = this._id;

    const postHeader = `
    <header>
            <div class="menu-list">
              <div class="menu-profile">
                <img id="menu-profile-account" src="${this._avatarUrl}" alt="Avatar" />
                <div id="menu-profile-name">${this._userName}</div>
              </div>
              <div class="menu-more">
                <button id="menu-more-btn" class="menu-more-button">Follow</button>
                <div id="menu-more-dots" class="btn">
                  <i class="fa fa-ellipsis-h"></i>
                </div>
              </div>
            </div>
    </header>`;

    const postImage = `
     <div class="post-image">
              <img
                class="image"
                title="post-image"
                src="${this._imageUrl}"
                alt="foto do instagram"
                width="380"
                height="360"
              />
            </div>`;

    const postIcons = `
    <div class="post-icons">
                <div class="menu-list-left">
                  <div class="btn"><i class="fa fa-heart-o" id="likeButton"></i></div>
                  <div class="btn"><i class="fa fa-comment-o"></i></div>
                  <div class="btn"><i class="fa fa-paper-plane-o"></i></div>
                </div>
                <div class="btn"><i class="fa fa-bookmark-o"></i></div>
              </div>
              <div id="likes">
              <i class="fa fa-heart"></i>
              <p id="hearts">${this._numberOfLikes} likes</p>
            </div>`;

    const postLegend = `
    <footer>
            <p id="legend">${this._description}</p>
          </footer>
    `;

    postContainer.innerHTML = postHeader + postImage + postIcons + postLegend;

    document.body.appendChild(postContainer);

    // Adicionando o evento de curtir após o conteúdo estar no HTML
    postContainer
      .querySelector(".post-icons .btn .fa-heart-o")
      ?.addEventListener("click", () => this.like());
  }
}

// Criando 15 posts aleatórios com faker e adicionando à lista de posts
for (let index = 0; index < 15; index++) {
  const post = new Post(
    faker.person.firstName(),
    faker.image.avatarGitHub(),
    faker.image.urlPicsumPhotos(),
    faker.lorem.paragraph()
  );

  post.renderOnHTML();
  // posts.push(post);
  post.follow();
}
